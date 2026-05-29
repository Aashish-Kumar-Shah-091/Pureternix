import { teachers, classes } from '../../mock/data';
import { HiAcademicCap, HiMail, HiPhone, HiPlus } from 'react-icons/hi';

export default function Teachers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Teachers</h1>
          <p className="text-gray-500">{teachers.length} teachers</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
          <HiPlus size={18} /> Add Teacher
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teachers.map(teacher => {
          const cls = classes.find(c => c.id === teacher.classId);
          return (
            <div key={teacher.id} className="bg-white rounded-xl border border-primary-100 p-5">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center">
                  <HiAcademicCap className="text-primary-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{teacher.name}</h3>
                  <p className="text-sm text-gray-500">{teacher.qualification}</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <HiMail size={16} className="text-gray-400" /> {teacher.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <HiPhone size={16} className="text-gray-400" /> {teacher.phone}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Assigned Class</p>
                  <p className="text-sm font-medium text-gray-700">{cls?.name || 'Unassigned'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Joined</p>
                  <p className="text-sm font-medium text-gray-700">{teacher.joinDate}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
