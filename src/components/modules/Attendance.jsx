import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { students, attendance as initialAttendance, classes } from '../../mock/data';
import { HiCheckCircle, HiXCircle, HiClock, HiSearch, HiFilter } from 'react-icons/hi';

export default function Attendance() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [attendanceData, setAttendanceData] = useState(initialAttendance);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [confirmAction, setConfirmAction] = useState(null);

  const today = new Date().toISOString().split('T')[0];
  const isTeacher = user.role === 'teacher';
  const isParent = user.role === 'parent';

  const relevantStudents = isTeacher
    ? students.filter(s => s.classId === classes.find(c => c.teacherId === user.id)?.id)
    : isParent
    ? students.filter(s => user.childIds?.includes(s.id))
    : students;

  const filtered = relevantStudents.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const att = attendanceData.find(a => a.studentId === s.id && a.date === today);
    const matchFilter = filterStatus === 'all' || att?.status === filterStatus || (filterStatus === 'unmarked' && !att);
    return matchSearch && matchFilter;
  });

  const getAttendance = (studentId) => attendanceData.find(a => a.studentId === studentId && a.date === today);

  const markAttendance = (studentId, status) => {
    const existing = getAttendance(studentId);
    if (existing && status === 'absent' && existing.status !== 'absent') {
      setConfirmAction({ studentId, status });
      return;
    }
    applyMark(studentId, status);
  };

  const applyMark = (studentId, status) => {
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const existing = attendanceData.findIndex(a => a.studentId === studentId && a.date === today);
    if (existing >= 0) {
      const updated = [...attendanceData];
      updated[existing] = { ...updated[existing], status, markedAt: now };
      setAttendanceData(updated);
    } else {
      setAttendanceData([...attendanceData, { id: Date.now(), studentId, date: today, status, markedBy: user.id, markedAt: now, note: '' }]);
    }
    const student = students.find(s => s.id === studentId);
    addToast(`${student.name} marked as ${status}`);
    setConfirmAction(null);
  };

  const presentCount = relevantStudents.filter(s => getAttendance(s.id)?.status === 'present').length;
  const lateCount = relevantStudents.filter(s => getAttendance(s.id)?.status === 'late').length;
  const absentCount = relevantStudents.filter(s => getAttendance(s.id)?.status === 'absent').length;
  const unmarkedCount = relevantStudents.length - presentCount - lateCount - absentCount;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
          <p className="text-gray-500 text-sm">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            {' · '}{relevantStudents.length} students
          </p>
        </div>
      </div>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-2">
        <Chip active={filterStatus === 'all'} onClick={() => setFilterStatus('all')} label={`All (${relevantStudents.length})`} />
        <Chip active={filterStatus === 'present'} onClick={() => setFilterStatus('present')} label={`Present (${presentCount})`} color="text-nature-700 bg-nature-50 border-nature-200" />
        <Chip active={filterStatus === 'late'} onClick={() => setFilterStatus('late')} label={`Late (${lateCount})`} color="text-warm-700 bg-warm-50 border-warm-200" />
        <Chip active={filterStatus === 'absent'} onClick={() => setFilterStatus('absent')} label={`Absent (${absentCount})`} color="text-red-600 bg-red-50 border-red-200" />
        {(isTeacher || user.role === 'school_admin') && unmarkedCount > 0 && (
          <Chip active={filterStatus === 'unmarked'} onClick={() => setFilterStatus('unmarked')} label={`Unmarked (${unmarkedCount})`} color="text-gray-600 bg-gray-50 border-gray-200" />
        )}
      </div>

      {/* Search */}
      {relevantStudents.length > 5 && (
        <div className="relative">
          <HiSearch className="absolute left-3.5 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="w-full sm:w-72 pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-400 outline-none text-sm transition-all"
            aria-label="Search students"
          />
        </div>
      )}

      {/* Student List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState search={search} />
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map(student => {
              const att = getAttendance(student.id);
              return (
                <div key={student.id} className="p-4 flex items-center justify-between gap-3 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-warm-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary-700">{student.name.charAt(0)}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-800 text-sm truncate">{student.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-400">Age {student.age}</span>
                        {att?.markedAt && (
                          <span className="text-[11px] text-gray-400 flex items-center gap-0.5">
                            <HiClock size={10} /> {att.markedAt}
                          </span>
                        )}
                        {att?.note && <span className="text-[11px] text-warm-600 italic truncate">"{att.note}"</span>}
                      </div>
                    </div>
                  </div>

                  {(isTeacher || user.role === 'school_admin') ? (
                    <div className="flex gap-1.5 flex-shrink-0">
                      <AttButton
                        active={att?.status === 'present'}
                        onClick={() => markAttendance(student.id, 'present')}
                        icon={HiCheckCircle}
                        label="Present"
                        activeClass="bg-nature-500 text-white shadow-sm shadow-nature-200"
                        inactiveClass="bg-nature-50 text-nature-600 hover:bg-nature-100 border border-nature-200"
                      />
                      <AttButton
                        active={att?.status === 'late'}
                        onClick={() => markAttendance(student.id, 'late')}
                        icon={HiClock}
                        label="Late"
                        activeClass="bg-warm-500 text-white shadow-sm shadow-warm-200"
                        inactiveClass="bg-warm-50 text-warm-600 hover:bg-warm-100 border border-warm-200"
                      />
                      <AttButton
                        active={att?.status === 'absent'}
                        onClick={() => markAttendance(student.id, 'absent')}
                        icon={HiXCircle}
                        label="Absent"
                        activeClass="bg-red-500 text-white shadow-sm shadow-red-200"
                        inactiveClass="bg-red-50 text-red-500 hover:bg-red-100 border border-red-200"
                      />
                    </div>
                  ) : (
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-medium ${
                      att?.status === 'present' ? 'bg-nature-50 text-nature-700 border border-nature-200' :
                      att?.status === 'late' ? 'bg-warm-50 text-warm-700 border border-warm-200' :
                      att?.status === 'absent' ? 'bg-red-50 text-red-600 border border-red-200' :
                      'bg-gray-50 text-gray-400 border border-gray-200'
                    }`}>
                      {att?.status ? (att.status.charAt(0).toUpperCase() + att.status.slice(1)) : 'Not marked yet'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirm Dialog */}
      {confirmAction && (
        <ConfirmDialog
          studentName={students.find(s => s.id === confirmAction.studentId)?.name}
          onConfirm={() => applyMark(confirmAction.studentId, confirmAction.status)}
          onCancel={() => setConfirmAction(null)}
        />
      )}
    </div>
  );
}

function AttButton({ active, onClick, icon: Icon, label, activeClass, inactiveClass }) {
  return (
    <button
      onClick={onClick}
      className={`p-2.5 rounded-xl transition-all btn-press ${active ? activeClass : inactiveClass}`}
      aria-label={`Mark as ${label}`}
      title={label}
    >
      <Icon size={18} />
    </button>
  );
}

function Chip({ active, onClick, label, color }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all btn-press border ${
        active ? 'bg-primary-50 text-primary-700 border-primary-300 shadow-sm' :
        color || 'text-gray-600 bg-white border-gray-200 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  );
}

function EmptyState({ search }) {
  return (
    <div className="p-12 text-center">
      <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
        <HiSearch className="text-gray-300" size={24} />
      </div>
      <p className="text-sm text-gray-500">
        {search ? `No students matching "${search}"` : 'No students to display'}
      </p>
      <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filter</p>
    </div>
  );
}

function ConfirmDialog({ studentName, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full animate-scale-in" onClick={e => e.stopPropagation()}>
        <h3 className="font-semibold text-gray-800 text-lg">Mark as absent?</h3>
        <p className="text-sm text-gray-600 mt-2">
          Are you sure you want to mark <strong>{studentName}</strong> as absent? This will notify their parent.
        </p>
        <div className="flex gap-3 mt-5">
          <button onClick={onCancel} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 text-sm font-medium transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 text-sm font-medium transition-colors shadow-sm">
            Mark Absent
          </button>
        </div>
      </div>
    </div>
  );
}
