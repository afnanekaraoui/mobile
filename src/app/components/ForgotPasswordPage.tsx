import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface ForgotPasswordPageProps {
  onNavigate: (page: 'signin' | 'signup' | 'forgot') => void;
}

export function ForgotPasswordPage({ onNavigate }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    // Handle password reset
    alert('Password reset link sent to ' + email);
    onNavigate('signin');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Status Bar */}
      <div className="h-11 flex items-center justify-between px-6 pt-2">
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
      <div className="px-6 pt-6">
        <button onClick={() => onNavigate('signin')} className="mb-6">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Forgot Password</h1>
      </div>

      {/* Form */}
      <div className="flex-1 px-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              onBlur={handleEmailBlur}
              placeholder="Enter Email address"
              className={`w-full px-4 py-3.5 bg-gray-50 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${
                emailError ? 'focus:ring-red-500 ring-2 ring-red-500' : 'focus:ring-[#16524a]'
              }`}
              required
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-500">{emailError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#16524a] text-white rounded-full font-medium hover:bg-[#1a5d52] transition-colors active:scale-[0.98]"
          >
            Continue
          </button>
        </form>
      </div>

      {/* Home Indicator */}
      <div className="h-8 flex items-center justify-center">
        <div className="w-32 h-1 bg-black rounded-full" />
      </div>
    </div>
  );
}
