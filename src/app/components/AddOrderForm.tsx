import { useState } from 'react';
import { X, Calendar, MapPin, Phone, DollarSign } from 'lucide-react';
import { useApp, Order } from '../context/AppContext';

interface AddOrderFormProps {
  onClose: () => void;
}

export function AddOrderForm({ onClose }: AddOrderFormProps) {
  const { orders, setOrders } = useApp();
  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    product: '',
    price: '',
    location: '',
    dueDate: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newOrder: Order = {
      id: Date.now().toString(),
      clientName: formData.clientName,
      product: formData.product,
      price: parseFloat(formData.price),
      dueDate: formData.dueDate,
      location: formData.location,
      status: 'pending',
      paymentStatus: 'unpaid',
      phone: formData.phone,
      notes: formData.notes
    };

    setOrders([...orders, newOrder]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-in fade-in duration-200">
      <div className="bg-white w-full h-[90vh] rounded-t-3xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">New Order</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-4">
            {/* Client Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Name *
              </label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                placeholder="e.g., Sarah Benali"
                className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16524a]"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone size={16} className="inline mr-1" />
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="e.g., 0555123456"
                className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16524a]"
                required
              />
            </div>

            {/* Product */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Description *
              </label>
              <input
                type="text"
                value={formData.product}
                onChange={(e) => setFormData({...formData, product: e.target.value})}
                placeholder="e.g., Gâteau Chocolat 3 étages"
                className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16524a]"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (DA) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                placeholder="e.g., 4500"
                className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16524a]"
                required
                min="0"
                step="0.01"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-1" />
                Due Date *
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16524a]"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin size={16} className="inline mr-1" />
                Delivery Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="e.g., Hydra, Alger"
                className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16524a]"
                required
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Any special requirements or decorations..."
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16524a] resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="p-6 border-t border-gray-200 bg-white">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#16524a] text-white rounded-full font-medium hover:bg-[#1a5d52] active:scale-[0.98] transition-all"
            >
              Add Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
