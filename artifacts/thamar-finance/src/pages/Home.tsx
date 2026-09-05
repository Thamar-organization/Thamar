import { FormEvent, useState } from 'react';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { Link, useLocation } from 'wouter';

import useLanguagePreference from '@/hooks/use-language';

export default function Home() {
  const [, setLocation] = useLocation();
  const [language, setLanguage] = useLanguagePreference();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const isArabic = language === 'ar';

  const copy = isArabic
    ? {
        welcome: 'أهلاً بك في ثَمَر',
        subtitle: 'استثمر أموالك اليوم لمستقبل مالي مستدام',
        login: 'تسجيل الدخول',
        createAccount: 'إنشاء حساب جديد',
        email: 'البريد الإلكتروني',
        emailPlaceholder: 'اكتب بريدك الإلكتروني',
        password: 'كلمة المرور',
        passwordPlaceholder: 'اكتب كلمة المرور',
        confirmPassword: 'تأكيد كلمة المرور',
        confirmPasswordPlaceholder: 'أعد كتابة كلمة المرور',
        forgot: 'نسيت كلمة المرور؟',
        startLogin: 'تسجيل الدخول',
        startCreate: 'إنشاء الحساب',
        noAccount: 'ليس لديك حساب؟',
        hasAccount: 'لديك حساب بالفعل؟',
        signup: 'سجّل حساباً جديداً',
        loginLink: 'سجّل دخولك',
        privacy: 'سياسة الخصوصية',
        english: 'English',
        arabic: 'العربية',
      }
    : {
        welcome: 'Welcome to Thamar',
        subtitle: 'Make room for tomorrow by understanding today.',
        login: 'Sign in',
        createAccount: 'Create account',
        email: 'Email address',
        emailPlaceholder: 'you@example.com',
        password: 'Password',
        passwordPlaceholder: 'Enter your password',
        confirmPassword: 'Confirm password',
        confirmPasswordPlaceholder: 'Re-enter your password',
        forgot: 'Forgot password?',
        startLogin: 'Sign in',
        startCreate: 'Create account',
        noAccount: 'New to Thamar?',
        hasAccount: 'Already have an account?',
        signup: 'Create one',
        loginLink: 'Sign in here',
        privacy: 'Privacy policy',
        english: 'English',
        arabic: 'العربية',
      };

  const onSubmit = (event?: FormEvent) => {
    event?.preventDefault();
    setError('');
    
    if (!isLoginMode && password !== confirmPassword) {
      setError(isArabic ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match');
      return;
    }
    
    setLocation('/dashboard');
  };

  const toggleMode = () => {
    setIsLoginMode((prev) => !prev);
    setError('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <main
      className="min-h-[100dvh] flex flex-col lg:flex-row bg-[#1a2b21] text-[#f4f7f1] selection:bg-[#d9edbd] selection:text-[#1a2b21]"
      lang={language}
      dir="ltr"
    >
      {/* Header for Language Toggle */}
      <header className="absolute top-0 w-full flex justify-between p-6 z-20 pointer-events-none">
        <div />
        <button
          type="button"
          onClick={() => setLanguage(isArabic ? 'en' : 'ar')}
          className="pointer-events-auto rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-white transition-all hover:bg-white/10 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9edbd]"
          data-testid="button-language-toggle"
          aria-label={isArabic ? 'Switch to English' : 'التبديل إلى العربية'}
        >
          {isArabic ? copy.english : copy.arabic}
        </button>
      </header>

      {/* Logo & Branding Side */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 pt-24 lg:p-24 relative overflow-hidden">
        {/* Subtle radial glow behind the logo for contrast */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center" dir={isArabic ? 'rtl' : 'ltr'}>
          <Link href="/" className="inline-block outline-none rounded-2xl focus-visible:ring-4 focus-visible:ring-[#d9edbd]/50" data-testid="link-home-logo" aria-label="Thamar home">
            <img
              src={`${import.meta.env.BASE_URL}thamar-brand-transparent.png`}
              alt={isArabic ? 'شعار ثَمَر' : 'Thamar logo'}
              className="h-48 w-48 sm:h-64 sm:w-64 lg:h-80 lg:w-80 object-contain drop-shadow-2xl"
              data-testid="img-home-logo"
            />
          </Link>
          <h1 className="mt-8 lg:mt-12 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white drop-shadow-sm" data-testid="heading-home">
            {copy.welcome}
          </h1>
          <p className="mt-4 text-[#b8cbaa] text-base lg:text-lg max-w-md font-medium" data-testid="text-home-subtitle">
            {copy.subtitle}
          </p>
        </div>

        <div className="absolute bottom-6 text-[10px] text-white/30 hidden lg:block">
          © 2025 Thamar
        </div>
      </div>

      {/* Auth Form Side */}
      <div
        className="w-full lg:w-[460px] xl:w-[520px] flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 z-10 lg:border-s border-white/5 bg-[#16241c] lg:bg-transparent lg:shadow-[-20px_0_40px_rgba(0,0,0,0.1)]"
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        <div className="w-full max-w-[360px] mx-auto">
          <div className="mb-10">
            <h2 className="font-display text-3xl font-semibold text-white tracking-tight" data-testid="heading-login">
              {isLoginMode ? copy.login : copy.createAccount}
            </h2>
          </div>

          <form onSubmit={onSubmit} className="space-y-5" aria-label={isLoginMode ? copy.login : copy.createAccount}>
            {error && (
              <div className="rounded-lg bg-red-500/10 p-3 text-sm font-medium text-red-400 text-center animate-in fade-in zoom-in-95" role="alert">
                {error}
              </div>
            )}

            <label className="block">
              <span className="block mb-2 text-sm font-medium text-[#b8cbaa]">{copy.email}</span>
              <span className="relative block">
                <Mail className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-white/40 ${isArabic ? 'right-4' : 'left-4'}`} size={18} aria-hidden="true" />
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={copy.emailPlaceholder}
                  className={`w-full rounded-xl border border-white/10 bg-white/5 py-3.5 text-sm text-white placeholder:text-white/30 shadow-sm outline-none transition-all hover:border-white/20 focus:border-[#d9edbd] focus:bg-white/10 focus:ring-4 focus:ring-[#d9edbd]/20 ${isArabic ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                  data-testid="input-email"
                />
              </span>
            </label>

            <label className="block">
              <span className="block mb-2 text-sm font-medium text-[#b8cbaa]">{copy.password}</span>
              <span className="relative block">
                <LockKeyhole className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-white/40 ${isArabic ? 'right-4' : 'left-4'}`} size={18} aria-hidden="true" />
                <input
                  required
                  minLength={4}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isLoginMode ? 'current-password' : 'new-password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={copy.passwordPlaceholder}
                  className={`w-full rounded-xl border border-white/10 bg-white/5 py-3.5 text-sm text-white placeholder:text-white/30 shadow-sm outline-none transition-all hover:border-white/20 focus:border-[#d9edbd] focus:bg-white/10 focus:ring-4 focus:ring-[#d9edbd]/20 ${isArabic ? 'pr-11 pl-11' : 'pl-11 pr-11'}`}
                  data-testid="input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white ${isArabic ? 'left-4' : 'right-4'} focus-visible:outline-none focus-visible:text-white`}
                  data-testid="button-toggle-password"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>

            {!isLoginMode && (
              <label className="block animate-in fade-in slide-in-from-top-2 duration-300">
                <span className="block mb-2 text-sm font-medium text-[#b8cbaa]">{copy.confirmPassword}</span>
                <span className="relative block">
                  <LockKeyhole className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-white/40 ${isArabic ? 'right-4' : 'left-4'}`} size={18} aria-hidden="true" />
                  <input
                    required
                    minLength={4}
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={copy.confirmPasswordPlaceholder}
                    className={`w-full rounded-xl border border-white/10 bg-white/5 py-3.5 text-sm text-white placeholder:text-white/30 shadow-sm outline-none transition-all hover:border-white/20 focus:border-[#d9edbd] focus:bg-white/10 focus:ring-4 focus:ring-[#d9edbd]/20 ${isArabic ? 'pr-11 pl-11' : 'pl-11 pr-11'}`}
                    data-testid="input-confirm-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white ${isArabic ? 'left-4' : 'right-4'} focus-visible:outline-none focus-visible:text-white`}
                    data-testid="button-toggle-confirm-password"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </span>
              </label>
            )}

            {isLoginMode && (
              <div className={`mt-2 flex ${isArabic ? 'justify-start' : 'justify-end'}`}>
                <button
                  type="button"
                  onClick={() => window.alert(isArabic ? 'هذه تجربة فقط — لا تحتاج إلى استعادة كلمة مرور.' : 'This is a demo — password recovery is not needed.')}
                  className="text-xs font-medium text-[#b8cbaa] hover:text-[#d9edbd] underline decoration-transparent hover:decoration-[#d9edbd]/50 underline-offset-4 transition-colors focus-visible:outline-none focus-visible:text-[#d9edbd]"
                  data-testid="button-forgot-password"
                >
                  {copy.forgot}
                </button>
              </div>
            )}

            <button
              type="submit"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#d9edbd] py-4 text-sm font-semibold text-[#16241c] shadow-[0_0_20px_rgba(217,237,189,0.15)] transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_4px_25px_rgba(255,255,255,0.2)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#d9edbd]/50"
              data-testid="button-submit-auth"
            >
              {isLoginMode ? copy.startLogin : copy.startCreate}
            </button>

            <div className="mt-8 text-center text-sm text-[#b8cbaa]">
              <span>{isLoginMode ? copy.noAccount : copy.hasAccount} </span>
              <button
                type="button"
                onClick={toggleMode}
                className="font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-[#d9edbd] hover:decoration-[#d9edbd]/50 focus-visible:outline-none focus-visible:text-[#d9edbd]"
                data-testid="button-toggle-mode"
              >
                {isLoginMode ? copy.signup : copy.loginLink}
              </button>
            </div>
          </form>

          <div className="mt-12 lg:mt-16 text-center">
            <Link
              href="/privacy"
              className="text-xs font-medium text-white/40 hover:text-white transition-colors underline decoration-transparent hover:decoration-white/40 underline-offset-4 focus-visible:outline-none focus-visible:text-white"
              data-testid="link-privacy"
            >
              {copy.privacy}
            </Link>
          </div>
          
          <div className="mt-6 text-center text-[10px] text-white/30 lg:hidden">
            © 2025 Thamar
          </div>
        </div>
      </div>
    </main>
  );
}
