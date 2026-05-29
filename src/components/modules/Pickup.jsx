import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { students, pickup as initialPickup, classes } from '../../mock/data';
import { HiLocationMarker, HiClock, HiCheckCircle, HiUser, HiShieldCheck } from 'react-icons/hi';

export default function Pickup() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [pickupData, setPickupData] = useState(initialPickup);
  const [confirmAction, setConfirmAction] = useState(null);

  const today = new Date().toISOString().split('T')[0];
  const isTeacher = user.role === 'teacher';
  const isParent = user.role === 'parent';

  const relevantStudents = isTeacher
    ? students.filter(s => s.classId === classes.find(c => c.teacherId === user.id)?.id)
    : isParent
    ? students.filter(s => user.childIds?.includes(s.id))
    : students;

  const getPickup = (studentId) => pickupData.find(p => p.studentId === studentId && p.date === today);
  const inSchool = relevantStudents.filter(s => getPickup(s.id)?.status === 'in_school').length;
  const pickedUp = relevantStudents.filter(s => getPickup(s.id)?.status === 'picked_up').length;

  const handlePickup = (studentId, pickupPerson) => {
    setConfirmAction({ studentId, pickupPerson });
  };

  const confirmPickup = () => {
    const { studentId, pickupPerson } = confirmAction;
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const existing = pickupData.findIndex(p => p.studentId === studentId && p.date === today);
    if (existing >= 0) {
      const updated = [...pickupData];
      updated[existing] = { ...updated[existing], departureTime: now, pickupPerson, status: 'picked_up' };
      setPickupData(updated);
    }
    const student = students.find(s => s.id === studentId);
    addToast(`${student.name} picked up safely by ${pickupPerson}`);
    setConfirmAction(null);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Pickup & Drop</h1>
        <p className="text-gray-500 text-sm">Track arrival and safe departure</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
          <div className="w-10 h-10 bg-nature-50 rounded-xl flex items-center justify-center mx-auto mb-2">
            <HiLocationMarker className="text-nature-500" size={20} />
          </div>
          <p className="text-xl font-bold text-nature-700">{inSchool}</p>
          <p className="text-xs text-gray-500">In School</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
          <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center mx-auto mb-2">
            <HiCheckCircle className="text-sky-500" size={20} />
          </div>
          <p className="text-xl font-bold text-sky-700">{pickedUp}</p>
          <p className="text-xs text-gray-500">Picked Up</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-2">
            <HiClock className="text-gray-400" size={20} />
          </div>
          <p className="text-xl font-bold text-gray-600">{relevantStudents.length - inSchool - pickedUp}</p>
          <p className="text-xs text-gray-500">Not Arrived</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {relevantStudents.map(student => {
            const pk = getPickup(student.id);
            if (!pk) return null;
            return (
              <div key={student.id} className="p-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      pk.status === 'in_school' ? 'bg-nature-50 border border-nature-100' : 'bg-sky-50 border border-sky-100'
                    }`}>
                      {pk.status === 'in_school'
                        ? <HiLocationMarker className="text-nature-600" size={18} />
                        : <HiCheckCircle className="text-sky-600" size={18} />
                      }
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-800 text-sm">{student.name}</p>
                      <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                        {pk.dropoffPerson && (
                          <span className="flex items-center gap-1 text-[11px] text-gray-500">
                            <HiUser size={11} /> Drop: {pk.dropoffPerson}
                          </span>
                        )}
                        {pk.arrivalTime && (
                          <span className="flex items-center gap-1 text-[11px] text-gray-400">
                            <HiClock size={11} /> In: {pk.arrivalTime}
                          </span>
                        )}
                        {pk.departureTime && (
                          <span className="flex items-center gap-1 text-[11px] text-nature-600 font-medium">
                            <HiShieldCheck size={11} /> Out: {pk.departureTime} ({pk.pickupPerson})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {(isTeacher || user.role === 'school_admin') && pk.status === 'in_school' && (
                    <div className="flex gap-1.5 flex-shrink-0">
                      {['Mother', 'Father', 'Guardian'].map(person => (
                        <button
                          key={person}
                          onClick={() => handlePickup(student.id, person)}
                          className="px-3 py-1.5 bg-sky-50 text-sky-700 rounded-xl text-[11px] font-medium hover:bg-sky-100 border border-sky-200 transition-colors btn-press"
                        >
                          {person}
                        </button>
                      ))}
                    </div>
                  )}

                  {pk.status === 'picked_up' && (isTeacher || user.role === 'school_admin') && (
                    <span className="px-3 py-1.5 bg-nature-50 text-nature-700 rounded-xl text-xs font-medium border border-nature-100 flex items-center gap-1">
                      <HiShieldCheck size={14} /> Safe
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {confirmAction && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setConfirmAction(null)}>
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full animate-scale-in" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-gray-800 text-lg">Confirm pickup</h3>
            <p className="text-sm text-gray-600 mt-2">
              Mark <strong>{students.find(s => s.id === confirmAction.studentId)?.name}</strong> as picked up by <strong>{confirmAction.pickupPerson}</strong>?
            </p>
            <p className="text-xs text-gray-400 mt-1">The parent will be notified immediately.</p>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setConfirmAction(null)} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 text-sm font-medium">Cancel</button>
              <button onClick={confirmPickup} className="flex-1 px-4 py-2.5 bg-nature-500 text-white rounded-xl hover:bg-nature-600 text-sm font-medium shadow-sm">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
