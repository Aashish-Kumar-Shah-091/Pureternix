import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HiHome, HiUserGroup, HiAcademicCap, HiClipboardCheck,
  HiHeart, HiSpeakerphone, HiBookOpen, HiChat,
  HiTruck, HiLocationMarker, HiPhotograph, HiOfficeBuilding
} from 'react-icons/hi';

const menuItems = {
  super_admin: [
    { path: '/dashboard', icon: HiHome, label: 'Dashboard' },
    { path: '/tenants', icon: HiOfficeBuilding, label: 'Schools' },
  ],
  school_admin: [
    { path: '/dashboard', icon: HiHome, label: 'Dashboard' },
    { path: '/students', icon: HiUserGroup, label: 'Students' },
    { path: '/teachers', icon: HiAcademicCap, label: 'Teachers' },
    { divider: true, label: 'Daily Operations' },
    { path: '/attendance', icon: HiClipboardCheck, label: 'Attendance' },
    { path: '/meals', icon: HiHeart, label: 'Meal Status' },
    { path: '/pickup', icon: HiLocationMarker, label: 'Pickup' },
    { path: '/bus', icon: HiTruck, label: 'Bus Tracking' },
    { divider: true, label: 'Communication' },
    { path: '/notices', icon: HiSpeakerphone, label: 'Notices' },
    { path: '/homework', icon: HiBookOpen, label: 'Homework' },
    { path: '/feedback', icon: HiChat, label: 'Feedback' },
    { path: '/magazine', icon: HiPhotograph, label: 'Magazine' },
  ],
  teacher: [
    { path: '/dashboard', icon: HiHome, label: 'Dashboard' },
    { divider: true, label: 'Daily Tasks' },
    { path: '/attendance', icon: HiClipboardCheck, label: 'Attendance' },
    { path: '/meals', icon: HiHeart, label: 'Meal Status' },
    { path: '/pickup', icon: HiLocationMarker, label: 'Pickup' },
    { divider: true, label: 'Learning' },
    { path: '/homework', icon: HiBookOpen, label: 'Homework' },
    { path: '/activities', icon: HiPhotograph, label: 'Activities' },
    { path: '/feedback', icon: HiChat, label: 'Parent Feedback' },
  ],
  parent: [
    { path: '/dashboard', icon: HiHome, label: 'Home' },
    { divider: true, label: "My Child's Day" },
    { path: '/attendance', icon: HiClipboardCheck, label: 'Attendance' },
    { path: '/meals', icon: HiHeart, label: 'Meal Status' },
    { path: '/pickup', icon: HiLocationMarker, label: 'Pickup' },
    { path: '/bus', icon: HiTruck, label: 'Bus Tracking' },
    { divider: true, label: 'School Updates' },
    { path: '/notices', icon: HiSpeakerphone, label: 'Notices' },
    { path: '/homework', icon: HiBookOpen, label: 'Homework' },
    { path: '/feedback', icon: HiChat, label: 'Feedback' },
    { path: '/magazine', icon: HiPhotograph, label: 'Magazine' },
  ],
};

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth();
  const location = useLocation();
  const items = menuItems[user?.role] || [];

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transform transition-transform duration-200 ease-out ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}>
        <div className="p-4 border-b border-gray-100 lg:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-warm-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-base text-gray-800">PURETERNIX</span>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto" role="navigation" aria-label="Main navigation">
          {items.map((item, idx) => {
            if (item.divider) {
              return (
                <p key={idx} className="px-3 pt-5 pb-1.5 text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                  {item.label}
                </p>
              );
            }
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 shadow-sm shadow-primary-100/50'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`
                }
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="bg-gradient-to-r from-nature-50 to-primary-50 rounded-xl p-3 border border-nature-100/50">
            <p className="text-[11px] font-medium text-nature-700">Everything looks great today</p>
            <p className="text-[10px] text-nature-600 mt-0.5">Your school is running smoothly</p>
          </div>
        </div>
      </aside>
    </>
  );
}
