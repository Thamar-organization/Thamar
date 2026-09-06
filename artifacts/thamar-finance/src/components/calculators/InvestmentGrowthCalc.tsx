import { useState } from 'react';
import type { Language } from '@/data/mock-finance';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function InvestmentGrowthCalc({ language }: { language: Language }) {
  const isArabic = language === 'ar';

  const [initial, setInitial] = useState<number>(10000);
  const [monthly, setMonthly] = useState<number>(1500);
  const [rate, setRate] = useState<number>(7);
  const [years, setYears] = useState<number>(15);

  const safeInitial = Math.max(0, isFinite(initial) ? initial : 0);
  const safeMonthly = Math.max(0, isFinite(monthly) ? monthly : 0);
  const safeRate = Math.max(0, isFinite(rate) ? rate : 0);
  const safeYears = Math.max(1, Math.min(100, Math.floor(isFinite(years) ? years : 1)));

  const data = Array.from({ length: safeYears + 1 }, (_, i) => {
    const months = i * 12;
    const monthlyRate = safeRate / 100 / 12;
    const totalPrincipal = safeInitial + safeMonthly * months;
    
    let futureValue = safeInitial * Math.pow(1 + monthlyRate, months);
    if (monthlyRate > 0) {
      futureValue += safeMonthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    } else {
      futureValue += safeMonthly * months;
    }

    return {
      year: i,
      principal: Math.round(totalPrincipal) || 0,
      growth: Math.max(0, Math.round(futureValue - totalPrincipal)) || 0,
      total: Math.round(futureValue) || 0,
    };
  });

  const finalTotal = data[data.length - 1].total;
  const finalGrowth = data[data.length - 1].growth;
  const finalPrincipal = data[data.length - 1].principal;

  const t = {
    initial: isArabic ? 'رأس المال المبدئي' : 'Initial Capital',
    monthly: isArabic ? 'الإضافة الشهرية' : 'Monthly Addition',
    rate: isArabic ? 'نسبة النمو المتوقعة (%)' : 'Expected Growth Rate (%)',
    years: isArabic ? 'المدة (سنوات)' : 'Duration (Years)',
    total: isArabic ? 'إجمالي المحفظة' : 'Total Portfolio',
    principal: isArabic ? 'إجمالي المودع' : 'Total Deposited',
    growth: isArabic ? 'نمو الاستثمار' : 'Investment Growth',
    currency: isArabic ? 'ر.س' : 'SAR',
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="initial-input" className="mb-2 block text-xs font-semibold text-[var(--ink)]">{t.initial}</label>
          <input
            id="initial-input"
            type="number" min="0" value={initial || ''} onChange={(e) => setInitial(Number(e.target.value))}
            className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm font-bold text-[var(--ink)] outline-none focus:border-[var(--olive)] focus:ring-1 focus:ring-[var(--olive)]"
          />
        </div>
        <div>
          <label htmlFor="monthly-input" className="mb-2 block text-xs font-semibold text-[var(--ink)]">{t.monthly}</label>
          <input
            id="monthly-input"
            type="number" min="0" value={monthly || ''} onChange={(e) => setMonthly(Number(e.target.value))}
            className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm font-bold text-[var(--ink)] outline-none focus:border-[var(--olive)] focus:ring-1 focus:ring-[var(--olive)]"
          />
        </div>
        <div>
          <label htmlFor="rate-input" className="mb-2 block text-xs font-semibold text-[var(--ink)]">{t.rate}</label>
          <input
            id="rate-input"
            type="number" min="0" max="100" value={rate || ''} onChange={(e) => setRate(Number(e.target.value))}
            className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm font-bold text-[var(--ink)] outline-none focus:border-[var(--olive)] focus:ring-1 focus:ring-[var(--olive)]"
          />
        </div>
        <div>
          <label htmlFor="years-input" className="mb-2 block text-xs font-semibold text-[var(--ink)]">{t.years}</label>
          <input
            id="years-input"
            type="number" min="1" max="100" value={years || ''} onChange={(e) => setYears(Number(e.target.value))}
            className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm font-bold text-[var(--ink)] outline-none focus:border-[var(--olive)] focus:ring-1 focus:ring-[var(--olive)]"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[var(--line)] bg-white/50 p-5 text-center">
          <p className="text-xs font-medium text-[var(--muted-foreground)]">{t.principal}</p>
          <p className="font-mono mt-1 text-2xl font-bold text-[var(--ink)]" dir="ltr">{finalPrincipal.toLocaleString()}</p>
        </div>
        <div className="rounded-2xl border border-[var(--line)] bg-white/50 p-5 text-center">
          <p className="text-xs font-medium text-[var(--muted-foreground)]">{t.growth}</p>
          <p className="font-mono mt-1 text-2xl font-bold text-[var(--gold)]" dir="ltr">+{finalGrowth.toLocaleString()}</p>
        </div>
        <div className="rounded-2xl bg-[var(--olive)] p-5 text-center text-white shadow-lg">
          <p className="text-xs font-medium opacity-90">{t.total}</p>
          <p className="font-mono mt-1 text-2xl font-bold" dir="ltr">{finalTotal.toLocaleString()}</p>
        </div>
      </div>

      <div className="h-[350px] w-full rounded-2xl bg-[var(--paper)] p-4 shadow-sm border border-[var(--line)]" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--gold)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--gold)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--olive)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--olive)" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value.toLocaleString()} ${isArabic ? 'ر.س' : 'SAR'}`,
                name === 'total' ? (isArabic ? 'الإجمالي' : 'Total') : name === 'growth' ? (isArabic ? 'النمو' : 'Growth') : (isArabic ? 'المودع' : 'Deposited')
              ]}
              labelFormatter={(label) => `${isArabic ? 'السنة' : 'Year'} ${label}`}
              contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
            />
            <Area type="monotone" dataKey="principal" stackId="1" stroke="none" fill="url(#colorTotal)" />
            <Area type="monotone" dataKey="growth" stackId="1" stroke="none" fill="url(#colorGrowth)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
