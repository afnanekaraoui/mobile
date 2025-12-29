import { Bell, UserRound, Plus, Search, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface InventoryPageProps {
  onNavigate: (page: string) => void;
  onShowAddModal: () => void;
  onShowAddStock: () => void;
}

export function InventoryPage({ onNavigate, onShowAddModal, onShowAddStock }: InventoryPageProps) {
  const { inventory, notifications } = useApp();
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

      {/* Inventory List */}
      <div className="px-6 space-y-3">
        {inventory.map((item) => {
          const isLow = item.quantity < item.lowStockThreshold;
          return (
            <div 
              key={item.id} 
              className={`bg-white rounded-2xl p-4 shadow-sm ${isLow ? 'border-2 border-amber-400' : ''}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  {isLow && (
                    <div className="flex items-center gap-1 text-amber-600 text-sm mt-1">
                      <AlertCircle size={14} />
                      <span>Low Stock</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Quantity</p>
                  <p className={`text-2xl font-bold ${isLow ? 'text-amber-600' : 'text-[#16524a]'}`}>
                    {item.quantity} <span className="text-sm font-normal text-gray-600">{item.unit}</span>
                  </p>
                </div>
                {item.lastPurchased && (
                  <p className="text-xs text-gray-400">
                    Last: {new Date(item.lastPurchased).toLocaleDateString('fr-FR')}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {/* Add Stock Button */}
        <button
          onClick={onShowAddStock}
          className="w-full py-4 bg-[#16524a] text-white rounded-xl font-medium hover:bg-[#1a5d52] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Add Stock Item
        </button>
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
