import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { busStatus as initialBus } from '../../mock/data';
import { HiTruck, HiPhone, HiLocationMarker, HiUserGroup, HiClock } from 'react-icons/hi';

const statusOptions = [
  { value: 'at_school', label: 'At School', color: 'bg-nature-50 text-nature-700 border-nature-200', dot: 'bg-nature-500' },
  { value: 'departed', label: 'Departed', color: 'bg-sky-50 text-sky-700 border-sky-200', dot: 'bg-sky-500' },
  { value: 'nearby', label: 'Nearby', color: 'bg-warm-50 text-warm-700 border-warm-200', dot: 'bg-warm-500' },
  { value: 'dropped', label: 'All Dropped', color: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-500' },
];

export default function BusStatus() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [busData, setBusData] = useState(initialBus);

  const canUpdate = user.role === 'school_admin' || user.role === 'teacher';

  const updateStatus = (busId, newStatus) => {
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    setBusData(busData.map(b => b.id === busId ? { ...b, status: newStatus, lastUpdate: now } : b));
    const bus = busData.find(b => b.id === busId);
    const label = statusOptions.find(s => s.value === newStatus)?.label;
    addToast(`${bus.busNumber} → ${label}. Parents notified.`);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Bus Tracking</h1>
        <p className="text-gray-500 text-sm">Real-time status updates · {busData.length} buses</p>
      </div>

      {busData.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <HiTruck className="mx-auto text-gray-200" size={40} />
          <p className="text-sm text-gray-500 mt-3">No buses configured yet</p>
          <p className="text-xs text-gray-400 mt-1">Bus tracking information will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {busData.map(bus => {
            const statusConfig = statusOptions.find(s => s.value === bus.status);
            return (
              <div key={bus.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-50 to-primary-50 rounded-xl flex items-center justify-center border border-sky-100 flex-shrink-0">
                      <HiTruck className="text-sky-600" size={22} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-800">{bus.busNumber}</h3>
                        <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${statusConfig?.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusConfig?.dot} ${bus.status === 'nearby' ? 'animate-pulse-soft' : ''}`} />
                          {statusConfig?.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                        <HiLocationMarker size={14} className="text-gray-400" /> {bus.route}
                      </p>
                      <div className="flex items-center gap-4 mt-2 flex-wrap">
                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                          <HiUserGroup size={14} className="text-gray-400" /> {bus.studentsCount}/{bus.capacity} students
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                          <HiPhone size={14} className="text-gray-400" /> {bus.driver} · {bus.phone}
                        </span>
                      </div>
                      {bus.nextStop && (
                        <div className="mt-2 px-3 py-1.5 bg-warm-50 rounded-lg inline-flex items-center gap-1.5 border border-warm-100">
                          <HiClock size={13} className="text-warm-500" />
                          <span className="text-xs font-medium text-warm-700">{bus.nextStop}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[11px] text-gray-400">Last updated</p>
                    <p className="text-xs font-medium text-gray-600">{bus.lastUpdate}</p>
                  </div>
                </div>

                {canUpdate && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-[11px] font-medium text-gray-500 mb-2">Update status (notifies all parents on this route):</p>
                    <div className="flex flex-wrap gap-2">
                      {statusOptions.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => updateStatus(bus.id, opt.value)}
                          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all btn-press border ${
                            bus.status === opt.value ? `${opt.color} ring-2 ring-primary-100` : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${opt.dot}`} />
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
