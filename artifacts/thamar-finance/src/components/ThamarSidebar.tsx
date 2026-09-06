import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { LayoutDashboard, Wallet, TrendingUp, LogIn, LogOut, Languages, Menu, X, ArrowLeftRight, Calculator, Newspaper } from 'lucide-react';
import type { Language } from '@/data/mock-finance';

type HeaderPage = 'home' | 'portfolio' | 'today' | 'calculators' | 'insights';

const navigation = {
  ar: [
    { id: 'home' as HeaderPage, href: '/dashboard', label: 'الرئيسية', icon: LayoutDashboard },
    { id: 'portfolio' as HeaderPage, href: '/portfolio', label: 'محفظتك المستقبلية', icon: Wallet },
    { id: 'today' as HeaderPage, href: '/invest-today', label: 'استثمارك اليوم', icon: TrendingUp },
    { id: 'calculators' as HeaderPage, href: '/calculators', label: 'الحاسبات المالية', icon: Calculator },
    { id: 'insights' as HeaderPage, href: '/insights', label: 'معلومات اليوم والنصائح', icon: Newspaper },
  ],
  en: [
    { id: 'home' as HeaderPage, href: '/dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'portfolio' as HeaderPage, href: '/portfolio', label: 'Your future portfolio', icon: Wallet },
    { id: 'today' as HeaderPage, href: '/invest-today', label: 'Invest today', icon: TrendingUp },
    { id: 'calculators' as HeaderPage, href: '/calculators', label: 'Calculators', icon: Calculator },
    { id: 'insights' as HeaderPage, href: '/insights', label: 'Insights & Tips', icon: Newspaper },
  ],
};

export default function ThamarSidebar({
  language,
  active,
  onLanguageToggle,
  overlay = false,
}: {
  language: Language;
  active: HeaderPage;
  onLanguageToggle: () => void;
  overlay?: boolean;
}) {
  const isArabic = language === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const content = (
    <div className="flex h-full flex-col bg-[var(--paper)]/95 shadow-[0_0_40px_rgba(47,53,32,0.05)] backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--paper)]/90">
      <div className="flex h-36 shrink-0 items-center justify-center border-b border-[var(--line)] bg-[var(--leaf-pale)]/45 px-6">
        <Link href="/dashboard" className="group flex flex-col items-center gap-2 transition-transform hover:scale-105" data-testid="link-sidebar-logo">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-[var(--leaf)] opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-40" />
            <img
              src={`${import.meta.env.BASE_URL}thamar-brand-transparent.png`}
              alt={isArabic ? 'شعار ثَمَر' : 'Thamar logo'}
              className="relative h-24 w-24 object-contain mix-blend-multiply drop-shadow-[0_8px_18px_rgba(72,82,43,.12)]"
              data-testid="img-sidebar-logo"
            />
          </div>
        </Link>
      </div>

      <div className="mobile-scroll flex-1 overflow-y-auto px-4 py-8">
        <div className="mb-4 px-2 text-xs font-semibold tracking-wider text-[var(--muted-foreground)] opacity-70">
          {isArabic ? 'القائمة الرئيسية' : 'MAIN MENU'}
        </div>
        <nav className="space-y-1.5" aria-label={isArabic ? 'التنقل الرئيسي' : 'Main navigation'}>
          {navigation[language].map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`group flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-[var(--olive)] text-[var(--paper)] shadow-[0_8px_20px_rgba(116,125,74,0.25)]'
                    : 'text-[var(--ink)] hover:bg-[var(--leaf-pale)] hover:text-[var(--olive-deep)]'
                }`}
                data-testid={`link-nav-${item.id}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className={`flex items-center justify-center rounded-xl p-1.5 transition-colors duration-300 ${isActive ? 'bg-white/20' : 'bg-transparent group-hover:bg-white/50'}`}>
                  <Icon size={18} className={isActive ? 'text-[var(--gold-soft)]' : 'text-[var(--olive)]'} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className="mt-0.5">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="shrink-0 space-y-2 border-t border-[var(--line)] p-4">
        <button
          type="button"
          onClick={onLanguageToggle}
          className="group flex w-full items-center gap-3.5 rounded-2xl px-4 py-3.5 text-sm font-medium text-[var(--ink)] transition-all duration-300 hover:bg-[var(--leaf-pale)] hover:text-[var(--olive-deep)]"
          data-testid="button-sidebar-language"
        >
          <div className="flex items-center justify-center rounded-xl bg-transparent p-1.5 transition-colors duration-300 group-hover:bg-white/50">
            <Languages size={18} className="text-[var(--olive)]" strokeWidth={2} />
          </div>
          <span className="mt-0.5 flex-1 text-start">{isArabic ? 'English' : 'العربية'}</span>
          <ArrowLeftRight size={14} className="text-[var(--muted-foreground)] opacity-0 transition-opacity group-hover:opacity-100" />
        </button>

        <Link
          href="/"
          className="group flex w-full items-center gap-3.5 rounded-2xl px-4 py-3.5 text-sm font-medium text-[var(--ink)] transition-all duration-300 hover:bg-[var(--leaf-pale)] hover:text-[var(--olive-deep)]"
          data-testid="link-sidebar-login"
        >
          <div className="flex items-center justify-center rounded-xl bg-transparent p-1.5 transition-colors duration-300 group-hover:bg-white/50">
            <LogIn size={18} className="text-[var(--olive)]" strokeWidth={2} />
          </div>
          <span className="mt-0.5">{isArabic ? 'صفحة تسجيل الدخول' : 'Sign-in page'}</span>
        </Link>
        
        <Link
          href="/"
          className="group flex w-full items-center gap-3.5 rounded-2xl px-4 py-3.5 text-sm font-medium text-red-600 transition-all duration-300 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
          data-testid="button-sidebar-logout"
        >
          <div className="flex items-center justify-center rounded-xl bg-transparent p-1.5 transition-colors duration-300 group-hover:bg-red-100 dark:group-hover:bg-red-900/50">
            <LogOut size={18} strokeWidth={2} />
          </div>
          <span className="mt-0.5">{isArabic ? 'تسجيل الخروج' : 'Log out'}</span>
        </Link>
      </div>
    </div>
  );

  if (overlay) {
    return (
      <>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`fixed top-5 z-30 flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--paper)]/90 px-4 py-2.5 text-sm font-semibold text-[var(--olive-deep)] shadow-[0_10px_30px_rgba(72,82,43,.12)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-[var(--leaf-pale)] ${isArabic ? 'right-5' : 'left-5'}`}
          data-testid="button-dashboard-menu-open"
          aria-label={isArabic ? 'فتح قائمة التنقل' : 'Open navigation menu'}
          aria-expanded={isOpen}
        >
          <Menu size={18} />
          <span>{isArabic ? 'القائمة' : 'Menu'}</span>
        </button>

        {isOpen && (
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default bg-[var(--ink)]/25 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-label={isArabic ? 'إغلاق قائمة التنقل' : 'Close navigation menu'}
            data-testid="button-dashboard-menu-backdrop"
          />
        )}

        <aside
          className={`fixed bottom-0 top-0 z-50 w-[280px] transform border-[var(--line)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            isArabic
              ? `${isOpen ? 'right-0 translate-x-0' : 'right-0 translate-x-full'} border-l`
              : `${isOpen ? 'left-0 translate-x-0' : 'left-0 -translate-x-full'} border-r`
          }`}
          aria-hidden={!isOpen}
        >
          <div className={`absolute top-4 z-50 ${isArabic ? 'left-4' : 'right-4'}`}>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--paper)] text-[var(--olive-deep)] shadow-md transition-transform hover:scale-110"
              data-testid="button-dashboard-menu-close"
              aria-label={isArabic ? 'إغلاق القائمة' : 'Close menu'}
            >
              <X size={20} />
            </button>
          </div>
          {content}
        </aside>
      </>
    );
  }

  return (
    <>
      <div className="sticky top-0 z-30 flex h-16 w-full shrink-0 items-center justify-between border-b border-[var(--line)] bg-[var(--paper)]/80 px-4 backdrop-blur-md lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--leaf-pale)] text-[var(--olive-deep)] transition-colors hover:bg-[var(--leaf)]"
          data-testid="button-mobile-menu-open"
          aria-label={isArabic ? 'فتح القائمة' : 'Open menu'}
        >
          <Menu size={20} />
        </button>
        
        <Link href="/dashboard" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" data-testid="link-mobile-logo">
           <img
            src={`${import.meta.env.BASE_URL}thamar-brand-transparent.png`}
            alt={isArabic ? 'شعار ثَمَر' : 'Thamar logo'}
            className="h-10 w-10 object-contain mix-blend-multiply"
          />
        </Link>
        <div className="w-10" />
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-[var(--ink)]/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed bottom-0 top-0 z-50 w-[280px] transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
          isArabic 
            ? (isOpen ? 'right-0 translate-x-0' : 'right-0 translate-x-full') 
            : (isOpen ? 'left-0 translate-x-0' : 'left-0 -translate-x-full')
        }`}
      >
        <div className={`absolute top-4 z-50 lg:hidden ${isArabic ? 'left-4' : 'right-4'}`}>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--paper)] text-[var(--olive-deep)] shadow-md transition-transform hover:scale-110"
            data-testid="button-mobile-menu-close"
            aria-label={isArabic ? 'إغلاق القائمة' : 'Close menu'}
          >
            <X size={20} />
          </button>
        </div>
        {content}
      </aside>

      <aside className={`fixed inset-y-0 z-30 hidden lg:flex lg:w-[280px] lg:flex-col ${isArabic ? 'border-l border-[var(--line)] lg:right-0' : 'border-r border-[var(--line)] lg:left-0'}`}>
        {content}
      </aside>
    </>
  );
}
