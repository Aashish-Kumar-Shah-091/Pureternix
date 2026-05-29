import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { HiMail, HiLockClosed, HiEye, HiEyeOff, HiShieldCheck } from 'react-icons/hi';

const testAccounts = [
  { role: 'Super Admin', email: 'superadmin@pureternix.com', password: 'admin123', color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100', desc: 'Platform management' },
  { role: 'School Admin', email: 'admin@sunrisemontessori.edu', password: 'school123', color: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100', desc: 'School operations' },
  { role: 'Teacher', email: 'anita.patel@sunrisemontessori.edu', password: 'teach123', color: 'bg-nature-50 text-nature-700 border-nature-200 hover:bg-nature-100', desc: 'Classroom management' },
  { role: 'Parent', email: 'suresh.gupta@gmail.com', password: 'parent123', color: 'bg-warm-50 text-warm-700 border-warm-200 hover:bg-warm-100', desc: 'Child updates' },
];

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise(r => setTimeout(r, 600));

    const result = login(email, password);
    if (!result.success) {
      setError(result.error);
      setIsLoading(false);
    }
  };

  const quickLogin = async (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setError('');
    setIsLoading(true);

    await new Promise(r => setTimeout(r, 400));
    login(account.email, account.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-primary-50 to-nature-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-400 to-warm-500 rounded-2xl mb-4 shadow-lg shadow-primary-200/50">
            <span className="text-white font-bold text-2xl">P</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">PURETERNIX</h1>
          <p className="text-gray-500 mt-1 text-sm">Your child's day, one tap away</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-7 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <HiMail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-400 outline-none transition-all text-sm"
                  placeholder="you@example.com"
                  required
                  aria-label="Email address"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <HiLockClosed className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  className="w-full pl-10 pr-11 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-400 outline-none transition-all text-sm"
                  placeholder="Enter your password"
                  required
                  aria-label="Password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 p-0.5 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 bg-red-50 border border-red-100 rounded-xl animate-slide-up">
                <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-gradient-to-r from-primary-500 to-warm-500 hover:from-primary-600 hover:to-warm-600 text-white font-medium rounded-xl transition-all shadow-sm shadow-primary-200/50 btn-press disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-7 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <HiShieldCheck className="text-nature-500" size={16} />
              <p className="text-xs text-gray-500">Demo accounts — click to sign in instantly</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {testAccounts.map(acc => (
                <button
                  key={acc.role}
                  onClick={() => quickLogin(acc)}
                  disabled={isLoading}
                  className={`px-3 py-2.5 rounded-xl border text-left transition-all hover:shadow-sm btn-press disabled:opacity-50 ${acc.color}`}
                >
                  <p className="text-xs font-semibold">{acc.role}</p>
                  <p className="text-[10px] opacity-70 mt-0.5">{acc.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Secure platform for Montessori schools & families
        </p>
      </div>
    </div>
  );
}
