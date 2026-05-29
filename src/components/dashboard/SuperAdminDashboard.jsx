import { schools } from '../../mock/data';
import { HiOfficeBuilding, HiUserGroup, HiAcademicCap, HiTrendingUp, HiGlobe, HiCurrencyRupee } from 'react-icons/hi';

export default function SuperAdminDashboard() {
  const totalStudents = schools.reduce((sum, s) => sum + s.studentsCount, 0);
  const totalTeachers = schools.reduce((sum, s) => sum + s.teachersCount, 0);
  const premiumCount = schools.filter(s => s.subscription === 'premium').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Platform Overview</h1>
        <p className="text-gray-500 text-sm">PURETERNIX admin console · All schools at a glance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={HiOfficeBuilding} label="Active Schools" value={schools.length} change="+1 this month" color="bg-purple-50 text-purple-600 border-purple-100" />
        <StatCard icon={HiUserGroup} label="Total Students" value={totalStudents} change="↑ 8% growth" color="bg-sky-50 text-sky-600 border-sky-100" />
        <StatCard icon={HiAcademicCap} label="Total Teachers" value={totalTeachers} change="All verified" color="bg-nature-50 text-nature-600 border-nature-100" />
        <StatCard icon={HiCurrencyRupee} label="Premium Plans" value={premiumCount} change={`${schools.length - premiumCount} basic`} color="bg-primary-50 text-primary-600 border-primary-100" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800 flex items-center gap-2">
            <HiGlobe className="text-primary-500" size={18} /> Registered Schools
          </h2>
          <span className="text-xs text-gray-400">{schools.length} schools</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="px-6 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">School</th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Students</th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Teachers</th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Founded</th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {schools.map(school => (
                <tr key={school.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center border" style={{ backgroundColor: school.themeColor + '15', borderColor: school.themeColor + '30' }}>
                        <HiOfficeBuilding style={{ color: school.themeColor }} size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{school.name}</p>
                        <p className="text-[11px] text-gray-400">{school.address}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-700">{school.studentsCount}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-700">{school.teachersCount}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${school.subscription === 'premium' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'}`}>
                      {school.subscription}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{school.founded}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-xs text-nature-700">
                      <span className="w-1.5 h-1.5 bg-nature-500 rounded-full animate-pulse-soft" />
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, change, color }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-start gap-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${color}`}>
          <Icon size={22} />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-xs text-gray-500 font-medium">{label}</p>
          {change && <p className="text-[11px] text-nature-600 mt-0.5">{change}</p>}
        </div>
      </div>
    </div>
  );
}
