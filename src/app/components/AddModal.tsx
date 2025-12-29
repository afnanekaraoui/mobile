import { X, ClipboardList, ShoppingCart, Package } from 'lucide-react';

interface AddModalProps {
  onClose: () => void;
  onSelect: (type: 'task' | 'order' | 'stock') => void;
}

export function AddModal({ onClose, onSelect }: AddModalProps) {
  const options = [
    { id: 'task', icon: ClipboardList, label: 'Add Task', color: 'bg-purple-50', iconColor: 'text-purple-600' },
    { id: 'order', icon: ShoppingCart, label: 'Add Order', color: 'bg-blue-50', iconColor: 'text-blue-600' },
    { id: 'stock', icon: Package, label: 'Add Stock', color: 'bg-green-50', iconColor: 'text-green-600' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-in fade-in duration-200">
      <div className="bg-white w-full rounded-t-3xl p-6 pb-safe animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add New</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-3">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => {
                  onSelect(option.id as 'task' | 'order' | 'stock');
                  onClose();
                }}
                className={`w-full ${option.color} rounded-xl p-4 flex items-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all`}
              >
                <div className={`w-12 h-12 ${option.color} rounded-full flex items-center justify-center`}>
                  <Icon size={24} className={option.iconColor} />
                </div>
                <span className="font-semibold text-gray-900">{option.label}</span>
              </button>
            );
          })}
        </div>

        {/* Home Indicator */}
        <div className="mt-6 flex items-center justify-center">
          <div className="w-32 h-1 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}
