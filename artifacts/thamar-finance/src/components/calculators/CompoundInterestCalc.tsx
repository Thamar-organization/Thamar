import { useState } from 'react';
import type { Language } from '@/data/mock-finance';

export default function CompoundInterestCalc({ language }: { language: Language }) {
  const isArabic = language === 'ar';

  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(5);
  const [years, setYears] = useState<number>(10);
  const [freq, setFreq] = useState<number>(12); // Compounding frequency per year

  const freqOptions = [
    { value: 1, ar: 'سنوياً', en: 'Annually' },
    { value: 2, ar: 'نصف سنوي', en: 'Semi-annually' },
    { value: 4, ar: 'ربع سنوي', en: 'Quarterly' },
    { value: 12, ar: 'شهرياً', en: 'Monthly' },
    { value: 365, ar: 'يومياً', en: 'Daily' },
  ];

  const safePrincipal = Math.max(0, isFinite(principal) ? principal : 0);
  const safeRate = Math.max(0, isFinite(rate) ? rate : 0);
  const safeYears = Math.max(1, Math.min(100, Math.floor(isFinite(years) ? years : 1)));
  const safeFreq = Math.max(1, isFinite(freq) ? freq : 12);

  // A = P (1 + r/n)^(nt)
  const amount = safePrincipal * Math.pow(1 + (safeRate / 100) / safeFreq, safeFreq * safeYears);
  const interest = Math.max(0, amount - safePrincipal);

  const t = {
    principal: isArabic ? 'رأس المال' : 'Principal Amount',
    rate: isArabic ? 'نسبة الربح السنوي (%)' : 'Annual Interest Rate (%)',
    years: isArabic ? 'المدة (سنوات)' : 'Time (Years)',
    freq: isArabic ? 'فترة التراكم' : 'Compounding Frequency',
    total: isArabic ? 'المبلغ الإجمالي' : 'Total Amount',
    interest: isArabic ? 'إجمالي الأرباح' : 'Total Interest',
    currency: isArabic ? 'ر.س' : 'SAR',
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-6">
        <div>
          <label htmlFor="principal-input" className="mb-2 block text-sm font-semibold text-[var(--ink)]">{t.principal}</label>
          <div className="relative">
            <input
              id="principal-input"
              type="number" min="0" value={principal || ''} onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-lg font-bold text-[var(--ink)] outline-none focus:border-[var(--leaf)] focus:ring-1 focus:ring-[var(--leaf)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="rate-input" className="mb-2 block text-sm font-semibold text-[var(--ink)]">{t.rate}</label>
            <input
              id="rate-input"
              type="number" min="0" max="100" value={rate || ''} onChange={(e) => setRate(Number(e.target.value))}
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-lg font-bold text-[var(--ink)] outline-none focus:border-[var(--leaf)] focus:ring-1 focus:ring-[var(--leaf)]"
            />
          </div>
          <div>
            <label htmlFor="years-input" className="mb-2 block text-sm font-semibold text-[var(--ink)]">{t.years}</label>
            <input
              id="years-input"
              type="number" min="1" max="100" value={years || ''} onChange={(e) => setYears(Number(e.target.value))}
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-lg font-bold text-[var(--ink)] outline-none focus:border-[var(--leaf)] focus:ring-1 focus:ring-[var(--leaf)]"
            />
          </div>
        </div>

        <div>
          <p id="compound-frequency-label" className="mb-2 block text-sm font-semibold text-[var(--ink)]">{t.freq}</p>
          <div className="flex flex-wrap gap-2" role="group" aria-labelledby="compound-frequency-label">
            {freqOptions.map(opt => (
              <button
                type="button"
                key={opt.value}
                aria-pressed={freq === opt.value}
                onClick={() => setFreq(opt.value)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${freq === opt.value ? 'bg-[var(--olive)] text-white shadow-sm' : 'bg-[var(--leaf-pale)] text-[var(--olive-deep)] hover:bg-[var(--leaf)]'}`}
              >
                {isArabic ? opt.ar : opt.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center rounded-2xl bg-[var(--leaf-pale)]/50 p-6 sm:p-8">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-[var(--muted-foreground)]">{t.total}</p>
          <div className="mt-2 font-mono text-4xl font-bold tracking-tight text-[var(--olive-deep)]" dir="ltr">
            {Math.round(amount).toLocaleString()} <span className="text-base text-[var(--muted-foreground)] font-sans">{t.currency}</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-[var(--line)] pb-4">
            <span className="text-sm font-medium text-[var(--muted-foreground)]">{t.principal}</span>
            <span className="font-mono text-lg font-bold text-[var(--ink)]" dir="ltr">{Math.round(safePrincipal).toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-[var(--muted-foreground)]">{t.interest}</span>
            <span className="font-mono text-lg font-bold text-[var(--gold)]" dir="ltr">+{Math.round(interest).toLocaleString()}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
