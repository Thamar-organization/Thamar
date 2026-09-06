import { useState } from 'react';
import { Calculator, Percent, TrendingUp, PieChart, Timer, LineChart, Coins, Scale, ArrowLeft, ArrowRight } from 'lucide-react';
import ThamarSidebar from '@/components/ThamarSidebar';
import ThamarTopNav from '@/components/ThamarTopNav';
import useLanguagePreference from '@/hooks/use-language';
import type { Language } from '@/data/mock-finance';

import SavingsRateCalc from '@/components/calculators/SavingsRateCalc';
import ExpectedReturnCalc from '@/components/calculators/ExpectedReturnCalc';
import PortfolioAllocationCalc from '@/components/calculators/PortfolioAllocationCalc';
import TimeToGoalCalc from '@/components/calculators/TimeToGoalCalc';
import InvestmentGrowthCalc from '@/components/calculators/InvestmentGrowthCalc';
import CompoundInterestCalc from '@/components/calculators/CompoundInterestCalc';
import RiskReturnCalc from '@/components/calculators/RiskReturnCalc';

type CalcId = 'savings-rate' | 'expected-return' | 'portfolio-allocation' | 'time-goal' | 'investment-growth' | 'compound-interest' | 'risk-return';

export default function Calculators() {
  const [language, setLanguage] = useLanguagePreference();
  const [activeCalc, setActiveCalc] = useState<CalcId | null>(null);

  const isArabic = language === 'ar';

  const t = {
    title: isArabic ? 'الحاسبات المالية' : 'Financial Calculators',
    back: isArabic ? 'العودة للقائمة' : 'Back to list',
  };

  const calculators = [
    { id: 'savings-rate', icon: Percent, ar: 'معدل الادخار', en: 'Savings Rate', color: 'var(--leaf)', comp: SavingsRateCalc },
    { id: 'time-goal', icon: Timer, ar: 'وقت الوصول للهدف', en: 'Time to Goal', color: 'var(--olive)', comp: TimeToGoalCalc },
    { id: 'expected-return', icon: TrendingUp, ar: 'العائد المتوقع', en: 'Expected Return', color: 'var(--gold)', comp: ExpectedReturnCalc },
    { id: 'compound-interest', icon: Coins, ar: 'العائد التراكمي', en: 'Compound Interest', color: 'var(--leaf)', comp: CompoundInterestCalc },
    { id: 'investment-growth', icon: LineChart, ar: 'نمو الاستثمار', en: 'Investment Growth', color: 'var(--olive)', comp: InvestmentGrowthCalc },
    { id: 'portfolio-allocation', icon: PieChart, ar: 'توزيع المحفظة', en: 'Portfolio Allocation', color: 'var(--gold)', comp: PortfolioAllocationCalc },
    { id: 'risk-return', icon: Scale, ar: 'المخاطرة والعائد', en: 'Risk vs Return', color: 'var(--leaf)', comp: RiskReturnCalc },
  ] as const;

  const ActiveComponent = activeCalc ? calculators.find(c => c.id === activeCalc)?.comp : null;
  const activeDef = activeCalc ? calculators.find(c => c.id === activeCalc) : null;

  return (
    <div className={`app-shell grain flex flex-col ${isArabic ? 'rtl' : 'ltr'}`} lang={language}>
      <ThamarSidebar language={language} active="calculators" onLanguageToggle={() => setLanguage(isArabic ? 'en' : 'ar')} />

      <main className={`relative z-10 w-full flex-1 pb-16 transition-all duration-300 ${isArabic ? 'lg:pr-[280px]' : 'lg:pl-[280px]'}`}>
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-8 lg:py-12">
          <ThamarTopNav language={language} active="calculators" />
          
          <header className="rise delay-1 mb-8 lg:mb-10">
            {activeCalc ? (
              <div className="flex flex-col items-start gap-4">
                <button
                  type="button"
                  onClick={() => setActiveCalc(null)}
                  className="group flex items-center gap-2 rounded-full bg-[var(--leaf-pale)] px-4 py-2 text-sm font-semibold text-[var(--olive-deep)] transition hover:bg-[var(--leaf)]"
                >
                  {isArabic ? <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /> : <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />}
                  {t.back}
                </button>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--paper)] text-[var(--olive-deep)] shadow-sm">
                    {activeDef && <activeDef.icon size={24} />}
                  </div>
                  <div>
                    <h1 className="font-display text-2xl font-bold tracking-[-.04em] text-[var(--ink)] sm:text-3xl">
                      {isArabic ? activeDef?.ar : activeDef?.en}
                    </h1>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h1 className="font-display text-3xl font-bold tracking-[-.04em] text-[var(--ink)] sm:text-4xl lg:text-[2.75rem]">
                  {t.title}
                </h1>
              </>
            )}
          </header>

          <div className="rise delay-2">
            {!activeCalc ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {calculators.map((calc) => {
                  const Icon = calc.icon;
                  return (
                    <button
                      key={calc.id}
                      type="button"
                      onClick={() => setActiveCalc(calc.id)}
                      className="group surface soft-hover flex flex-col items-start rounded-[2rem] p-6 text-start transition-all"
                    >
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" style={{ backgroundColor: `color-mix(in srgb, ${calc.color} 20%, transparent)`, color: 'var(--olive-deep)' }}>
                        <Icon size={26} strokeWidth={2} />
                      </div>
                      <h2 className="font-display text-lg font-bold text-[var(--ink)]">
                        {isArabic ? calc.ar : calc.en}
                      </h2>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="surface overflow-hidden rounded-[2rem] p-6 sm:p-8 shadow-[0_20px_40px_rgba(72,82,43,0.05)]">
                {ActiveComponent && <ActiveComponent language={language} />}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
