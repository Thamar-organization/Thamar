import { useState } from 'react';
import type { Language } from '@/data/mock-finance';

export default function SavingsRateCalc({ language }: { language: Language }) {
  const isArabic = language === 'ar';
  
  const [income, setIncome] = useState<number>(10000);
  const [expenses, setExpenses] = useState<number>(6000);

  const safeIncome = Math.max(0, isFinite(income) ? income : 0);
  const safeExpenses = Math.max(0, isFinite(expenses) ? expenses : 0);

  const savings = Math.max(0, safeIncome - safeExpenses);
  const savingsRate = safeIncome > 0 ? (savings / safeIncome) * 100 : 0;

  const t = {
    income: isArabic ? 'الدخل الشهري' : 'Monthly Income',
    expenses: isArabic ? 'المصروفات الشهرية' : 'Monthly Expenses',
    savings: isArabic ? 'المدخرات' : 'Savings',
    rate: isArabic ? 'معدل الادخار' : 'Savings Rate',
    currency: isArabic ? 'ر.س' : 'SAR',
    adviceGood: isArabic ? 'ممتاز! أنت تدخر أكثر من 20% من دخلك.' : 'Excellent! You are saving more than 20% of your income.',
    adviceOk: isArabic ? 'جيد، حاول الوصول لنسبة 20% لضمان استقرار مالي أفضل.' : 'Good, try to reach 20% for better financial stability.',
    adviceLow: isArabic ? 'تحتاج لمراجعة مصروفاتك لزيادة مدخراتك.' : 'You need to review your expenses to increase your savings.',
  };

  const advice = savingsRate >= 20 ? t.adviceGood : savingsRate >= 10 ? t.adviceOk : t.adviceLow;
  const expenseRate = safeIncome > 0 ? Math.min(100, (safeExpenses / safeIncome) * 100) : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <div>
          <label htmlFor="income-input" className="mb-2 block text-sm font-semibold text-[var(--ink)]">{t.income}</label>
          <div className="relative">
            <input
              id="income-input"
              type="number"
              min="0"
              value={income || ''}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-lg font-bold text-[var(--ink)] outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] transition-all"
            />
            <span className={`absolute top-1/2 -translate-y-1/2 text-sm text-[var(--muted-foreground)] ${isArabic ? 'left-4' : 'right-4'}`}>{t.currency}</span>
          </div>
          <input
            type="range"
            aria-label={t.income}
            min="0"
            max="100000"
            step="500"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="mt-4 w-full accent-[var(--gold)]"
          />
        </div>

        <div>
          <label htmlFor="expenses-input" className="mb-2 block text-sm font-semibold text-[var(--ink)]">{t.expenses}</label>
          <div className="relative">
            <input
              id="expenses-input"
              type="number"
              min="0"
              value={expenses || ''}
              onChange={(e) => setExpenses(Number(e.target.value))}
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-lg font-bold text-[var(--ink)] outline-none focus:border-[var(--leaf)] focus:ring-1 focus:ring-[var(--leaf)] transition-all"
            />
            <span className={`absolute top-1/2 -translate-y-1/2 text-sm text-[var(--muted-foreground)] ${isArabic ? 'left-4' : 'right-4'}`}>{t.currency}</span>
          </div>
          <input
            type="range"
            aria-label={t.expenses}
            min="0"
            max="100000"
            step="500"
            value={expenses}
            onChange={(e) => setExpenses(Number(e.target.value))}
            className="mt-4 w-full accent-[var(--leaf)]"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center rounded-2xl bg-[var(--leaf-pale)]/50 p-6 sm:p-8">
        <div className="text-center">
          <p className="text-sm font-medium text-[var(--muted-foreground)]">{t.rate}</p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="font-mono text-5xl font-bold tracking-tight text-[var(--olive-deep)]" dir="ltr">
              {savingsRate.toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between text-xs font-semibold mb-2">
            <span className="text-red-500/80">{t.expenses}: {safeExpenses.toLocaleString()} {t.currency}</span>
            <span className="text-[var(--olive)]">{t.savings}: {savings.toLocaleString()} {t.currency}</span>
          </div>
          <div className="h-4 w-full flex overflow-hidden rounded-full bg-white/50 shadow-inner">
            <div className="bg-red-400/80 transition-all duration-500 ease-out" style={{ width: `${expenseRate}%` }} />
            <div className="bg-[var(--leaf)] transition-all duration-500 ease-out" style={{ width: `${savingsRate}%` }} />
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-white/60 p-4 shadow-sm backdrop-blur-sm">
          <p className="text-sm leading-relaxed text-[var(--ink)]">{advice}</p>
        </div>
      </div>
    </div>
  );
}
