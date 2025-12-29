import { House, ShoppingCart, Package, TrendingUp } from 'lucide-react';

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home', icon: House, label: 'Home' },
    { id: 'orders', icon: ShoppingCart, label: 'Orders' },
    { id: 'inventory', icon: Package, label: 'Inventory' },
    { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? 'text-[#16524a]' : 'text-gray-400'
              }`}
              aria-label={item.label}
            >
              <Icon 
                size={24} 
                strokeWidth={isActive ? 2.5 : 2}
                fill={isActive ? 'currentColor' : 'none'}
              />
            </button>
          );
        })}
      </div>
      {/* Home Indicator */}
      <div className="h-6 flex items-center justify-center">
        <div className="w-32 h-1 bg-black rounded-full" />
      </div>
    </div>
  );
}
