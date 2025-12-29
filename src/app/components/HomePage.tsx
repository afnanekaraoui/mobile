import { Bell, UserRound, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onShowAddModal: () => void;
}

export function HomePage({ onNavigate, onShowAddModal }: HomePageProps) {
  const { currentUser, tasks, notifications } = useApp();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
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
      <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
          <span className="font-semibold text-gray-900">My business assistant</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('notifications')}
            className="relative p-1"
            aria-label="Notifications"
          >
            <Bell size={20} className="text-gray-700" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => onNavigate('profile')}
            aria-label="Profile"
          >
            <UserRound size={20} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="px-6 py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Welcome back {currentUser?.name || 'Amina'}!
        </h1>

        {/* Task Cards */}
        <div className="space-y-3">
          {/* Urgent Task Card */}
          <div className="bg-[#ffb3b3] rounded-2xl p-4 min-h-[100px] flex items-center">
            <p className="text-sm text-gray-900">
              <span className="font-semibold">Tartempeaux NA340!</span><br />
              my tdday list
            </p>
          </div>

          {/* Empty Card */}
          <div className="bg-gray-200 rounded-2xl p-4 min-h-[80px]" />

          {/* Success Card */}
          <div className="bg-[#b8d4a8] rounded-2xl p-4 min-h-[80px]" />

          {/* Another Empty Card */}
          <div className="bg-gray-200 rounded-2xl p-4 min-h-[100px]" />
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={onShowAddModal}
        className="fixed bottom-28 right-6 w-14 h-14 bg-[#16524a] rounded-full flex items-center justify-center shadow-lg hover:bg-[#1a5d52] active:scale-95 transition-all z-50"
        aria-label="Add new item"
      >
        <Plus size={28} className="text-white" strokeWidth={2.5} />
      </button>
    </div>
  );
}
