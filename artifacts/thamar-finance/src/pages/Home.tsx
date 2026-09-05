import { FormEvent, useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'wouter';

import useLanguagePreference from '@/hooks/use-language';

export default function Home() {
  const [, setLocation] = useLocation();
  const [language, setLanguage] = useLanguagePreference();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isArabic = language === 'ar';

  const copy = isArabic ? {
    welcome: 'أهلاً بك في ثَمَر',
    subtitle: 'استثمر أموالك اليوم لمستقبل مالي مستدام',
    login: 'تسجيل الدخول',
    loginHint: 'أدخل بياناتك لنفتح لك دفتر ثَمَر المالي.',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'اكتب بريدك الإلكتروني',
    password: 'كلمة المرور',
    passwordPlaceholder: 'اكتب كلمة المرور',
    forgot: 'نسيت كلمة المرور؟',
    start: 'ابدأ الاستثمار',
    noAccount: 'ليس لديك حساب؟',
    signup: 'سجّل حساباً جديداً',
    privacy: 'سياسة الخصوصية',
    reassurance: 'بيانات تجريبية فقط',
    reassuranceText: 'لا نطلب هويتك أو حسابك البنكي أو بيانات بطاقتك.',
    note: 'تجربة ثَمَر — لا توجد معاملات حقيقية',
    english: 'English',
    arabic: 'العربية',
  } : {
    welcome: 'Welcome to Thamar',
    subtitle: 'Make room for tomorrow by understanding today.',
    login: 'Sign in',
    loginHint: 'Enter your details to open your Thamar money journal.',
    email: 'Email address',
    emailPlaceholder: 'you@example.com',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    forgot: 'Forgot password?',
    start: 'Start investing',
    noAccount: 'New to Thamar?',
    signup: 'Enter the demo',
    privacy: 'Privacy policy',
    reassurance: 'Demo data only',
    reassuranceText: 'We never ask for your identity, bank, card, or banking password.',
    note: 'Thamar demo — no real transactions',
    english: 'English',
    arabic: 'العربية',
  };

  const enterDemo = (event?: FormEvent) => {
    event?.preventDefault();
    setLocation('/dashboard');
  };

  return (
    <main className={`app-shell grain page-enter ${isArabic ? 'rtl' : 'ltr'}`} lang={language}>
      <div className="min-h-[100dvh] px-4 py-4 sm:px-8 sm:py-8 lg:px-14 lg:py-10">
        <header className="mx-auto flex max-w-[1280px] items-center justify-between px-1 py-1">
          <Link href="/" className="flex items-center no-underline" data-testid="link-home-logo" aria-label="Thamar home">
            <img
              src={`${import.meta.env.BASE_URL}thamar-brand-transparent.png`}
              alt={isArabic ? 'شعار ثَمَر' : 'Thamar logo'}
              className="h-16 w-16 object-contain sm:h-20 sm:w-20"
              data-testid="img-home-header-logo"
            />
          </Link>
          <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
            <span className="hidden sm:inline" data-testid="text-demo-note">{copy.note}</span>
            <button
              type="button"
              onClick={() => setLanguage(isArabic ? 'en' : 'ar')}
              className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 font-medium text-[var(--olive-deep)] transition hover:border-[var(--olive)]"
              data-testid="button-language-toggle"
              aria-label={isArabic ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              {isArabic ? copy.english : copy.arabic}
            </button>
          </div>
        </header>

        <section className="mx-auto mt-8 grid min-h-[650px] max-w-[1280px] overflow-hidden rounded-[2.4rem] bg-[var(--leaf)] shadow-[0_26px_70px_rgba(87,108,53,.12)] lg:mt-12 lg:grid-cols-[1.1fr_.9fr]" dir="ltr">
          <div className="relative flex flex-col items-center justify-center overflow-hidden px-7 py-10 text-center sm:px-14 sm:py-14 lg:px-16 lg:py-16">
            <div className="absolute -left-20 top-20 h-72 w-72 rounded-full border-[36px] border-[#c8e4a6] opacity-70" />
            <div className="absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-[#c3dfa0] opacity-55" />
            <div className="relative z-10 flex flex-col items-center">
              <img
                src={`${import.meta.env.BASE_URL}thamar-brand-transparent.png`}
                alt={isArabic ? 'شعار ثَمَر' : 'Thamar logo'}
                className="h-64 w-64 object-contain drop-shadow-[0_20px_28px_rgba(87,108,53,.15)] sm:h-80 sm:w-80 lg:h-[390px] lg:w-[390px]"
                data-testid="img-home-logo"
              />
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[.22em] text-[var(--olive)]">A calmer view of money</p>
              <h1 className="mt-3 max-w-md font-display text-3xl font-semibold leading-[1.45] tracking-[-.08em] text-[var(--ink)] sm:text-4xl" data-testid="heading-home">{copy.welcome}</h1>
              <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--olive-deep)]" data-testid="text-home-subtitle">{copy.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center justify-center bg-[var(--paper)] px-6 py-10 sm:px-14 lg:px-20" dir={isArabic ? 'rtl' : 'ltr'}>
            <form onSubmit={enterDemo} className="w-full max-w-[430px]" aria-label={copy.login}>
              <div className="mb-9">
                <p className="mb-3 text-xs font-medium tracking-[.08em] text-[var(--olive)]">{isArabic ? 'مساحتك المالية' : 'YOUR FINANCIAL SPACE'}</p>
                <h2 className="font-display text-3xl font-semibold tracking-[-.07em] text-[var(--ink)] sm:text-4xl" data-testid="heading-login">{copy.login}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]" data-testid="text-login-hint">{copy.loginHint}</p>
              </div>
              <div className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[var(--ink)]">{copy.email}</span>
                  <span className="relative block">
                    <Mail className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] ${isArabic ? 'right-4' : 'left-4'}`} size={17} aria-hidden="true" />
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder={copy.emailPlaceholder}
                      className={`w-full rounded-xl border border-[var(--line)] bg-[#fdfcf8] py-3.5 text-sm text-[var(--ink)] shadow-sm outline-none transition focus:border-[var(--olive)] focus:ring-4 focus:ring-[#d9edbd] ${isArabic ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                      data-testid="input-email"
                    />
                  </span>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[var(--ink)]">{copy.password}</span>
                  <span className="relative block">
                    <LockKeyhole className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] ${isArabic ? 'right-4' : 'left-4'}`} size={17} aria-hidden="true" />
                    <input
                      required
                      minLength={4}
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder={copy.passwordPlaceholder}
                      className={`w-full rounded-xl border border-[var(--line)] bg-[#fdfcf8] py-3.5 text-sm text-[var(--ink)] shadow-sm outline-none transition focus:border-[var(--olive)] focus:ring-4 focus:ring-[#d9edbd] ${isArabic ? 'pr-11 pl-11' : 'pl-11 pr-11'}`}
                      data-testid="input-password"
                    />
                    <button type="button" onClick={() => setShowPassword((value) => !value)} className={`absolute top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] transition hover:text-[var(--olive-deep)] ${isArabic ? 'left-4' : 'right-4'}`} data-testid="button-toggle-password" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </span>
                </label>
              </div>
              <div className={`mt-3 flex ${isArabic ? 'justify-start' : 'justify-end'}`}>
                <button type="button" onClick={() => window.alert(isArabic ? 'هذه تجربة فقط — لا تحتاج إلى استعادة كلمة مرور.' : 'This is a demo — password recovery is not needed.')} className="text-xs text-[var(--olive)] underline decoration-[var(--gold)] underline-offset-4 hover:text-[var(--olive-deep)]" data-testid="button-forgot-password">{copy.forgot}</button>
              </div>
              <button type="submit" className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--olive)] py-4 text-sm font-semibold text-[var(--paper)] shadow-[0_9px_20px_rgba(91,105,51,.2)] transition hover:-translate-y-0.5 hover:bg-[var(--olive-deep)] active:translate-y-0" data-testid="button-start-investing">
                {copy.start}
                {isArabic ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}
              </button>
              <div className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
                <span>{copy.noAccount} </span>
                <button type="button" onClick={() => setLocation('/dashboard')} className="font-semibold text-[var(--olive-deep)] underline decoration-[var(--gold)] underline-offset-4" data-testid="button-signup-demo">{copy.signup}</button>
              </div>
              <div className="mt-12 flex items-start gap-3 rounded-xl bg-[var(--leaf-pale)] p-4 text-[var(--muted-foreground)]">
                <ShieldCheck className="mt-0.5 shrink-0 text-[var(--olive)]" size={18} aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-[var(--olive-deep)]" data-testid="text-reassurance-title">{copy.reassurance}</p>
                  <p className="mt-1 text-xs leading-5" data-testid="text-reassurance">{copy.reassuranceText}</p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Link href="/privacy" className="text-xs text-[var(--muted-foreground)] underline decoration-[var(--gold)] underline-offset-4 transition hover:text-[var(--olive-deep)]" data-testid="link-privacy">{copy.privacy}</Link>
              </div>
            </form>
          </div>
        </section>
        <footer className="mx-auto flex max-w-[1280px] justify-between px-1 pt-5 text-[10px] text-[var(--muted-foreground)]">
          <span>© 2025 Thamar</span>
          <span>{isArabic ? 'صُمّم بهدوء، ليُستخدم بثقة.' : 'Designed quietly, used confidently.'}</span>
        </footer>
      </div>
    </main>
  );
}