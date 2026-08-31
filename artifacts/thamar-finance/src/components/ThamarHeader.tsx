import { Sprout } from 'lucide-react';
import { Link } from 'wouter';

import type { Language } from '@/data/mock-finance';

type HeaderPage = 'home' | 'portfolio' | 'today';

const navigation = {
  ar: [
    { id: 'home' as HeaderPage, href: '/dashboard', label: 'الرئيسية' },
    { id: 'portfolio' as HeaderPage, href: '/portfolio', label: 'محفظتك المستقبلية' },
    { id: 'today' as HeaderPage, href: '/invest-today', label: 'استثمارك اليوم' },
  ],
  en: [
    { id: 'home' as HeaderPage, href: '/dashboard', label: 'Home' },
    { id: 'portfolio' as HeaderPage, href: '/portfolio', label: 'Your future portfolio' },
    { id: 'today' as HeaderPage, href: '/invest-today', label: 'Invest today' },
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
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--gold-soft)] text-[var(--olive-deep)]">
          <Sprout size={18} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <span>
          <span className="block font-display text-base font-semibold leading-none tracking-[-.08em] text-[var(--ink)]">ثَمَر</span>
          <span className="font-mono text-[8px] tracking-[.16em] text-[var(--olive)]">THAMAR</span>
        </span>
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