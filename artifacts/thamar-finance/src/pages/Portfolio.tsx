import { useState, useMemo } from 'react';
import { ArrowDownLeft, ArrowUpRight, BarChart3, ChevronDown, ShieldCheck, Wallet, ArrowLeft, ArrowRight } from 'lucide-react';

import ThamarSidebar from '@/components/ThamarSidebar';
import { monthly, portfolioAccounts, portfolioMix, portfolioPlans, trendData, type Language } from '@/data/mock-finance';
import useLanguagePreference from '@/hooks/use-language';

function localeFor(language: Language) {
  return language === 'ar' ? 'ar-SA' : 'en-US';
}

function formatNumber(value: number, language: Language, maximumFractionDigits = 0) {
  return new Intl.NumberFormat(localeFor(language), { maximumFractionDigits }).format(value);
}

function formatMoney(value: number, language: Language) {
  return formatNumber(value, language);
}

function formatPercent(value: number | string, language: Language, decimals = 1) {
  const numeric = typeof value === 'number' ? value : Number.parseFloat(value.replace(/[^\d.-]/g, ''));
  const sign = numeric > 0 ? '+' : numeric < 0 ? '-' : '';
  return `${sign}${formatNumber(Math.abs(numeric), language, decimals)}%`;
}

function formatMaskedAccount(value: string, language: Language) {
  const digits = value.replace(/[^\d]/g, '');
  return `••••${formatNumber(Number(digits), language)}`;
}

function Sparkline({ data, color, className = '' }: { data: number[], color: string, className?: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 4;
  const width = 100;
  const height = 30;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - padding - ((val - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={`overflow-visible ${className}`} preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        className="drop-shadow-md"
      />
    </svg>
  );
}

export default function Portfolio() {
  const [language, setLanguage] = useLanguagePreference();
  const [showPlan, setShowPlan] = useState(false);
  const [hoveredMix, setHoveredMix] = useState<string | null>(null);
  
  const isArabic = language === 'ar';
  const t = isArabic
    ? {
        title: 'محفظتك المستقبلية',
        intro: 'تابع ما تبنيه اليوم من أجل مستقبل مالي أكثر استدامة. استكشف كيف تنمو أصولك مع مرور الوقت.',
        balance: 'إجمالي الرصيد',
        income: 'الدخل',
        expenses: 'المصروفات',
        rate: 'معدل الادخار',
        change: 'من الشهر الماضي',
        diagram: 'توزيع محفظتك',
        accounts: 'حساباتك',
        all: 'عرض الكل',
        cash: 'كاش',
        saving: 'ادخار',
        investment: 'استثمار',
        plans: 'خطط الاستثمار',
        return: 'العائد المتوقع',
        risk: 'المخاطرة',
        allocation: 'من المحفظة',
        safe: 'النهج الأكثر أماناً',
        safeText: 'نوّع محفظتك بين الادخار والصكوك والأسهم، واحتفظ بصندوق طوارئ يغطي ستة أشهر قبل رفع المخاطر.',
        seePlan: 'اعرض خطتي المقترحة',
        hidePlan: 'إخفاء الخطة',
        planShown: 'التوزيع المقترح: ادخر ١٬٦٠٠ ر.س، ثم وزّع ٣٥٪ ذهب و٤٠٪ أسهم و٢٥٪ صكوك.',
        portfolio: 'محفظة',
        guidance: 'توجيهات ثَمَر',
      }
    : {
        title: 'Your future portfolio',
        intro: 'Track what you are building today for a more sustainable financial future. Explore how your assets grow over time.',
        balance: 'Total balance',
        income: 'Income',
        expenses: 'Expenses',
        rate: 'Saving rate',
        change: 'from last month',
        diagram: 'Your portfolio mix',
        accounts: 'Your accounts',
        all: 'View all',
        cash: 'Cash',
        saving: 'Savings',
        investment: 'Investments',
        plans: 'Investment plans',
        return: 'Expected return',
        risk: 'Risk',
        allocation: 'of portfolio',
        safe: 'The safest way forward',
        safeText: 'Balance savings, sukuk, and equities, and keep a six-month emergency fund before increasing risk.',
        seePlan: 'See my suggested plan',
        hidePlan: 'Hide plan',
        planShown: 'Suggested allocation: save SAR 1,600, then allocate 35% gold, 40% equities, and 25% sukuk.',
        portfolio: 'Portfolio',
        guidance: 'THAMAR GUIDANCE',
      };

  const trendPoints = trendData['6M'].map(d => d.value);

  const kpis = [
    { id: 'balance', label: t.balance, value: formatMoney(monthly.income + monthly.emergency + monthly.investable, language), suffix: isArabic ? 'ر.س' : 'SAR', color: '#f9edc8', icon: <Wallet size={20} strokeWidth={2.5} />, sparkline: trendPoints, trendColor: '#d4a83d' },
    { id: 'income', label: t.income, value: formatMoney(monthly.income, language), suffix: isArabic ? 'ر.س' : 'SAR', color: '#f6f2df', icon: <ArrowDownLeft size={20} strokeWidth={2.5} />, sparkline: trendData['3M'].map(d => d.value), trendColor: '#8b9d67' },
    { id: 'expenses', label: t.expenses, value: formatMoney(monthly.expenses, language), suffix: isArabic ? 'ر.س' : 'SAR', color: '#f8efd1', icon: <ArrowUpRight size={20} strokeWidth={2.5} />, sparkline: [50, 45, 48, 40, 42, 38, 35], trendColor: '#c97c49' },
    { id: 'rate', label: t.rate, value: formatNumber(monthly.savingsRate, language, 1), suffix: '%', color: '#e4edd6', icon: <BarChart3 size={20} strokeWidth={2.5} />, sparkline: trendPoints.map(v => v * 0.8), trendColor: '#6d7c72' },
  ];

  const portfolioGradient = useMemo(() => {
    let start = 0;
    return `conic-gradient(${portfolioMix.map((entry) => {
      const currentStart = start;
      start += entry.value;
      const isHovered = hoveredMix === entry.id;
      const isActive = hoveredMix === null || isHovered;
      const alpha = isActive ? 'ff' : '66';
      return `${entry.color}${alpha} ${currentStart}% ${start}%`;
    }).join(', ')})`;
  }, [hoveredMix]);

  return (
    <div className={`app-shell grain flex flex-col ${isArabic ? 'rtl' : 'ltr'}`} lang={language}>
      <div className="fixed inset-0 z-0 overflow-hidden bg-[var(--paper)] pointer-events-none">
        <img className="watermark-logo" src={`${import.meta.env.BASE_URL}thamar-brand-transparent.png`} alt="" aria-hidden="true" />
        <div className={`absolute top-[-10%] ${isArabic ? 'left-[-10%]' : 'right-[-10%]'} h-[60vh] w-[60vh] rounded-full bg-[var(--leaf)] opacity-[0.15] blur-[100px]`} />
        <div className={`absolute bottom-[-10%] ${isArabic ? 'right-[-10%]' : 'left-[-10%]'} h-[60vh] w-[60vh] rounded-full bg-[var(--gold)] opacity-[0.08] blur-[100px]`} />
      </div>

      <ThamarSidebar language={language} active="portfolio" onLanguageToggle={() => setLanguage(isArabic ? 'en' : 'ar')} />

      <main className={`relative z-10 w-full flex-1 pb-16 transition-all duration-300 ${isArabic ? 'lg:pr-[280px]' : 'lg:pl-[280px]'}`}>
        <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-8 lg:py-12">
          
          <header className="rise delay-1 mb-10 lg:mb-12">
            <h1 className="font-display text-3xl font-bold tracking-[-.04em] text-[var(--ink)] sm:text-4xl lg:text-[2.75rem]" data-testid="heading-future-portfolio">{t.title}</h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted-foreground)]" data-testid="text-portfolio-intro">{t.intro}</p>
          </header>

          <div className="grid gap-6 lg:gap-8 xl:grid-cols-[1fr_380px]">
            
            <div className="min-w-0 space-y-6 lg:space-y-8">
              <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label={t.portfolio} data-testid="section-portfolio-kpis">
                {kpis.map((item, i) => (
                  <article key={item.id} className={`group relative overflow-hidden rounded-[2rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(72,82,43,0.08)] rise delay-${(i % 4) + 1}`} style={{ backgroundColor: item.color }} data-testid={`card-portfolio-kpi-${item.id}`}>
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/30 blur-2xl transition-transform duration-500 group-hover:scale-150" aria-hidden="true" />
                    <div className="relative z-10 flex items-start justify-between gap-3">
                      <p className="text-sm font-medium text-[var(--olive-deep)]">{item.label}</p>
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/50 text-[var(--olive-deep)] shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/70">{item.icon}</span>
                    </div>
                    <div className="relative z-10 mt-6">
                      <p className="number text-3xl tracking-[-.06em] text-[var(--ink)]" dir="ltr" data-testid={`text-portfolio-kpi-${item.id}`}>
                        {item.value}<span className="ms-1 text-sm tracking-normal text-[var(--muted-foreground)]">{item.suffix}</span>
                      </p>
                      <div className="mt-4 flex items-center justify-between gap-4">
                        <p className="text-[11px] font-medium text-[var(--muted-foreground)]">
                          <span className="text-[var(--olive-deep)]">{formatPercent(4.2, language)}</span> {t.change}
                        </p>
                        <div className="w-16 opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                          <Sparkline data={item.sparkline} color={item.trendColor} />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </section>

              <section className="surface soft-hover relative overflow-hidden rounded-[2.5rem] p-6 sm:p-8 rise delay-3" data-testid="card-portfolio-diagram">
                <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true">
                  <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[30px] border-[#f0eadc]/50 blur-xl" />
                </div>
                
                <div className="relative z-10 mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <h2 className="font-display text-2xl font-bold tracking-[-.04em] text-[var(--ink)]">{t.diagram}</h2>
                    <p className="mt-1 text-sm text-[var(--muted-foreground)]">{isArabic ? 'توزيع الأصول الحالي عبر جميع حساباتك' : 'Current asset allocation across all your accounts'}</p>
                  </div>
                  <div className="rounded-2xl bg-[var(--leaf-pale)]/50 px-5 py-3 text-end">
                    <p className="text-xs font-medium text-[var(--muted-foreground)]">{t.balance}</p>
                    <p className="number mt-1 text-xl font-bold text-[var(--ink)]" dir="ltr">{formatMoney(monthly.income + monthly.emergency + monthly.investable, language)} <span className="text-xs font-normal">{isArabic ? 'ر.س' : 'SAR'}</span></p>
                  </div>
                </div>

                <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_1.5fr]">
                  <div className="group relative flex min-h-[220px] items-center justify-center sm:min-h-[260px]">
                    <div 
                      className="relative h-48 w-48 rounded-full shadow-[0_20px_50px_rgba(72,82,43,.15)] transition-transform duration-500 group-hover:scale-105 sm:h-56 sm:w-56" 
                      style={{ background: portfolioGradient }} 
                      role="img" 
                      aria-label={t.diagram}
                    >
                      <div className="absolute inset-[22%] flex flex-col items-center justify-center rounded-full bg-[var(--paper)] shadow-[inset_0_4px_20px_rgba(123,136,73,.1)] transition-transform duration-500">
                        <span className="text-[10px] font-medium uppercase tracking-widest text-[var(--muted-foreground)]">{isArabic ? 'الإجمالي' : 'TOTAL'}</span>
                        <span className="number mt-1 text-xl font-bold text-[var(--olive-deep)]">{formatNumber(100, language)}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                    {portfolioMix.map((entry) => (
                      <div 
                        key={entry.id} 
                        className={`relative cursor-default overflow-hidden rounded-2xl p-5 transition-all duration-300 ${hoveredMix === entry.id ? '-translate-y-1 shadow-lg' : hoveredMix && hoveredMix !== entry.id ? 'scale-95 opacity-50' : 'hover:-translate-y-1 hover:shadow-md'}`}
                        style={{ backgroundColor: `${entry.color}15` }}
                        onMouseEnter={() => setHoveredMix(entry.id)}
                        onMouseLeave={() => setHoveredMix(null)}
                        data-testid={`card-diagram-${entry.id}`}
                      >
                        <div className="absolute right-0 top-0 h-16 w-16 -translate-y-6 translate-x-6 rounded-full opacity-20" style={{ backgroundColor: entry.color }} />
                        <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-sm font-bold shadow-sm" style={{ color: entry.color }}>
                          {entry.id === 'cash' ? 'C' : entry.id === 'savings' ? 'S' : 'I'}
                        </span>
                        <p className="relative mt-5 text-xs font-medium text-[var(--muted-foreground)]">{isArabic ? entry.ar : entry.en}</p>
                        <p className="number relative mt-1 text-2xl font-bold text-[var(--ink)]" dir="ltr">{formatNumber(entry.value, language)}%</p>
                        <p className="relative mt-2 text-xs font-medium opacity-80" dir="ltr" style={{ color: entry.color }}>
                          {formatMoney(entry.amount, language)} {isArabic ? 'ر.س' : 'SAR'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="rise delay-6" data-testid="section-portfolio-plans">
                <div className="mb-6 flex items-end justify-between gap-4 px-2">
                  <div>
                    <h2 className="font-display text-2xl font-bold tracking-[-.04em] text-[var(--ink)]">{t.plans}</h2>
                    <p className="mt-1 text-sm text-[var(--muted-foreground)]">{isArabic ? 'استراتيجيات مصممة لأهدافك' : 'Strategies tailored to your goals'}</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {portfolioPlans.map((plan) => (
                    <article key={plan.id} className="surface soft-hover group relative cursor-pointer overflow-hidden rounded-[2rem] p-6" data-testid={`card-plan-${plan.id}`}>
                      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150" style={{ backgroundColor: plan.color }} />
                      <div className="relative z-10 flex items-start justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-xs font-bold shadow-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" style={{ backgroundColor: `${plan.color}15`, color: plan.color }}>
                          {plan.ar === 'الاستثمار بالذهب' ? 'Au' : plan.ar === 'الاستثمار بالأسهم' ? 'EQ' : 'S'}
                        </span>
                        <div className="text-end">
                          <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--muted-foreground)]">{t.return}</span>
                          <p className="number mt-0.5 text-lg font-bold text-[var(--olive)]" dir="ltr" data-testid={`text-plan-return-${plan.id}`}>{formatPercent(isArabic ? plan.returnAr : plan.returnEn, language)}</p>
                        </div>
                      </div>
                      <h3 className="relative z-10 mt-6 font-display text-lg font-bold text-[var(--ink)]">{isArabic ? plan.ar : plan.en}</h3>
                      <div className="relative z-10 mt-4 space-y-3 border-t border-[var(--line)] pt-4">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[var(--muted-foreground)]">{t.risk}</span>
                          <span className="font-medium text-[var(--ink)]">{isArabic ? plan.riskAr : plan.riskEn}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[var(--muted-foreground)]">{t.allocation}</span>
                          <span className="font-medium text-[var(--ink)]">{formatPercent(plan.allocation, language)}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

            </div>

            <div className="min-w-0 space-y-6 lg:space-y-8">
              
              <section className="rise delay-4">
                <article className="soft-hover group relative overflow-hidden rounded-[2rem] bg-[var(--olive)] p-7 text-[var(--paper)] shadow-[0_20px_40px_rgba(88,98,52,0.15)] sm:p-8" data-testid="card-safe-recommendation">
                  <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl transition-transform duration-700 group-hover:translate-x-10 group-hover:translate-y-10" />
                  <div className="relative z-10">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--paper)]/15 text-[var(--gold-soft)] shadow-inner backdrop-blur-sm">
                        <ShieldCheck size={24} strokeWidth={2} />
                      </div>
                      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--gold-soft)] opacity-90">{t.guidance}</span>
                    </div>
                    <h2 className="font-display text-2xl font-bold leading-tight tracking-[-.04em]">{t.safe}</h2>
                    <p className="mt-4 text-sm leading-relaxed text-[#e5edcf] opacity-90">{t.safeText}</p>
                    
                    <div className="mt-8">
                      <button 
                        type="button" 
                        onClick={() => setShowPlan((value) => !value)} 
                        className="group/btn inline-flex items-center gap-2 rounded-xl bg-[var(--paper)]/10 px-5 py-3 text-sm font-semibold text-[var(--gold-soft)] transition-all hover:bg-[var(--paper)]/20" 
                        data-testid="button-show-suggested-plan"
                      >
                        <span>{showPlan ? t.hidePlan : t.seePlan}</span>
                        <span className="transition-transform group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1">
                          {isArabic ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                        </span>
                      </button>
                      
                      <div className={`grid transition-all duration-300 ease-in-out ${showPlan ? 'mt-4 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur-md">
                            <p className="text-sm leading-relaxed text-[#f4f6e9]" data-testid="text-suggested-plan">{t.planShown}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </section>

              <section className="surface soft-hover rounded-[2rem] p-6 sm:p-7 rise delay-5" data-testid="card-portfolio-accounts">
                <div className="mb-6 flex items-center justify-between gap-3">
                  <h2 className="font-display text-xl font-bold tracking-[-.04em] text-[var(--ink)]">{t.accounts}</h2>
                  <button type="button" className="group flex items-center gap-1.5 rounded-full bg-[var(--leaf-pale)] px-3 py-1.5 text-xs font-semibold text-[var(--olive-deep)] transition-colors hover:bg-[var(--leaf)]" data-testid="button-view-accounts">
                    {t.all}
                    <ChevronDown size={14} className="transition-transform group-hover:translate-y-0.5" />
                  </button>
                </div>
                
                <div className="flex flex-col gap-3">
                  {portfolioAccounts.map((account) => (
                    <div key={account.id} className="group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02]" style={{ backgroundColor: account.color }} data-testid={`card-account-${account.id}`}>
                      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/60 text-[var(--olive-deep)] shadow-sm transition-transform duration-300 group-hover:-rotate-6"><Wallet size={20} strokeWidth={2} /></span>
                          <div>
                            <p className="text-sm font-bold text-[var(--ink)]">{isArabic ? account.ar : account.en}</p>
                            <div className="mt-1 flex items-center gap-2">
                              <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--muted-foreground)] opacity-80">{isArabic ? account.kindAr : account.kindEn}</span>
                              <span className="h-1 w-1 rounded-full bg-[var(--olive)] opacity-30" />
                              <span className="font-mono text-[10px] text-[var(--muted-foreground)] opacity-80" dir="ltr">{formatMaskedAccount(account.number, language)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-end">
                          <p className="number text-lg font-bold text-[var(--ink)]" dir="ltr">{formatMoney(account.value, language)}</p>
                          <p className="text-[10px] font-medium text-[var(--muted-foreground)] opacity-80">{isArabic ? 'ر.س' : 'SAR'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
