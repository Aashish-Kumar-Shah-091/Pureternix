import { teachers, classes } from '../../mock/data';
import { HiAcademicCap, HiMail, HiPhone, HiPlus, HiStar } from 'react-icons/hi';

export default function Teachers() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Teaching Staff</h1>
          <p className="text-gray-500 text-sm">{teachers.length} educators · Sunrise Montessori</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-colors btn-press shadow-sm">
          <HiPlus size={16} /> Add Teacher
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teachers.map(teacher => {
          const cls = classes.find(c => c.id === teacher.classId);
          return (
            <div key={teacher.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-warm-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary-700">{teacher.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 text-sm">{teacher.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{teacher.qualification}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <HiStar className="text-primary-400" size={14} />
                <p className="text-xs text-gray-600">{teacher.specialization}</p>
              </div>

              <div className="mt-3 space-y-1.5">
                <a href={`mailto:${teacher.email}`} className="flex items-center gap-2 text-xs text-gray-500 hover:text-sky-600 transition-colors">
                  <HiMail size={14} className="text-gray-400" /> {teacher.email}
                </a>
                <p className="flex items-center gap-2 text-xs text-gray-500">
                  <HiPhone size={14} className="text-gray-400" /> {teacher.phone}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Class</p>
                  <p className="text-xs font-medium text-gray-700 mt-0.5">{cls?.name || 'Support Staff'}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Since</p>
                  <p className="text-xs font-medium text-gray-700 mt-0.5">{teacher.joinDate}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
