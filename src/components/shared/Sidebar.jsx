import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HiHome, HiUserGroup, HiAcademicCap, HiClipboardCheck,
  HiHeart, HiSpeakerphone, HiBookOpen, HiChat,
  HiTruck, HiLocationMarker, HiPhotograph, HiOfficeBuilding
} from 'react-icons/hi';

const menuItems = {
  super_admin: [
    { path: '/dashboard', icon: HiHome, label: 'Overview' },
    { path: '/tenants', icon: HiOfficeBuilding, label: 'Schools' },
  ],
  school_admin: [
    { path: '/dashboard', icon: HiHome, label: 'Dashboard' },
    { path: '/students', icon: HiUserGroup, label: 'Students' },
    { path: '/teachers', icon: HiAcademicCap, label: 'Teachers' },
    { divider: true, label: 'Daily' },
    { path: '/attendance', icon: HiClipboardCheck, label: 'Attendance' },
    { path: '/meals', icon: HiHeart, label: 'Meals' },
    { path: '/pickup', icon: HiLocationMarker, label: 'Pickup' },
    { path: '/bus', icon: HiTruck, label: 'Bus' },
    { divider: true, label: 'Connect' },
    { path: '/notices', icon: HiSpeakerphone, label: 'Notices' },
    { path: '/homework', icon: HiBookOpen, label: 'Homework' },
    { path: '/feedback', icon: HiChat, label: 'Feedback' },
    { path: '/magazine', icon: HiPhotograph, label: 'Magazine' },
  ],
  teacher: [
    { path: '/dashboard', icon: HiHome, label: 'My Day' },
    { divider: true, label: 'Classroom' },
    { path: '/attendance', icon: HiClipboardCheck, label: 'Attendance' },
    { path: '/meals', icon: HiHeart, label: 'Meals' },
    { path: '/pickup', icon: HiLocationMarker, label: 'Pickup' },
    { divider: true, label: 'Share' },
    { path: '/homework', icon: HiBookOpen, label: 'Homework' },
    { path: '/activities', icon: HiPhotograph, label: 'Activities' },
    { path: '/feedback', icon: HiChat, label: 'Feedback' },
  ],
  parent: [
    { path: '/dashboard', icon: HiHome, label: 'Home' },
    { divider: true, label: 'Today' },
    { path: '/attendance', icon: HiClipboardCheck, label: 'Attendance' },
    { path: '/meals', icon: HiHeart, label: 'Meals' },
    { path: '/pickup', icon: HiLocationMarker, label: 'Pickup' },
    { path: '/bus', icon: HiTruck, label: 'Bus' },
    { divider: true, label: 'Updates' },
    { path: '/notices', icon: HiSpeakerphone, label: 'Notices' },
    { path: '/homework', icon: HiBookOpen, label: 'Homework' },
    { path: '/feedback', icon: HiChat, label: 'Feedback' },
    { path: '/magazine', icon: HiPhotograph, label: 'Magazine' },
  ],
};

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth();
  const items = menuItems[user?.role] || [];

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/15 backdrop-blur-[2px] z-40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-56 bg-white border-r border-gray-100/80 transform transition-transform duration-200 ease-out ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}>
        <div className="p-4 border-b border-gray-100/80 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-primary-400 to-warm-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-[11px]">P</span>
            </div>
            <span className="font-semibold text-[15px] text-gray-800">Paaila</span>
          </div>
        </div>

        <nav className="flex-1 px-2.5 py-3 space-y-0.5 overflow-y-auto" role="navigation" aria-label="Main">
          {items.map((item, idx) => {
            if (item.divider) {
              return (
                <p key={idx} className="px-3 pt-5 pb-1 text-[10px] uppercase tracking-[0.08em] font-semibold text-gray-400">
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
                  `flex items-center gap-2.5 px-3 py-[9px] rounded-[10px] text-[13px] font-medium transition-all ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`
                }
              >
                <item.icon size={17} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom section - contextual message */}
        <div className="p-3 border-t border-gray-100/80">
          <div className="bg-nature-50/60 rounded-[10px] p-3">
            <p className="text-[11px] text-nature-700 font-medium leading-relaxed">
              {user?.role === 'parent' ? 'Your children are in great hands today.' :
               user?.role === 'teacher' ? "You're making a difference." :
               'All systems running smoothly.'}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
