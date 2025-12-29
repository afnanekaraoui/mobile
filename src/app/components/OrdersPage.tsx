import { useState } from 'react';
import { Bell, UserRound, Plus, Search, ChevronDown, ChevronUp, MapPin, Calendar, Phone, CreditCard } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface OrdersPageProps {
  onNavigate: (page: string) => void;
  onShowAddModal: () => void;
  onShowAddOrder: () => void;
}

export function OrdersPage({ onNavigate, onShowAddModal, onShowAddOrder }: OrdersPageProps) {
  const { orders, notifications } = useApp();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredOrders = orders.filter(order =>
    order.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentColor = (status: string) => {
    return status === 'paid' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700';
  };

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Orders List */}
      <div className="px-6 space-y-3">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              className="w-full p-4 text-left"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{order.clientName}</h3>
                  <p className="text-sm text-gray-600">{order.product}</p>
                </div>
                {expandedOrder === order.id ? (
                  <ChevronUp size={20} className="text-gray-400 mt-1" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400 mt-1" />
                )}
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${getPaymentColor(order.paymentStatus)}`}>
                  {order.paymentStatus}
                </span>
              </div>

              <p className="font-bold text-[#16524a]">{order.price.toLocaleString()} DA</p>
            </button>

            {/* Expanded Details */}
            {expandedOrder === order.id && (
              <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={16} />
                  <span>{order.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} />
                  <span>{order.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  <span>Due: {new Date(order.dueDate).toLocaleDateString('fr-FR')}</span>
                </div>
                {order.notes && (
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium mb-1">Notes:</p>
                    <p>{order.notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Add Order Button */}
        <button
          onClick={onShowAddOrder}
          className="w-full py-4 bg-[#16524a] text-white rounded-xl font-medium hover:bg-[#1a5d52] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Add New Order
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
