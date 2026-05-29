import { Link } from 'react-router-dom';
import { students, teachers, classes, attendance, notices, meals, feedback } from '../../mock/data';
import { HiUserGroup, HiAcademicCap, HiClipboardCheck, HiSpeakerphone, HiTrendingUp, HiPlus, HiHeart, HiChat, HiCalendar } from 'react-icons/hi';

export default function SchoolAdminDashboard() {
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(a => a.date === today);
  const presentCount = todayAttendance.filter(a => a.status === 'present').length;
  const totalStudents = students.length;
  const attendanceRate = todayAttendance.length > 0 ? Math.round((presentCount / todayAttendance.length) * 100) : 0;

  const todayMeals = meals.filter(m => m.date === today);
  const pendingApprovals = 2;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-[13px] mt-0.5">Sunrise Montessori · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
        </div>
        <div className="flex gap-2">
          <Link to="/students" className="flex items-center gap-1.5 px-3.5 py-2 bg-primary-500 text-white text-sm rounded-xl hover:bg-primary-600 transition-colors btn-press shadow-sm">
            <HiPlus size={16} /> Add Student
          </Link>
          <Link to="/notices" className="flex items-center gap-1.5 px-3.5 py-2 bg-white text-gray-700 text-sm rounded-xl hover:bg-gray-50 transition-colors btn-press border border-gray-200">
            <HiSpeakerphone size={16} /> New Notice
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={HiUserGroup} label="Students Enrolled" value={totalStudents} subtitle={`${classes.length} classes`} color="bg-sky-50 text-sky-600 border-sky-100" />
        <StatCard icon={HiAcademicCap} label="Teaching Staff" value={teachers.length} subtitle="All active" color="bg-nature-50 text-nature-600 border-nature-100" />
        <StatCard icon={HiClipboardCheck} label="Attendance Today" value={`${attendanceRate}%`} subtitle={`${presentCount} of ${todayAttendance.length} present`} color="bg-primary-50 text-primary-600 border-primary-100" />
        <StatCard icon={HiHeart} label="Meals Updated" value={`${todayMeals.length}/${totalStudents}`} subtitle={`${todayMeals.filter(m => m.status === 'ate_well').length} ate well`} color="bg-warm-50 text-warm-600 border-warm-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <HiTrendingUp className="text-primary-500" size={18} /> Classes Today
          </h3>
          <div className="space-y-3">
            {classes.map(cls => {
              const classAttendance = todayAttendance.filter(a => students.find(s => s.id === a.studentId)?.classId === cls.id);
              const classPresent = classAttendance.filter(a => a.status === 'present').length;
              const teacher = teachers.find(t => t.id === cls.teacherId);
              return (
                <div key={cls.id} className="flex items-center gap-4 p-3.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary-700">{cls.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-700 text-sm">{cls.name}</p>
                      <span className="text-[10px] px-1.5 py-0.5 bg-white rounded-full text-gray-500 border">{cls.room}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{teacher?.name} · {cls.ageGroup}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-gray-700">{cls.currentStrength}/{cls.capacity}</p>
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full mt-1.5">
                      <div className="h-full bg-primary-400 rounded-full" style={{ width: `${(cls.currentStrength / cls.capacity) * 100}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Pending Items */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <HiCalendar className="text-warm-500" size={18} /> Pending Actions
            </h3>
            <div className="space-y-2">
              <PendingItem label="Magazine submissions to approve" count={pendingApprovals} path="/magazine" />
              <PendingItem label="Parent feedback to review" count={feedback.filter(f => !f.read).length} path="/feedback" />
              <PendingItem label="Fee collection pending" count={12} path="#" />
            </div>
          </div>

          {/* Recent Notices */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <HiSpeakerphone className="text-sky-500" size={18} /> Recent Notices
            </h3>
            <div className="space-y-2.5">
              {notices.slice(0, 3).map(notice => (
                <div key={notice.id} className="p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-gray-700 line-clamp-1">{notice.title}</p>
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0 ${
                      notice.priority === 'high' ? 'bg-red-100 text-red-600' :
                      notice.priority === 'medium' ? 'bg-warm-100 text-warm-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{notice.priority}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{notice.createdAt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, subtitle, color }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-start gap-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${color}`}>
          <Icon size={22} />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-xs text-gray-500 font-medium">{label}</p>
          {subtitle && <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

function PendingItem({ label, count, path }) {
  return (
    <Link to={path} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
      <p className="text-sm text-gray-600">{label}</p>
      <span className="px-2 py-0.5 bg-warm-100 text-warm-700 rounded-full text-xs font-medium">{count}</span>
    </Link>
  );
}
