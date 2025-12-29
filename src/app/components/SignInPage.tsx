import { useState } from 'react';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';

interface SignInPageProps {
  onSignIn: (email: string, password: string) => void;
  onNavigate: (page: 'signin' | 'signup' | 'forgot') => void;
}

export function SignInPage({ onSignIn, onNavigate }: SignInPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    onSignIn(email, password);
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

      {/* Logo */}
      <div className="flex-1 flex flex-col items-center justify-start px-6 pt-12">
        <div className="mb-12">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <path d="M60 20 L90 45 L90 70 L60 50 Z" fill="#8FBC8F" />
            <path d="M30 45 L60 20 L60 50 L30 70 Z" fill="#16524a" />
            <path d="M60 50 L90 70 L60 95 L30 70 Z" fill="#C9B4D4" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-12">Sign in</h1>

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              onBlur={handleEmailBlur}
              placeholder="Email address"
              className={`w-full px-4 py-3.5 bg-gray-50 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${
                emailError ? 'focus:ring-red-500 ring-2 ring-red-500' : 'focus:ring-[#16524a]'
              }`}
              required
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-500">{emailError}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3.5 bg-gray-50 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16524a]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => onNavigate('forgot')}
              className="text-sm text-gray-900"
            >
              forgot password
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#16524a] text-white rounded-full font-medium hover:bg-[#1a5d52] transition-colors active:scale-[0.98]"
          >
            Continue
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600">
          Don't have an Account?{' '}
          <button
            onClick={() => onNavigate('signup')}
            className="font-semibold text-gray-900"
          >
            Create One
          </button>
        </p>
      </div>

      {/* Home Indicator */}
      <div className="h-8 flex items-center justify-center">
        <div className="w-32 h-1 bg-black rounded-full" />
      </div>
    </div>
  );
}
