import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { HiBell, HiMenu, HiX, HiLogout, HiUser, HiChevronDown } from 'react-icons/hi';
import NotificationsPanel from './NotificationsPanel';
import { notifications } from '../../mock/data';

export default function Header({ onMenuToggle, sidebarOpen }) {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  const unreadCount = notifications.filter(n => n.userId === user.id && !n.read).length;

  const roleLabels = {
    super_admin: 'Super Admin',
    school_admin: 'School Admin',
    teacher: 'Teacher',
    parent: 'Parent',
  };

  const roleColors = {
    super_admin: 'bg-purple-100 text-purple-700',
    school_admin: 'bg-sky-100 text-sky-700',
    teacher: 'bg-nature-100 text-nature-700',
    parent: 'bg-warm-100 text-warm-700',
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors btn-press"
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          >
            {sidebarOpen ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-warm-500 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-base text-gray-800 tracking-tight">PURETERNIX</span>
              <span className="text-[10px] text-gray-400 block -mt-0.5">Sunrise Montessori</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
              className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors relative btn-press"
              aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
            >
              <HiBell size={21} className="text-gray-500" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 animate-scale-in">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <NotificationsPanel onClose={() => setShowNotifications(false)} />
            )}
          </div>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
              className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-gray-100 transition-colors btn-press"
              aria-label="User menu"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-200 to-primary-300 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-primary-700">{user?.name?.charAt(0)}</span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-700 leading-tight">{user?.name}</p>
                <p className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full inline-block mt-0.5 ${roleColors[user?.role]}`}>{roleLabels[user?.role]}</p>
              </div>
              <HiChevronDown size={14} className="text-gray-400 hidden sm:block" />
            </button>
            {showProfile && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100 py-1 animate-scale-in">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
                </div>
                <div className="p-1">
                  <button className="w-full px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 rounded-lg flex items-center gap-2.5 transition-colors">
                    <HiUser size={16} className="text-gray-400" /> My Profile
                  </button>
                  <button
                    onClick={logout}
                    className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2.5 transition-colors"
                  >
                    <HiLogout size={16} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
