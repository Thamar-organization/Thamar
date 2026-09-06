import { useState } from 'react';
import type { Language } from '@/data/mock-finance';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function RiskReturnCalc({ language }: { language: Language }) {
  const isArabic = language === 'ar';

  const [amount, setAmount] = useState<number>(100000);
  const [years, setYears] = useState<number>(10);

  const scenarios = [
    {
      id: 'low',
      ar: 'منخفض المخاطرة',
      en: 'Low Risk',
      rate: 4,
      color: '#a3b18a', // softer green
    },
    {
      id: 'med',
      ar: 'متوسط المخاطرة',
      en: 'Medium Risk',
      rate: 8,
      color: '#747d4a', // olive
    },
    {
      id: 'high',
      ar: 'عالي المخاطرة',
      en: 'High Risk',
      rate: 12,
      color: '#d4a83d', // gold
    },
  ];

  const safeAmount = Math.max(0, isFinite(amount) ? amount : 0);
  const safeYears = Math.max(1, Math.min(100, Math.floor(isFinite(years) ? years : 1)));

  const data = scenarios.map(s => {
    const finalAmount = safeAmount * Math.pow(1 + s.rate / 100, safeYears);
    return {
      name: isArabic ? s.ar : s.en,
      rate: s.rate,
      value: Math.round(finalAmount) || 0,
      color: s.color,
      profit: Math.max(0, Math.round(finalAmount - safeAmount)) || 0,
    };
  });

  const t = {
    amount: isArabic ? 'المبلغ المستثمر' : 'Investment Amount',
    years: isArabic ? 'المدة (سنوات)' : 'Duration (Years)',
    compare: isArabic ? 'مقارنة السيناريوهات' : 'Scenario Comparison',
    profit: isArabic ? 'الربح المتوقع' : 'Expected Profit',
    currency: isArabic ? 'ر.س' : 'SAR',
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto w-full">
        <div>
          <label htmlFor="amount-input" className="mb-2 block text-sm font-semibold text-[var(--ink)]">{t.amount}</label>
          <div className="relative">
            <input
              id="amount-input"
              type="number" min="0" value={amount || ''} onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-lg font-bold text-[var(--ink)] outline-none focus:border-[var(--olive)] focus:ring-1 focus:ring-[var(--olive)]"
            />
          </div>
        </div>
        <div>
          <label htmlFor="years-input" className="mb-2 block text-sm font-semibold text-[var(--ink)]">{t.years}</label>
          <div className="relative">
            <input
              id="years-input"
              type="number" min="1" max="100" value={years || ''} onChange={(e) => setYears(Number(e.target.value))}
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-lg font-bold text-[var(--ink)] outline-none focus:border-[var(--olive)] focus:ring-1 focus:ring-[var(--olive)]"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-[var(--leaf-pale)]/30 p-6">
        <h3 className="text-center font-display text-lg font-bold text-[var(--ink)] mb-6">{t.compare}</h3>
        
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          {data.map(d => (
            <div key={d.name} className="rounded-xl bg-white p-5 shadow-sm text-center">
              <p className="text-sm font-semibold text-[var(--ink)]">{d.name}</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">{d.rate}% {isArabic ? 'سنوياً' : 'annually'}</p>
              <div className="mt-4 border-t border-[var(--line)] pt-4">
                <p className="text-[10px] uppercase text-[var(--muted-foreground)] tracking-wider mb-1">{t.profit}</p>
                <p className="font-mono text-xl font-bold" style={{ color: d.color }} dir="ltr">+{d.profit.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="h-[300px] w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--line)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--ink)', fontWeight: 600 }} />
              <Tooltip
                cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                formatter={(value: number) => [`${value.toLocaleString()} ${t.currency}`, isArabic ? 'القيمة النهائية' : 'Final Value']}
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={80}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
      </div>
    </div>
  );
}
