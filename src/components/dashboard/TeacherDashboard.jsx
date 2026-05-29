import { Link } from 'react-router-dom';
import { students, attendance, meals, classes, feedback, homework } from '../../mock/data';
import { useAuth } from '../../context/AuthContext';
import { HiClipboardCheck, HiHeart, HiBookOpen, HiPhotograph, HiUserGroup, HiChat, HiCheckCircle, HiClock, HiXCircle, HiLightningBolt } from 'react-icons/hi';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const myClass = classes.find(c => c.teacherId === user.id);
  const myStudents = students.filter(s => s.classId === myClass?.id);

  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(a => a.date === today && myStudents.some(s => s.id === a.studentId));
  const todayMeals = meals.filter(m => m.date === today && myStudents.some(s => s.id === m.studentId));
  const pendingFeedback = feedback.filter(f => f.toId === user.id && !f.read);

  const presentCount = todayAttendance.filter(a => a.status === 'present').length;
  const lateCount = todayAttendance.filter(a => a.status === 'late').length;
  const absentCount = todayAttendance.filter(a => a.status === 'absent').length;
  const unmarkedCount = myStudents.length - todayAttendance.length;

  const timeOfDay = new Date().getHours() < 12 ? 'morning' : 'afternoon';

  const todayTasks = [
    { label: 'Mark attendance', done: todayAttendance.length === myStudents.length, path: '/attendance' },
    { label: 'Update meal status', done: todayMeals.length === myStudents.length, path: '/meals' },
    { label: 'Post today\'s activity', done: false, path: '/activities' },
    { label: 'Respond to parent feedback', done: pendingFeedback.length === 0, path: '/feedback' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Good {timeOfDay}, {user.name.split(' ')[0]}!</h1>
        <p className="text-gray-500 text-sm">{myClass?.name} · {myClass?.room} · {myStudents.length} children</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <QuickAction to="/attendance" icon={HiClipboardCheck} label="Attendance" count={todayAttendance.length === myStudents.length ? 'Complete' : `${unmarkedCount} pending`} color="bg-nature-50 text-nature-600 border-nature-100" done={todayAttendance.length === myStudents.length} />
        <QuickAction to="/meals" icon={HiHeart} label="Meal Status" count={todayMeals.length === myStudents.length ? 'Complete' : `${myStudents.length - todayMeals.length} pending`} color="bg-primary-50 text-primary-600 border-primary-100" done={todayMeals.length === myStudents.length} />
        <QuickAction to="/activities" icon={HiPhotograph} label="Activities" count="Post update" color="bg-warm-50 text-warm-600 border-warm-100" />
        <QuickAction to="/feedback" icon={HiChat} label="Feedback" count={pendingFeedback.length > 0 ? `${pendingFeedback.length} to respond` : 'All clear'} color="bg-sky-50 text-sky-600 border-sky-100" done={pendingFeedback.length === 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <HiLightningBolt className="text-primary-500" size={18} /> Today's Checklist
          </h3>
          <div className="space-y-2.5">
            {todayTasks.map((task, i) => (
              <Link key={i} to={task.path} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${task.done ? 'bg-nature-500 border-nature-500' : 'border-gray-300'}`}>
                  {task.done && <HiCheckCircle className="text-white" size={14} />}
                </div>
                <span className={`text-sm ${task.done ? 'text-gray-400 line-through' : 'text-gray-700 font-medium'}`}>{task.label}</span>
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-400">{todayTasks.filter(t => t.done).length} of {todayTasks.length} complete</p>
            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2">
              <div className="h-full bg-nature-400 rounded-full transition-all" style={{ width: `${(todayTasks.filter(t => t.done).length / todayTasks.length) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <HiClipboardCheck className="text-nature-500" size={18} /> Attendance Today
          </h3>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-nature-50 rounded-xl p-3 text-center border border-nature-100">
              <p className="text-xl font-bold text-nature-700">{presentCount}</p>
              <p className="text-[11px] text-nature-600">Present</p>
            </div>
            <div className="bg-warm-50 rounded-xl p-3 text-center border border-warm-100">
              <p className="text-xl font-bold text-warm-700">{lateCount}</p>
              <p className="text-[11px] text-warm-600">Late</p>
            </div>
            <div className="bg-red-50 rounded-xl p-3 text-center border border-red-100">
              <p className="text-xl font-bold text-red-600">{absentCount}</p>
              <p className="text-[11px] text-red-500">Absent</p>
            </div>
          </div>
          {absentCount > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500">Absent today:</p>
              {todayAttendance.filter(a => a.status === 'absent').map(a => {
                const student = myStudents.find(s => s.id === a.studentId);
                return (
                  <div key={a.id} className="flex items-center gap-2 text-sm text-gray-600 bg-red-50/50 rounded-lg px-3 py-2">
                    <HiXCircle className="text-red-400" size={16} />
                    <span>{student?.name}</span>
                    {a.note && <span className="text-xs text-gray-400 ml-auto">({a.note})</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Student Status */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <HiUserGroup className="text-primary-500" size={18} /> My Children
          </h3>
          <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
            {myStudents.slice(0, 10).map(student => {
              const att = todayAttendance.find(a => a.studentId === student.id);
              const meal = todayMeals.find(m => m.studentId === student.id);
              return (
                <div key={student.id} className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-warm-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-[11px] font-bold text-primary-700">{student.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">{student.name}</p>
                  </div>
                  <div className="flex gap-1.5">
                    {att && (
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        att.status === 'present' ? 'bg-nature-100' : att.status === 'late' ? 'bg-warm-100' : 'bg-red-100'
                      }`}>
                        {att.status === 'present' ? <HiCheckCircle size={12} className="text-nature-600" /> :
                         att.status === 'late' ? <HiClock size={12} className="text-warm-600" /> :
                         <HiXCircle size={12} className="text-red-500" />}
                      </span>
                    )}
                    {meal && (
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        meal.status === 'ate_well' ? 'bg-nature-100' : meal.status === 'ate_little' ? 'bg-warm-100' : 'bg-red-100'
                      }`}>
                        <HiHeart size={12} className={meal.status === 'ate_well' ? 'text-nature-600' : meal.status === 'ate_little' ? 'text-warm-600' : 'text-red-500'} />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ to, icon: Icon, label, count, color, done }) {
  return (
    <Link to={to} className={`bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all btn-press group`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 border ${color}`}>
        <Icon size={20} />
      </div>
      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{label}</p>
      <p className={`text-xs mt-0.5 ${done ? 'text-nature-600 font-medium' : 'text-gray-400'}`}>
        {done && <HiCheckCircle className="inline mr-0.5 -mt-0.5" size={12} />}
        {count}
      </p>
    </Link>
  );
}
