import { Link } from 'wouter';

import type { Language } from '@/data/mock-finance';

export type ThamarPage = 'home' | 'portfolio' | 'today' | 'calculators' | 'insights';

const navigation = {
  ar: [
    { id: 'home' as ThamarPage, href: '/dashboard', label: 'الرئيسية' },
    { id: 'portfolio' as ThamarPage, href: '/portfolio', label: 'محفظتك المستقبلية' },
    { id: 'today' as ThamarPage, href: '/invest-today', label: 'استثمارك اليوم' },
    { id: 'calculators' as ThamarPage, href: '/calculators', label: 'الحاسبات المالية' },
    { id: 'insights' as ThamarPage, href: '/insights', label: 'نصائح مالية' },
  ],
  en: [
    { id: 'home' as ThamarPage, href: '/dashboard', label: 'Home' },
    { id: 'portfolio' as ThamarPage, href: '/portfolio', label: 'Future portfolio' },
    { id: 'today' as ThamarPage, href: '/invest-today', label: 'Invest today' },
    { id: 'calculators' as ThamarPage, href: '/calculators', label: 'Calculators' },
    { id: 'insights' as ThamarPage, href: '/insights', label: 'Financial tips' },
  ],
};

export default function ThamarTopNav({
  language,
  active,
}: {
  language: Language;
  active: ThamarPage;
}) {
  const isArabic = language === 'ar';

  return (
    <nav
      className="mb-10 hidden items-center justify-center gap-1 rounded-2xl border border-[var(--line)] bg-[var(--paper)]/80 p-1.5 shadow-[0_10px_30px_rgba(72,82,43,.06)] backdrop-blur-md lg:flex"
      aria-label={isArabic ? 'التنقل العلوي' : 'Top navigation'}
      data-testid="nav-top"
    >
      {navigation[language].map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
            active === item.id
              ? 'bg-[var(--olive)] text-[var(--paper)] shadow-sm'
              : 'text-[var(--olive-deep)] hover:bg-[var(--leaf-pale)]'
          }`}
          aria-current={active === item.id ? 'page' : undefined}
          data-testid={`link-top-${item.id}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}