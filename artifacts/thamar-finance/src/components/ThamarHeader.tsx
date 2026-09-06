import { Link } from 'wouter';

import type { Language } from '@/data/mock-finance';

type HeaderPage = 'home' | 'portfolio' | 'today' | 'calculators' | 'insights';

const navigation = {
  ar: [
    { id: 'home' as HeaderPage, href: '/dashboard', label: 'الرئيسية' },
    { id: 'portfolio' as HeaderPage, href: '/portfolio', label: 'محفظتك المستقبلية' },
    { id: 'today' as HeaderPage, href: '/invest-today', label: 'استثمارك اليوم' },
    { id: 'calculators' as HeaderPage, href: '/calculators', label: 'الحاسبات المالية' },
    { id: 'insights' as HeaderPage, href: '/insights', label: 'نصائح مالية' },
  ],
  en: [
    { id: 'home' as HeaderPage, href: '/dashboard', label: 'Home' },
    { id: 'portfolio' as HeaderPage, href: '/portfolio', label: 'Your future portfolio' },
    { id: 'today' as HeaderPage, href: '/invest-today', label: 'Invest today' },
    { id: 'calculators' as HeaderPage, href: '/calculators', label: 'Calculators' },
    { id: 'insights' as HeaderPage, href: '/insights', label: 'Financial tips' },
  ],
};

export default function ThamarHeader({
  language,
  active,
  onLanguageToggle,
}: {
  language: Language;
  active: HeaderPage;
  onLanguageToggle: () => void;
}) {
  const isArabic = language === 'ar';

  return (
    <header className="relative z-10 flex flex-col gap-4 border-b border-[var(--line)] pb-4 sm:flex-row sm:items-center sm:justify-between sm:pb-5">
      <Link href="/dashboard" className="flex w-fit items-center gap-2" data-testid="link-shared-logo">
        <img
          src={`${import.meta.env.BASE_URL}thamar-brand-transparent.png`}
          alt={isArabic ? 'شعار ثَمَر' : 'Thamar logo'}
          className="h-14 w-14 shrink-0 object-contain mix-blend-multiply sm:h-16 sm:w-16"
          data-testid="img-shared-logo"
        />
      </Link>

      <nav className="order-3 flex w-full gap-1 overflow-x-auto sm:order-2 sm:w-auto" aria-label={isArabic ? 'التنقل الرئيسي' : 'Main navigation'}>
        {navigation[language].map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`whitespace-nowrap rounded-lg px-3 py-2 text-[11px] font-medium transition sm:px-4 ${active === item.id ? 'bg-[var(--olive)] text-[var(--paper)] shadow-sm' : 'bg-[var(--leaf-pale)] text-[var(--olive-deep)] hover:bg-[var(--leaf)]'}`}
            data-testid={`link-nav-${item.id}`}
            aria-current={active === item.id ? 'page' : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        onClick={onLanguageToggle}
        className="absolute end-0 top-0 rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-xs font-medium text-[var(--olive-deep)] transition hover:border-[var(--olive)] sm:static sm:order-3"
        data-testid="button-page-language"
        aria-label={isArabic ? 'التبديل إلى الإنجليزية' : 'Switch to Arabic'}
      >
        {isArabic ? 'English' : 'العربية'}
      </button>
    </header>
  );
}