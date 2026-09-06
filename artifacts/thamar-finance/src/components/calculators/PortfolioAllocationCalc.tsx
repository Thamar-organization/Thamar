import { useState } from 'react';
import type { Language } from '@/data/mock-finance';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function PortfolioAllocationCalc({ language }: { language: Language }) {
  const isArabic = language === 'ar';

  const [riskTolerance, setRiskTolerance] = useState<number>(2); // 1 = Low, 2 = Medium, 3 = High
  
  // Allocations: [Cash, Sukuk, Stocks, Gold]
  const portfolios = {
    1: [20, 50, 20, 10],
    2: [10, 30, 45, 15],
    3: [5, 15, 65, 15],
  };

  const currentAllocation = portfolios[riskTolerance as 1 | 2 | 3];
  
  const labels = isArabic 
    ? ['كاش', 'صكوك', 'أسهم', 'ذهب']
    : ['Cash', 'Sukuk', 'Stocks', 'Gold'];

  const colors = ['#eaf1df', '#a3b18a', '#d4a83d', '#f4e4af'];

  const data = currentAllocation.map((val, i) => ({
    name: labels[i],
    value: val,
    color: colors[i],
  }));

  const t = {
    riskLevel: isArabic ? 'مستوى المخاطرة' : 'Risk Level',
    low: isArabic ? 'منخفض' : 'Low',
    med: isArabic ? 'متوسط' : 'Medium',
    high: isArabic ? 'عالي' : 'High',
    descLow: isArabic ? 'محفظة دفاعية تركز على الحفاظ على رأس المال وعوائد ثابتة.' : 'Defensive portfolio focused on capital preservation and steady returns.',
    descMed: '',
    descHigh: isArabic ? 'محفظة هجومية تركز على النمو على المدى الطويل مع تقبل تقلبات السوق.' : 'Aggressive portfolio focused on long-term growth, accepting market volatility.',
  };

  const getDesc = () => {
    if (riskTolerance === 1) return t.descLow;
    if (riskTolerance === 2) return t.descMed;
    return t.descHigh;
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2 items-center">
      <div className="space-y-8">
        <div>
          <p id="portfolio-risk-label" className="mb-4 block text-sm font-semibold text-[var(--ink)]">{t.riskLevel}</p>
          <div className="flex w-full overflow-hidden rounded-xl bg-[var(--leaf-pale)]/50 p-1" role="group" aria-labelledby="portfolio-risk-label">
            <button
              type="button"
              onClick={() => setRiskTolerance(1)}
              aria-pressed={riskTolerance === 1}
              className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all ${riskTolerance === 1 ? 'bg-white text-[var(--olive-deep)] shadow-sm' : 'text-[var(--muted-foreground)] hover:text-[var(--ink)]'}`}
            >
              {t.low}
            </button>
            <button
              type="button"
              onClick={() => setRiskTolerance(2)}
              aria-pressed={riskTolerance === 2}
              className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all ${riskTolerance === 2 ? 'bg-white text-[var(--olive-deep)] shadow-sm' : 'text-[var(--muted-foreground)] hover:text-[var(--ink)]'}`}
            >
              {t.med}
            </button>
            <button
              type="button"
              onClick={() => setRiskTolerance(3)}
              aria-pressed={riskTolerance === 3}
              className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all ${riskTolerance === 3 ? 'bg-white text-[var(--olive-deep)] shadow-sm' : 'text-[var(--muted-foreground)] hover:text-[var(--ink)]'}`}
            >
              {t.high}
            </button>
          </div>
        </div>

        {getDesc() && (
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 shadow-sm">
            <p className="text-sm leading-relaxed text-[var(--ink)]">{getDesc()}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {data.map((item, i) => (
            <div key={item.name} className="flex items-center gap-3 rounded-xl bg-[var(--leaf-pale)]/30 p-3">
              <span className="h-4 w-4 rounded-full" style={{ backgroundColor: item.color }} />
              <div>
                <p className="text-xs font-semibold text-[var(--muted-foreground)]">{item.name}</p>
                <p className="font-mono mt-0.5 text-lg font-bold text-[var(--ink)]" dir="ltr">{item.value}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center h-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value}%`, '']}
              contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
