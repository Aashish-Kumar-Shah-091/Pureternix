import { useState } from 'react';
import { students, classes } from '../../mock/data';
import { HiSearch, HiPlus, HiFilter, HiExclamation } from 'react-icons/hi';

export default function Students() {
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  let filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchClass = selectedClass === 'all' || s.classId === parseInt(selectedClass);
    return matchSearch && matchClass;
  });

  if (sortBy === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
  else if (sortBy === 'age') filtered.sort((a, b) => a.age - b.age);
  else if (sortBy === 'recent') filtered.sort((a, b) => new Date(b.admissionDate) - new Date(a.admissionDate));

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Students</h1>
          <p className="text-gray-500 text-sm">{students.length} enrolled across {classes.length} classes</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-colors btn-press shadow-sm">
          <HiPlus size={16} /> Add Student
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <HiSearch className="absolute left-3.5 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-400 outline-none text-sm"
            aria-label="Search students"
          />
        </div>
        <select
          value={selectedClass}
          onChange={e => setSelectedClass(e.target.value)}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-200 outline-none"
          aria-label="Filter by class"
        >
          <option value="all">All Classes</option>
          {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-200 outline-none"
          aria-label="Sort by"
        >
          <option value="name">Sort: Name</option>
          <option value="age">Sort: Age</option>
          <option value="recent">Sort: Recent</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <HiSearch className="mx-auto text-gray-200" size={40} />
          <p className="text-sm text-gray-500 mt-3">No students found</p>
          <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Blood</th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Allergies</th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Emergency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(student => (
                  <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-primary-100 to-warm-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-[11px] font-bold text-primary-700">{student.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{student.name}</p>
                          <p className="text-[11px] text-gray-400">Since {student.admissionDate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{classes.find(c => c.id === student.classId)?.name}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{student.age} yrs</td>
                    <td className="px-5 py-3.5"><span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">{student.bloodGroup}</span></td>
                    <td className="px-5 py-3.5">
                      {student.allergies !== 'None' ? (
                        <span className="flex items-center gap-1 text-xs text-red-600 font-medium bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                          <HiExclamation size={12} /> {student.allergies}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">None</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-500 font-mono">{student.emergencyContact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 bg-gray-50/50 border-t border-gray-100 text-xs text-gray-400">
            Showing {filtered.length} of {students.length} students
          </div>
        </div>
      )}
    </div>
  );
}
