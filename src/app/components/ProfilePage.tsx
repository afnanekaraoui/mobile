import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function ProfilePage({ onNavigate, onLogout }: ProfilePageProps) {
  const { currentUser, language, setLanguage, fontSize, setFontSize } = useApp();

  const settingSections = [
    {
      title: 'Account',
      items: [
        { 
          label: 'Name', 
          value: currentUser?.name || 'Amina',
          action: () => {}
        },
        { 
          label: 'Email', 
          value: currentUser?.email || 'amina@business.dz',
          action: () => {}
        }
      ]
    },
    {
      title: 'Preferences',
      items: [
        {
          label: 'Language',
          value: language === 'ar' ? 'العربية' : language === 'fr' ? 'Français' : 'English',
          action: () => {
            const langs: ('ar' | 'fr' | 'en')[] = ['en', 'fr', 'ar'];
            const currentIndex = langs.indexOf(language);
            const nextIndex = (currentIndex + 1) % langs.length;
            setLanguage(langs[nextIndex]);
          }
        },
        {
          label: 'Font Size',
          value: fontSize === 'large' ? 'Large' : 'Normal',
          action: () => setFontSize(fontSize === 'large' ? 'normal' : 'large')
        }
      ]
    }
  ];

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
      </div>

      {/* Profile Picture */}
      <div className="flex flex-col items-center px-6 pb-6">
        <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">{currentUser?.name || 'Amina'}</h2>
        <p className="text-sm text-gray-500">{currentUser?.email || 'amina@business.dz'}</p>
      </div>

      {/* Settings Sections */}
      <div className="px-6 space-y-6">
        {settingSections.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-sm font-semibold text-gray-500 mb-3 px-2">
              {section.title}
            </h3>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {section.items.map((item, itemIdx) => (
                <button
                  key={itemIdx}
                  onClick={item.action}
                  className={`w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors ${
                    itemIdx < section.items.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <span className="text-gray-900 font-medium">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">{item.value}</span>
                    <ChevronRight size={18} className="text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full bg-red-50 border border-red-200 rounded-2xl py-4 flex items-center justify-center gap-2 hover:bg-red-100 active:scale-[0.98] transition-all"
        >
          <LogOut size={20} className="text-red-600" />
          <span className="font-semibold text-red-600">Log Out</span>
        </button>
      </div>

      {/* Home Indicator */}
      <div className="fixed bottom-0 left-0 right-0 h-8 flex items-center justify-center bg-gray-50">
        <div className="w-32 h-1 bg-black rounded-full" />
      </div>
    </div>
  );
}
