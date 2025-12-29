import { Bell, UserRound, Plus, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AnalyticsPageProps {
  onNavigate: (page: string) => void;
  onShowAddModal: () => void;
}

export function AnalyticsPage({ onNavigate, onShowAddModal }: AnalyticsPageProps) {
  const { orders, inventory, notifications } = useApp();
  const unreadCount = notifications.filter(n => !n.read).length;

  // Calculate analytics
  const totalRevenue = orders
    .filter(o => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.price, 0);
  
  const pendingRevenue = orders
    .filter(o => o.paymentStatus === 'unpaid')
    .reduce((sum, o) => sum + o.price, 0);
  
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  
  const lowStockItems = inventory.filter(i => i.quantity < i.lowStockThreshold).length;

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
      <div className="px-6 py-4 bg-gray-50">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#16524a]"
            />
          </div>
          <button 
            onClick={() => onNavigate('notifications')}
            className="relative p-2"
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

      {/* Analytics Content */}
      <div className="px-6 space-y-3">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Business Analytics</h2>

        {/* Revenue Cards */}
        <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
          <p className="text-sm text-green-700 mb-1">Total Revenue (Paid)</p>
          <p className="text-3xl font-bold text-green-900">{totalRevenue.toLocaleString()} DA</p>
        </div>

        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
          <p className="text-sm text-amber-700 mb-1">Pending Revenue</p>
          <p className="text-3xl font-bold text-amber-900">{pendingRevenue.toLocaleString()} DA</p>
        </div>

        {/* Orders Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
            <p className="text-sm text-blue-700 mb-2">Completed</p>
            <p className="text-2xl font-bold text-blue-900">{completedOrders}</p>
          </div>
          <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
            <p className="text-sm text-purple-700 mb-2">Pending</p>
            <p className="text-2xl font-bold text-purple-900">{pendingOrders}</p>
          </div>
        </div>

        {/* Stock Alert */}
        {lowStockItems > 0 && (
          <div className="bg-red-50 rounded-2xl p-5 border border-red-200">
            <p className="text-sm text-red-700 mb-1">Low Stock Items</p>
            <p className="text-3xl font-bold text-red-900">{lowStockItems}</p>
            <p className="text-xs text-red-600 mt-2">Items need restocking</p>
          </div>
        )}

        {/* Monthly Overview Placeholder */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">Monthly Overview</h3>
          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Chart coming soon</p>
          </div>
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
