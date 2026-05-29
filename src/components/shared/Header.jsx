import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { HiBell, HiMenu, HiX, HiLogout, HiChevronDown } from 'react-icons/hi';
import NotificationsPanel from './NotificationsPanel';
import { notifications } from '../../mock/data';

export default function Header({ onMenuToggle, sidebarOpen }) {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  const unreadCount = notifications.filter(n => n.userId === user.id && !n.read).length;

  const roleLabels = { super_admin: 'Platform', school_admin: 'Admin', teacher: 'Teacher', parent: 'Parent' };

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-100/80 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 lg:px-6 h-14">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 -ml-1 rounded-[10px] hover:bg-gray-100 transition-colors btn-press"
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          >
            {sidebarOpen ? <HiX size={20} className="text-gray-600" /> : <HiMenu size={20} className="text-gray-600" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-primary-400 to-warm-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-[11px]">P</span>
            </div>
            <span className="font-semibold text-[15px] text-gray-800 tracking-tight hidden sm:block">Paaila</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Notification bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
              className="relative p-2 rounded-[10px] hover:bg-gray-100 transition-colors btn-press"
              aria-label={`${unreadCount} unread notifications`}
            >
              <HiBell size={20} className="text-gray-500" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[16px] h-[16px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-white">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
              className="flex items-center gap-2 ml-1 p-1 pr-2 rounded-[10px] hover:bg-gray-100 transition-colors btn-press"
            >
              <div className="w-7 h-7 bg-gradient-to-br from-primary-200 to-primary-300 rounded-lg flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary-800">{user?.name?.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1">
                <span className="text-[13px] font-medium text-gray-700">{user?.name?.split(' ')[0]}</span>
                <HiChevronDown size={12} className={`text-gray-400 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {showProfile && (
              <div className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-[14px] shadow-xl shadow-gray-200/60 border border-gray-100 py-1.5 animate-scale-in">
                <div className="px-3.5 py-2.5 border-b border-gray-100">
                  <p className="text-[13px] font-medium text-gray-800">{user?.name}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5 truncate">{user?.email}</p>
                  <span className="inline-block mt-1.5 text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{roleLabels[user?.role]}</span>
                </div>
                <div className="p-1.5">
                  <button
                    onClick={logout}
                    className="w-full px-3 py-2 text-left text-[13px] text-gray-600 hover:bg-gray-50 rounded-[8px] flex items-center gap-2.5 transition-colors"
                  >
                    <HiLogout size={15} className="text-gray-400" /> Sign out
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
