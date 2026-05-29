import { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { schools } from '../../mock/data';
import { HiOfficeBuilding, HiPlus, HiPencil, HiMail, HiPhone, HiX, HiGlobe, HiUserGroup, HiAcademicCap } from 'react-icons/hi';

export default function Tenants() {
  const { addToast } = useToast();
  const [schoolsList] = useState(schools);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">School Management</h1>
          <p className="text-gray-500 text-sm">{schoolsList.length} schools on Paaila platform</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-colors btn-press shadow-sm">
          <HiPlus size={16} /> Onboard School
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4 animate-slide-up">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">New School Registration</h3>
            <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-gray-100 rounded-lg"><HiX size={18} className="text-gray-400" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">School Name <span className="text-red-400">*</span></label>
              <input placeholder="e.g., Sunrise Montessori" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-200 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Email <span className="text-red-400">*</span></label>
              <input type="email" placeholder="admin@school.edu" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-200 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Phone</label>
              <input placeholder="+977-1-XXXXXXX" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-200 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Address</label>
              <input placeholder="Street, City" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-200 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Subscription Plan</label>
              <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm">
                <option>Basic</option>
                <option>Premium</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Brand Color</label>
              <input type="color" defaultValue="#e89830" className="h-10 w-full rounded-xl border border-gray-200 cursor-pointer" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowForm(false)} className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl text-sm font-medium">Cancel</button>
            <button onClick={() => { setShowForm(false); addToast('School registered! Admin invitation sent.'); }} className="px-5 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 text-sm font-medium shadow-sm">
              Register School
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {schoolsList.map(school => (
          <div key={school.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border" style={{ backgroundColor: school.themeColor + '15', borderColor: school.themeColor + '40' }}>
                  <HiOfficeBuilding style={{ color: school.themeColor }} size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">{school.name}</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5 italic">"{school.motto}"</p>
                  <p className="text-xs text-gray-500 mt-1">{school.address}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors" aria-label="Edit school">
                <HiPencil size={14} className="text-gray-400" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2">
                <HiUserGroup className="text-sky-500" size={16} />
                <div>
                  <p className="text-sm font-bold text-gray-800">{school.studentsCount}</p>
                  <p className="text-[10px] text-gray-400">Students</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2">
                <HiAcademicCap className="text-nature-500" size={16} />
                <div>
                  <p className="text-sm font-bold text-gray-800">{school.teachersCount}</p>
                  <p className="text-[10px] text-gray-400">Teachers</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5">
              <p className="flex items-center gap-2 text-xs text-gray-500">
                <HiMail size={13} className="text-gray-400" /> {school.email}
              </p>
              <p className="flex items-center gap-2 text-xs text-gray-500">
                <HiPhone size={13} className="text-gray-400" /> {school.phone}
              </p>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ${school.subscription === 'premium' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'}`}>
                    {school.subscription}
                  </span>
                  <span className="text-[10px] text-gray-400">Since {school.founded}</span>
                </div>
                <div className="w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: school.themeColor }} title="Brand color" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
