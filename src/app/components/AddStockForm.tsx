import { useState } from 'react';
import { X } from 'lucide-react';
import { useApp, InventoryItem } from '../context/AppContext';

interface AddStockFormProps {
  onClose: () => void;
}

export function AddStockForm({ onClose }: AddStockFormProps) {
  const { inventory, setInventory } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: 'kg',
    lowStockThreshold: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem: InventoryItem = {
      id: Date.now().toString(),
      name: formData.name,
      quantity: parseFloat(formData.quantity),
      unit: formData.unit,
      lowStockThreshold: parseFloat(formData.lowStockThreshold),
      lastPurchased: new Date().toISOString().split('T')[0]
    };

    setInventory([...inventory, newItem]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-in fade-in duration-200">
      <div className="bg-white w-full rounded-t-3xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add Stock Item</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Item Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Item Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g., Farine, Sucre, Chocolat"
              className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16524a]"
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity *
            </label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              placeholder="e.g., 10"
              className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16524a]"
              required
              min="0"
              step="0.1"
            />
          </div>

          {/* Unit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unit *
            </label>
            <select
              value={formData.unit}
              onChange={(e) => setFormData({...formData, unit: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16524a]"
            >
              <option value="kg">Kilogram (kg)</option>
              <option value="g">Gram (g)</option>
              <option value="l">Liter (l)</option>
              <option value="ml">Milliliter (ml)</option>
              <option value="douzaines">Douzaines</option>
              <option value="pièces">Pièces</option>
            </select>
          </div>

          {/* Low Stock Threshold */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Low Stock Alert Level *
            </label>
            <input
              type="number"
              value={formData.lowStockThreshold}
              onChange={(e) => setFormData({...formData, lowStockThreshold: e.target.value})}
              placeholder="e.g., 5"
              className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16524a]"
              required
              min="0"
              step="0.1"
            />
            <p className="mt-1 text-xs text-gray-500">
              You'll be notified when quantity falls below this level
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-[#16524a] text-white rounded-full font-medium hover:bg-[#1a5d52] active:scale-[0.98] transition-all mt-6"
          >
            Add to Inventory
          </button>
        </form>

        {/* Home Indicator */}
        <div className="pb-6 flex items-center justify-center">
          <div className="w-32 h-1 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}
