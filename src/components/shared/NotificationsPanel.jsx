import { useAuth } from '../../context/AuthContext';
import { notifications as allNotifications } from '../../mock/data';
import { HiCheckCircle, HiHeart, HiStar, HiSpeakerphone, HiLocationMarker, HiBookOpen, HiTruck, HiPhotograph, HiClipboardCheck } from 'react-icons/hi';

const iconMap = {
  check: { icon: HiCheckCircle, color: 'text-nature-500', bg: 'bg-nature-50' },
  heart: { icon: HiHeart, color: 'text-pink-400', bg: 'bg-pink-50' },
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

  const formatTime = (notif) => {
    const today = new Date().toISOString().split('T')[0];
    if (notif.date === today) return notif.time;
    return 'Yesterday';
  };

  return (
    <div className="absolute right-0 top-full mt-1.5 w-[320px] bg-white rounded-[16px] shadow-xl shadow-gray-200/60 border border-gray-100 max-h-[440px] overflow-hidden animate-scale-in">
      <div className="px-4 py-3 border-b border-gray-100/80 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 text-[14px]">Notifications</h3>
        {unread.length > 0 && (
          <span className="text-[11px] font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">{unread.length} new</span>
        )}
      </div>

      <div className="overflow-y-auto max-h-[380px]">
        {notifs.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[13px] text-gray-500">Nothing new right now</p>
            <p className="text-[11px] text-gray-400 mt-1">We'll let you know when something happens</p>
          </div>
        ) : (
          <div>
            {unread.length > 0 && (
              <div>
                {unread.map(n => <NotifItem key={n.id} notif={n} config={getConfig(n.icon)} formatTime={formatTime} />)}
              </div>
            )}
            {read.length > 0 && (
              <div>
                {unread.length > 0 && <div className="h-px bg-gray-100 mx-4" />}
                <p className="px-4 pt-3 pb-1.5 text-[10px] uppercase tracking-wider font-semibold text-gray-400">Earlier</p>
                {read.slice(0, 4).map(n => <NotifItem key={n.id} notif={n} config={getConfig(n.icon)} formatTime={formatTime} />)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function NotifItem({ notif, config, formatTime }) {
  const Icon = config.icon;
  return (
    <div className={`px-4 py-3 flex gap-2.5 hover:bg-gray-50/80 transition-colors cursor-pointer ${!notif.read ? '' : 'opacity-75'}`}>
      <div className={`w-7 h-7 rounded-[8px] flex items-center justify-center flex-shrink-0 ${config.bg}`}>
        <Icon className={config.color} size={14} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-[13px] leading-[1.4] ${!notif.read ? 'text-gray-800' : 'text-gray-600'}`}>{notif.message}</p>
        <p className="text-[11px] text-gray-400 mt-0.5">{formatTime(notif)}</p>
      </div>
      {!notif.read && <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 flex-shrink-0" />}
    </div>
  );
}
