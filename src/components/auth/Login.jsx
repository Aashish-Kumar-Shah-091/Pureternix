import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';

const testAccounts = [
  { role: 'Super Admin', email: 'superadmin@paaila.com', color: 'border-purple-200 hover:border-purple-300 hover:bg-purple-50/50', dot: 'bg-purple-400' },
  { role: 'School Admin', email: 'admin@sunrisemontessori.edu', color: 'border-sky-200 hover:border-sky-300 hover:bg-sky-50/50', dot: 'bg-sky-400' },
  { role: 'Teacher', email: 'anita.patel@sunrisemontessori.edu', color: 'border-nature-200 hover:border-nature-300 hover:bg-nature-50/50', dot: 'bg-nature-400' },
  { role: 'Parent', email: 'suresh.gupta@gmail.com', color: 'border-warm-200 hover:border-warm-300 hover:bg-warm-50/50', dot: 'bg-warm-400' },
];

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise(r => setTimeout(r, 700));

    const result = login(email, password);
    if (!result.success) {
      setError(result.error);
      setIsLoading(false);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const selectAccount = (account) => {
    setEmail(account.email);
    setPassword('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-nature-100/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="w-full max-w-[380px] relative animate-fade-in">
        {/* Logo & branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary-400 to-warm-500 rounded-[14px] mb-4 shadow-lg shadow-primary-200/40">
            <span className="text-white font-bold text-xl tracking-tight">P</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Paaila</h1>
          <p className="text-[13px] text-gray-500 mt-1">Stay connected to your child's day</p>
        </div>

        <div className={`bg-white rounded-[20px] shadow-xl shadow-gray-200/40 p-6 border border-gray-100/80 ${shake ? 'animate-wiggle' : ''}`}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <HiMail className="absolute left-3.5 top-[11px] text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  className="w-full pl-10 pr-4 py-[10px] bg-gray-50/80 border border-gray-200 rounded-[12px] focus:ring-2 focus:ring-primary-200/80 focus:border-primary-300 focus:bg-white outline-none text-[14px] transition-all placeholder:text-gray-400"
                  placeholder="you@school.edu"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-3.5 top-[11px] text-gray-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  className="w-full pl-10 pr-11 py-[10px] bg-gray-50/80 border border-gray-200 rounded-[12px] focus:ring-2 focus:ring-primary-200/80 focus:border-primary-300 focus:bg-white outline-none text-[14px] transition-all placeholder:text-gray-400"
                  placeholder="Your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[9px] p-1 text-gray-400 hover:text-gray-600 rounded-md transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-[13px] text-red-500 bg-red-50/80 px-3 py-2 rounded-[10px] border border-red-100 animate-slide-up">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full py-[11px] bg-gray-900 hover:bg-gray-800 text-white font-medium text-[14px] rounded-[12px] transition-all btn-press disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3.5" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </>
              ) : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-[11px] text-gray-400 mb-3 uppercase tracking-wider font-medium">Select account</p>
            <div className="grid grid-cols-2 gap-2">
              {testAccounts.map(acc => (
                <button
                  key={acc.role}
                  onClick={() => selectAccount(acc)}
                  disabled={isLoading}
                  className={`flex items-center gap-2 px-3 py-[9px] rounded-[10px] border text-left transition-all btn-press disabled:opacity-40 bg-white ${acc.color}`}
                >
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${acc.dot}`} />
                  <span className="text-[12px] font-medium text-gray-700">{acc.role}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-gray-400 mt-5">
          Paaila · Built for schools that care
        </p>
      </div>
    </div>
  );
}
