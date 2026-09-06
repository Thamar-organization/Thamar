import { useState } from 'react';
import type { Language } from '@/data/mock-finance';

export default function TimeToGoalCalc({ language }: { language: Language }) {
  const isArabic = language === 'ar';

  const [target, setTarget] = useState<number>(1000000);
  const [current, setCurrent] = useState<number>(50000);
  const [monthly, setMonthly] = useState<number>(3000);
  const [rate, setRate] = useState<number>(6);

  const safeTarget = Math.max(0, isFinite(target) ? target : 0);
  const safeCurrent = Math.max(0, isFinite(current) ? current : 0);
  const safeMonthly = Math.max(0, isFinite(monthly) ? monthly : 0);
  const safeRate = Math.max(0, isFinite(rate) ? rate : 0);

  let totalMonths = 0;
  let balance = safeCurrent;
  const monthlyRate = safeRate / 100 / 12;

  if (safeCurrent >= safeTarget) {
    totalMonths = 0;
  } else if (safeMonthly > 0 || (safeCurrent > 0 && safeRate > 0)) {
    while (balance < safeTarget && totalMonths < 1200) {
      const nextBalance = balance * (1 + monthlyRate) + safeMonthly;
      if (nextBalance >= safeTarget) {
        const deficit = safeTarget - balance;
        const gain = nextBalance - balance;
        totalMonths += gain > 0 ? deficit / gain : 0;
        balance = safeTarget;
        break;
      }
      if (nextBalance <= balance && safeMonthly === 0) {
        totalMonths = -1;
        break;
      }
      balance = nextBalance;
      totalMonths++;
    }
  } else {
    totalMonths = -1;
  }

  const isImpossible = totalMonths === -1;
  const isCapped = totalMonths >= 1200;
  
  let finalYears = !isImpossible && !isCapped ? Math.floor(totalMonths / 12) : 0;
  let finalMonths = !isImpossible && !isCapped ? Math.floor(totalMonths % 12) : 0;
  let finalDays = !isImpossible && !isCapped ? Math.round((totalMonths - Math.floor(totalMonths)) * 30) : 0;
  
  if (finalDays >= 30) {
    finalMonths += 1;
    finalDays = 0;
  }
  if (finalMonths >= 12) {
    finalYears += 1;
    finalMonths = 0;
  }

  const t = {
    target: isArabic ? 'الهدف المالي' : 'Target Goal',
    current: isArabic ? 'المبلغ الحالي' : 'Current Amount',
    monthly: isArabic ? 'الاستقطاع الشهري' : 'Monthly Contribution',
    rate: isArabic ? 'العائد السنوي (%)' : 'Annual Return (%)',
    timeNeeded: isArabic ? 'الوقت المطلوب للوصول' : 'Time Needed to Reach Goal',
    years: isArabic ? 'سنة' : 'Years',
    months: isArabic ? 'شهر' : 'Months',
    days: isArabic ? 'يوم' : 'Days',
    impossible: isArabic ? 'من المستحيل الوصول للهدف بهذه المعطيات.' : 'Impossible to reach the goal with these inputs.',
    goalReached: isArabic ? 'لقد وصلت لهدفك بالفعل!' : 'You have already reached your goal!',
    currency: isArabic ? 'ر.س' : 'SAR',
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <div>
          <label htmlFor="target-input" className="mb-2 block text-sm font-semibold text-[var(--ink)]">{t.target}</label>
          <div className="relative">
            <input
              id="target-input"
              type="number"
              min="0"
              value={target || ''}
              onChange={(e) => setTarget(Number(e.target.value))}
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-lg font-bold text-[var(--ink)] outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]"
            />
            <span className={`absolute top-1/2 -translate-y-1/2 text-sm text-[var(--muted-foreground)] ${isArabic ? 'left-4' : 'right-4'}`}>{t.currency}</span>
          </div>
        </div>

        <div>
          <label htmlFor="current-input" className="mb-2 block text-sm font-semibold text-[var(--ink)]">{t.current}</label>
          <div className="relative">
            <input
              id="current-input"
              type="number"
              min="0"
              value={current || ''}
              onChange={(e) => setCurrent(Number(e.target.value))}
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-lg font-bold text-[var(--ink)] outline-none focus:border-[var(--olive)] focus:ring-1 focus:ring-[var(--olive)]"
            />
            <span className={`absolute top-1/2 -translate-y-1/2 text-sm text-[var(--muted-foreground)] ${isArabic ? 'left-4' : 'right-4'}`}>{t.currency}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="monthly-input" className="mb-2 block text-sm font-semibold text-[var(--ink)]">{t.monthly}</label>
            <div className="relative">
              <input
                id="monthly-input"
                type="number"
                min="0"
                value={monthly || ''}
                onChange={(e) => setMonthly(Number(e.target.value))}
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-lg font-bold text-[var(--ink)] outline-none focus:border-[var(--leaf)] focus:ring-1 focus:ring-[var(--leaf)]"
              />
            </div>
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
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-lg font-bold text-[var(--ink)] outline-none focus:border-[var(--leaf)] focus:ring-1 focus:ring-[var(--leaf)]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center rounded-2xl bg-[var(--leaf-pale)]/50 p-8 text-center">
        <h3 className="text-sm font-medium text-[var(--muted-foreground)]">{t.timeNeeded}</h3>
        
        <div className="mt-6">
          {isImpossible ? (
            <p className="text-lg font-bold text-red-500/80">{t.impossible}</p>
          ) : safeCurrent >= safeTarget ? (
            <p className="text-lg font-bold text-[var(--olive)]">{t.goalReached}</p>
          ) : isCapped ? (
            <p className="text-lg font-bold text-red-500/80">{isArabic ? 'أكثر من 100 سنة' : 'More than 100 years'}</p>
          ) : (
            <div className="flex items-end justify-center gap-6">
              {finalYears > 0 && (
                <div className="flex flex-col items-center">
                  <span className="font-mono text-6xl font-bold tracking-tight text-[var(--olive-deep)]" dir="ltr">{finalYears}</span>
                  <span className="mt-2 text-sm font-medium text-[var(--muted-foreground)]">{t.years}</span>
                </div>
              )}
              {finalMonths > 0 && (
                <div className="flex flex-col items-center">
                  <span className="font-mono text-6xl font-bold tracking-tight text-[var(--olive)]" dir="ltr">{finalMonths}</span>
                  <span className="mt-2 text-sm font-medium text-[var(--muted-foreground)]">{t.months}</span>
                </div>
              )}
              {finalDays > 0 && (
                <div className="flex flex-col items-center">
                  <span className="font-mono text-4xl font-bold tracking-tight text-[var(--gold)]" dir="ltr">{finalDays}</span>
                  <span className="mt-2 text-sm font-medium text-[var(--muted-foreground)]">{t.days}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {!isImpossible && !isCapped && safeCurrent < safeTarget && (
          <div className="mt-8 rounded-xl bg-white/60 p-4 shadow-sm backdrop-blur-sm w-full">
            <p className="text-xs leading-relaxed text-[var(--ink)]">
              {isArabic 
                ? `بمعدل عائد ${safeRate}%، سيتم بناء ${Math.round(balance - (safeCurrent + safeMonthly * totalMonths)).toLocaleString()} ${t.currency} كأرباح متراكمة.` 
                : `At a ${safeRate}% return rate, you will build ${Math.round(balance - (safeCurrent + safeMonthly * totalMonths)).toLocaleString()} ${t.currency} in compound interest.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
