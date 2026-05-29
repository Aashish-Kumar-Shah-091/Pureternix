import { useAuth } from '../../context/AuthContext';
import { notifications as allNotifications } from '../../mock/data';
import { HiCheckCircle, HiHeart, HiStar, HiSpeakerphone, HiLocationMarker, HiBookOpen, HiTruck, HiPhotograph, HiClipboardCheck } from 'react-icons/hi';

const iconMap = {
  check: { icon: HiCheckCircle, color: 'text-nature-500', bg: 'bg-nature-50' },
  heart: { icon: HiHeart, color: 'text-pink-500', bg: 'bg-pink-50' },
  star: { icon: HiStar, color: 'text-primary-500', bg: 'bg-primary-50' },
  megaphone: { icon: HiSpeakerphone, color: 'text-sky-500', bg: 'bg-sky-50' },
  location: { icon: HiLocationMarker, color: 'text-purple-500', bg: 'bg-purple-50' },
  book: { icon: HiBookOpen, color: 'text-warm-500', bg: 'bg-warm-50' },
  bus: { icon: HiTruck, color: 'text-sky-600', bg: 'bg-sky-50' },
  photo: { icon: HiPhotograph, color: 'text-primary-500', bg: 'bg-primary-50' },
  clipboard: { icon: HiClipboardCheck, color: 'text-nature-600', bg: 'bg-nature-50' },
};

export default function NotificationsPanel({ onClose }) {
  const { user } = useAuth();
  const notifs = allNotifications.filter(n => n.userId === user.id);
  const unread = notifs.filter(n => !n.read);
  const read = notifs.filter(n => n.read);

  const getConfig = (icon) => iconMap[icon] || iconMap.check;

  return (
    <div className="absolute right-0 top-full mt-2 w-[340px] bg-white rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100 max-h-[480px] overflow-hidden animate-scale-in">
      <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-gray-800 text-sm">Notifications</h3>
          {unread.length > 0 && <p className="text-xs text-primary-600 font-medium">{unread.length} new</p>}
        </div>
        <button onClick={onClose} className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors">
          Close
        </button>
      </div>

      <div className="overflow-y-auto max-h-[400px]">
        {notifs.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <HiCheckCircle className="text-gray-300" size={24} />
            </div>
            <p className="text-sm text-gray-500">You're all caught up!</p>
            <p className="text-xs text-gray-400 mt-1">No new notifications</p>
          </div>
        ) : (
          <>
            {unread.length > 0 && (
              <div>
                <p className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-wider font-semibold text-gray-400">New</p>
                {unread.map(n => <NotifItem key={n.id} notif={n} config={getConfig(n.icon)} />)}
              </div>
            )}
            {read.length > 0 && (
              <div>
                <p className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-wider font-semibold text-gray-400">Earlier</p>
                {read.map(n => <NotifItem key={n.id} notif={n} config={getConfig(n.icon)} />)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function NotifItem({ notif, config }) {
  const Icon = config.icon;
  return (
    <div className={`px-4 py-3 flex gap-3 hover:bg-gray-50 transition-colors cursor-pointer ${!notif.read ? 'bg-primary-50/30' : ''}`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${config.bg}`}>
        <Icon className={config.color} size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm leading-snug ${!notif.read ? 'text-gray-800 font-medium' : 'text-gray-600'}`}>{notif.message}</p>
        <p className="text-[11px] text-gray-400 mt-1">{notif.time} · {notif.date === new Date().toISOString().split('T')[0] ? 'Today' : 'Yesterday'}</p>
      </div>
      {!notif.read && <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0" />}
    </div>
  );
}
