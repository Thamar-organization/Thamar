import { useState } from 'react';
import type { Language } from '@/data/mock-finance';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function ExpectedReturnCalc({ language }: { language: Language }) {
  const isArabic = language === 'ar';

  const [principal, setPrincipal] = useState<number>(50000);
  const [rate, setRate] = useState<number>(8);
  const [years, setYears] = useState<number>(10);

  const safePrincipal = Math.max(0, isFinite(principal) ? principal : 0);
  const safeRate = Math.max(0, isFinite(rate) ? rate : 0);
  const safeYears = Math.max(1, Math.min(100, Math.floor(isFinite(years) ? years : 1)));

  const finalAmount = safePrincipal * Math.pow(1 + safeRate / 100, safeYears);
  const totalProfit = Math.max(0, finalAmount - safePrincipal);

  const data = Array.from({ length: safeYears + 1 }, (_, i) => {
    const value = safePrincipal * Math.pow(1 + safeRate / 100, i);
    return {
      year: i,
      value: Math.round(value) || 0,
      profit: Math.round(value - safePrincipal) || 0,
    };
  });

  const t = {
    principal: isArabic ? 'المبلغ المستثمر' : 'Initial Investment',
    rate: isArabic ? 'العائد السنوي المتوقع (%)' : 'Expected Annual Return (%)',
    years: isArabic ? 'مدة الاستثمار (سنوات)' : 'Investment Duration (Years)',
    finalAmount: isArabic ? 'القيمة المستقبلية' : 'Future Value',
    totalProfit: isArabic ? 'صافي الربح' : 'Total Profit',
    currency: isArabic ? 'ر.س' : 'SAR',
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div className="space-y-6">
        <div>
          <label htmlFor="principal-input" className="mb-2 block text-sm font-semibold text-[var(--ink)]">{t.principal}</label>
          <div className="relative">
            <input
              id="principal-input"
              type="number"
              min="0"
              value={principal || ''}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-lg font-bold text-[var(--ink)] outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]"
            />
            <span className={`absolute top-1/2 -translate-y-1/2 text-sm text-[var(--muted-foreground)] ${isArabic ? 'left-4' : 'right-4'}`}>{t.currency}</span>
          </div>
          <input type="range" aria-label={t.principal} min="1000" max="1000000" step="1000" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="mt-4 w-full accent-[var(--gold)]" />
        </div>

        <div>
          <label htmlFor="rate-input" className="mb-2 block text-sm font-semibold text-[var(--ink)]">{t.rate}</label>
          <div className="relative">
            <input
              id="rate-input"
              type="number"
              min="0"
              max="100"
              value={rate || ''}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-lg font-bold text-[var(--ink)] outline-none focus:border-[var(--olive)] focus:ring-1 focus:ring-[var(--olive)]"
            />
            <span className={`absolute top-1/2 -translate-y-1/2 text-sm text-[var(--muted-foreground)] ${isArabic ? 'left-4' : 'right-4'}`}>%</span>
          </div>
          <input type="range" aria-label={t.rate} min="1" max="25" step="0.5" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="mt-4 w-full accent-[var(--olive)]" />
        </div>

        <div>
          <label htmlFor="years-input" className="mb-2 block text-sm font-semibold text-[var(--ink)]">{t.years}</label>
          <div className="relative">
            <input
              id="years-input"
              type="number"
              min="1"
              max="50"
              value={years || ''}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-lg font-bold text-[var(--ink)] outline-none focus:border-[var(--leaf)] focus:ring-1 focus:ring-[var(--leaf)]"
            />
          </div>
          <input type="range" aria-label={t.years} min="1" max="50" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className="mt-4 w-full accent-[var(--leaf)]" />
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-2xl bg-[var(--leaf-pale)]/50 p-6 sm:p-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-white/70 p-4 shadow-sm backdrop-blur-sm text-center">
            <p className="text-xs font-semibold text-[var(--muted-foreground)]">{t.finalAmount}</p>
            <p className="font-mono mt-1 text-xl font-bold text-[var(--ink)]" dir="ltr">{Math.round(finalAmount).toLocaleString()}</p>
            <p className="text-[10px] text-[var(--muted-foreground)]">{t.currency}</p>
          </div>
          <div className="rounded-xl bg-[var(--olive)] p-4 shadow-sm text-center text-white">
            <p className="text-xs font-semibold opacity-90">{t.totalProfit}</p>
            <p className="font-mono mt-1 text-xl font-bold" dir="ltr">+{Math.round(totalProfit).toLocaleString()}</p>
            <p className="text-[10px] opacity-80">{t.currency}</p>
          </div>
        </div>

        <div className="mt-8 h-[200px] w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--gold)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--gold)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--leaf)" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="var(--leaf)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
              <Tooltip
                formatter={(value: number) => [`${value.toLocaleString()} ${isArabic ? 'ر.س' : 'SAR'}`, '']}
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="value" stroke="var(--gold)" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
