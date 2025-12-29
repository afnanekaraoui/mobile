import { ChevronLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NotificationsPageProps {
  onNavigate: (page: string) => void;
}

export function NotificationsPage({ onNavigate }: NotificationsPageProps) {
  const { notifications, setNotifications } = useApp();

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order': return 'bg-blue-50 border-blue-100';
      case 'stock': return 'bg-amber-50 border-amber-100';
      case 'task': return 'bg-purple-50 border-purple-100';
      default: return 'bg-gray-50 border-gray-100';
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar */}
      <div className="h-11 flex items-center justify-between px-6 pt-2 bg-gray-50">
        <span className="font-semibold">9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-[2px]">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`w-[3px] h-[10px] rounded-sm ${i < 3 ? 'bg-black' : 'bg-gray-300'}`} />
            ))}
          </div>
          <svg className="w-6 h-3" viewBox="0 0 24 12" fill="none">
            <rect x="2" y="1" width="18" height="10" rx="2" stroke="black" strokeWidth="1" fill="none"/>
            <rect x="21" y="4" width="1.5" height="4" rx="0.5" fill="black"/>
            <rect x="4" y="3" width="14" height="6" rx="1" fill="black"/>
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 py-4 bg-gray-50">
        <button onClick={() => onNavigate('home')} className="mb-3">
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <button
            onClick={markAllAsRead}
            className="text-sm text-[#16524a] font-medium"
          >
            Mark all read
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-6 space-y-3 pb-8">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`rounded-2xl p-4 border ${getNotificationColor(notification.type)} ${
              !notification.read ? 'border-l-4 border-l-[#16524a]' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-semibold text-gray-900">{notification.title}</h3>
              <span className="text-xs text-gray-500">{formatTime(notification.date)}</span>
            </div>
            <p className="text-sm text-gray-600">{notification.message}</p>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No notifications</p>
          </div>
        )}
      </div>

      {/* Home Indicator */}
      <div className="fixed bottom-0 left-0 right-0 h-8 flex items-center justify-center bg-gray-50">
        <div className="w-32 h-1 bg-black rounded-full" />
      </div>
    </div>
  );
}
