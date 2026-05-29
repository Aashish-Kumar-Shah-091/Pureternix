import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { students, attendance, meals, pickup, homework, feedback, busStatus, activities, parentCalendar } from '../../mock/data';
import { HiCheckCircle, HiHeart, HiLocationMarker, HiTruck, HiStar, HiBookOpen, HiCalendar, HiPhotograph, HiClock, HiSpeakerphone } from 'react-icons/hi';

export default function ParentDashboard() {
  const { user } = useAuth();
  const myChildren = students.filter(s => user.childIds?.includes(s.id));
  const [activeChild, setActiveChild] = useState(myChildren[0]?.id);
  const selectedChild = myChildren.find(c => c.id === activeChild);

  const todayStr = new Date().toISOString().split('T')[0];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const subtext = hour < 10 ? "Here's the morning update" : hour < 14 ? "Here's how the day is going" : "Here's today's summary";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-gray-800">{greeting}, {user.name.split(' ')[0]}</h1>
          <p className="text-gray-500 text-[13px] mt-0.5">{subtext}</p>
        </div>
        {myChildren.length > 1 && (
          <div className="flex gap-2">
            {myChildren.map(child => (
              <button
                key={child.id}
                onClick={() => setActiveChild(child.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all btn-press ${
                  activeChild === child.id
                    ? 'bg-primary-100 text-primary-700 shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {child.name.split(' ')[0]}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedChild && <ChildOverview child={selectedChild} todayStr={todayStr} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivitiesCard />
        <UpcomingSection />
      </div>

      <BusStatusCard />
    </div>
  );
}

function ChildOverview({ child, todayStr }) {
  const todayAtt = attendance.find(a => a.studentId === child.id && a.date === todayStr);
  const todayMeal = meals.find(m => m.studentId === child.id && m.date === todayStr);
  const todayPickup = pickup.find(p => p.studentId === child.id && p.date === todayStr);
  const childFeedback = feedback.filter(f => f.studentId === child.id && f.fromRole === 'teacher').slice(0, 1);

  const allGood = todayAtt?.status === 'present' && todayMeal?.status === 'ate_well';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-primary-400 via-warm-400 to-primary-500 p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/90 rounded-2xl flex items-center justify-center shadow-sm">
            <span className="font-bold text-primary-600 text-xl sm:text-2xl">{child.name.charAt(0)}</span>
          </div>
          <div className="text-white">
            <h2 className="font-bold text-xl sm:text-2xl">{child.name}</h2>
            <p className="text-white/80 text-sm">Age {child.age} · {child.classId === 1 ? 'Casa dei Bambini A' : child.classId === 4 ? 'Lower Elementary' : 'Casa B'}</p>
            {allGood && (
              <p className="text-white/90 text-xs mt-1 flex items-center gap-1">
                <HiStar size={14} /> Having a wonderful day!
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatusCard
            icon={HiCheckCircle}
            label="Attendance"
            value={todayAtt?.status === 'present' ? 'Present' : todayAtt?.status === 'late' ? 'Arrived Late' : todayAtt?.status || 'Pending'}
            detail={todayAtt?.markedAt}
            positive={todayAtt?.status === 'present'}
            warning={todayAtt?.status === 'late'}
            neutral={!todayAtt}
          />
          <StatusCard
            icon={HiHeart}
            label="Meal Today"
            value={todayMeal?.status === 'ate_well' ? 'Ate Well' : todayMeal?.status === 'ate_little' ? 'Ate a Little' : todayMeal?.status === 'did_not_eat' ? "Didn't Eat" : 'Pending'}
            detail={todayMeal?.markedAt}
            positive={todayMeal?.status === 'ate_well'}
            warning={todayMeal?.status === 'ate_little'}
            negative={todayMeal?.status === 'did_not_eat'}
            neutral={!todayMeal}
          />
          <StatusCard
            icon={HiLocationMarker}
            label="Location"
            value={todayPickup?.status === 'in_school' ? 'At School' : todayPickup?.status === 'picked_up' ? 'Picked Up' : 'Not arrived'}
            detail={todayPickup?.status === 'in_school' ? `Since ${todayPickup.arrivalTime}` : todayPickup?.departureTime}
            positive={todayPickup?.status === 'in_school'}
            neutral={!todayPickup}
          />
          <StatusCard
            icon={HiStar}
            label="Feedback"
            value={childFeedback.length > 0 ? 'New Update' : 'No new'}
            detail={childFeedback[0]?.date === todayStr ? 'Today' : ''}
            positive={childFeedback.length > 0}
            neutral={childFeedback.length === 0}
          />
        </div>

        {todayMeal?.note && (
          <div className="mt-4 bg-cream-100 rounded-xl p-4 border border-cream-200">
            <p className="text-xs font-medium text-gray-500 mb-1">Teacher's note about today's meal</p>
            <p className="text-sm text-gray-700">"{todayMeal.note}"</p>
          </div>
        )}

        {childFeedback[0] && (
          <div className="mt-3 bg-nature-50 rounded-xl p-4 border border-nature-100">
            <p className="text-xs font-medium text-nature-600 mb-1 flex items-center gap-1">
              <HiStar size={12} /> Latest from Ms. Anita
            </p>
            <p className="text-sm text-gray-700 line-clamp-2">{childFeedback[0].message}</p>
          </div>
        )}
      </div>

      <div className="px-4 sm:px-5 pb-5">
        <AttendanceCalendar />
      </div>
    </div>
  );
}

function StatusCard({ icon: Icon, label, value, detail, positive, warning, negative, neutral }) {
  const colorClass = positive ? 'text-nature-500' : warning ? 'text-warm-500' : negative ? 'text-red-400' : 'text-gray-300';
  const bgClass = positive ? 'bg-nature-50' : warning ? 'bg-warm-50' : negative ? 'bg-red-50' : 'bg-gray-50';

  return (
    <div className={`rounded-xl p-3 text-center ${bgClass} border border-transparent`}>
      <Icon size={22} className={`mx-auto mb-1.5 ${colorClass}`} />
      <p className="text-[11px] text-gray-500 font-medium">{label}</p>
      <p className="text-xs font-semibold text-gray-700 mt-0.5">{value}</p>
      {detail && <p className="text-[10px] text-gray-400 mt-0.5">{detail}</p>}
    </div>
  );
}

function AttendanceCalendar() {
  const cal = parentCalendar.attendance;
  const daysInMay = 31;
  const firstDay = new Date(2026, 4, 1).getDay();
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
          <HiCalendar size={14} className="text-primary-500" /> May 2026 Attendance
        </p>
        <div className="flex items-center gap-3 text-[10px] text-gray-500">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-nature-400 rounded-sm" /> Present</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-warm-400 rounded-sm" /> Late</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-red-300 rounded-sm" /> Absent</span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {dayNames.map(d => <div key={d} className="text-[10px] text-gray-400 text-center font-medium py-1">{d}</div>)}
        {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: daysInMay }).map((_, i) => {
          const day = i + 1;
          const dateStr = `2026-05-${String(day).padStart(2, '0')}`;
          const status = cal[dateStr];
          const dayOfWeek = new Date(2026, 4, day).getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

          let bg = 'bg-white';
          if (status === 'present') bg = 'bg-nature-400 text-white';
          else if (status === 'late') bg = 'bg-warm-400 text-white';
          else if (status === 'absent') bg = 'bg-red-300 text-white';
          else if (isWeekend) bg = 'bg-gray-100 text-gray-400';

          return (
            <div key={day} className={`w-full aspect-square flex items-center justify-center rounded-md text-[11px] font-medium ${bg}`}>
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RecentActivitiesCard() {
  const recentAct = activities.slice(0, 3);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <HiPhotograph className="text-primary-500" size={18} /> Recent Classroom Moments
      </h3>
      <div className="space-y-3">
        {recentAct.map(act => (
          <div key={act.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-warm-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <HiPhotograph className="text-primary-400" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">{act.title}</p>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{act.description}</p>
              <p className="text-[11px] text-gray-400 mt-1">{act.photos?.length} photos · {act.date === new Date().toISOString().split('T')[0] ? 'Today' : 'Yesterday'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UpcomingSection() {
  const hw = homework.slice(0, 3);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <HiBookOpen className="text-sky-500" size={18} /> Homework & Activities
      </h3>
      <div className="space-y-3">
        {hw.map(h => (
          <div key={h.id} className="p-3 bg-gray-50 rounded-xl">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">{h.title}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-sky-50 text-sky-700 border border-sky-100">{h.area}</span>
              </div>
              {h.dueDate && (
                <span className="text-[11px] text-gray-400 flex items-center gap-1 flex-shrink-0">
                  <HiClock size={12} /> Due {h.dueDate.slice(5)}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2 line-clamp-2">{h.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BusStatusCard() {
  const bus = busStatus[0];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <HiTruck className="text-sky-500" size={18} /> Bus Status
      </h3>
      <div className="flex items-center justify-between p-4 bg-sky-50 rounded-xl border border-sky-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
            <HiTruck className="text-sky-600" size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{bus.busNumber}</p>
            <p className="text-xs text-gray-500">{bus.route}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Driver: {bus.driver} · {bus.phone}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="px-3 py-1 bg-nature-100 text-nature-700 rounded-full text-xs font-medium">
            {bus.status === 'at_school' ? 'At School' : bus.status}
          </span>
          <p className="text-[11px] text-gray-400 mt-1">Updated {bus.lastUpdate}</p>
        </div>
      </div>
    </div>
  );
}
