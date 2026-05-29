import { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { schools } from '../../mock/data';
import { HiOfficeBuilding, HiPlus, HiPencil, HiMail, HiPhone } from 'react-icons/hi';

export default function Tenants() {
  const { addToast } = useToast();
  const [schoolsList] = useState(schools);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tenant Management</h1>
          <p className="text-gray-500">{schoolsList.length} registered schools</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); }} className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
          <HiPlus size={18} /> Add School
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-primary-100 p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input placeholder="School Name" className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-300 outline-none" />
            <input placeholder="Email" className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-300 outline-none" />
            <input placeholder="Phone" className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-300 outline-none" />
            <input placeholder="Address" className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-300 outline-none" />
            <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm">
              <option>Basic Plan</option>
              <option>Premium Plan</option>
            </select>
            <input type="color" defaultValue="#e4852a" className="h-10 w-full rounded-lg border border-gray-200" />
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button onClick={() => { setShowForm(false); addToast('School added successfully!'); }} className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
              Add School
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {schoolsList.map(school => (
          <div key={school.id} className="bg-white rounded-xl border border-primary-100 p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: school.themeColor + '20' }}>
                  <HiOfficeBuilding style={{ color: school.themeColor }} size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{school.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{school.address}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <HiPencil size={16} className="text-gray-400" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-primary-50/50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Students</p>
                <p className="text-lg font-bold text-gray-800">{school.studentsCount}</p>
              </div>
              <div className="bg-primary-50/50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Teachers</p>
                <p className="text-lg font-bold text-gray-800">{school.teachersCount}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <HiMail size={14} className="text-gray-400" /> {school.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <HiPhone size={14} className="text-gray-400" /> {school.phone}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${school.subscription === 'premium' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'}`}>
                  {school.subscription}
                </span>
                <div className="w-4 h-4 rounded-full border-2 border-white shadow" style={{ backgroundColor: school.themeColor }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
