import { useState } from 'react';
import { ArrowDownLeft, ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, ChevronDown, ShieldCheck, Sparkles, Wallet, WalletCards } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Link } from 'wouter';

import ThamarHeader from '@/components/ThamarHeader';
import { monthly, portfolioAccounts, portfolioMix, portfolioPlans, type Language } from '@/data/mock-finance';
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

export default function Portfolio() {
  const [language, setLanguage] = useLanguagePreference();
  const [showPlan, setShowPlan] = useState(false);
  const isArabic = language === 'ar';
  const t = isArabic
    ? {
        eyebrow: 'مساحتك المالية · نظرة بعيدة',
        title: 'محفظتك المستقبلية',
        intro: 'تابع ما تبنيه اليوم من أجل مستقبل مالي أكثر استدامة.',
        demo: 'بيانات تجريبية — ليست توصية مالية',
        balance: 'إجمالي الرصيد',
        income: 'الدخل',
        expenses: 'المصروفات',
        rate: 'معدل الادخار',
        change: 'من الشهر الماضي',
        diagram: 'توزيع محفظتك',
        diagramNote: 'نسبة كل مساحة من إجمالي رصيدك التجريبي',
        accounts: 'حساباتك',
        all: 'عرض الكل',
        noTransactions: 'لا توجد معاملات حقيقية في هذه النسخة.',
        cash: 'كاش',
        saving: 'ادخار',
        investment: 'استثمار',
        plans: 'خطط الاستثمار',
        return: 'العائد المتوقع',
        risk: 'المخاطرة',
        allocation: 'من المحفظة',
        safe: 'أفضل طريقة وأكثرها أماناً',
        safeText: 'نوّع محفظتك بين الادخار والصكوك والأسهم، واحتفظ بصندوق طوارئ يغطي ستة أشهر قبل رفع المخاطر.',
        seePlan: 'اعرض خطتي المقترحة',
        hidePlan: 'إخفاء الخطة',
        planShown: 'خطتك التجريبية: ادخر ١٬٦٠٠ ر.س، ثم وزّع ٣٥٪ ذهب و٤٠٪ أسهم و٢٥٪ صكوك.',
        portfolio: 'محفظة',
      }
    : {
        eyebrow: 'YOUR MONEY SPACE · LONG VIEW',
        title: 'Your future portfolio',
        intro: 'Track what you are building today for a more sustainable financial future.',
        demo: 'Demo data — not financial advice',
        balance: 'Total balance',
        income: 'Income',
        expenses: 'Expenses',
        rate: 'Saving rate',
        change: 'from last month',
        diagram: 'Your portfolio mix',
        diagramNote: 'Share of each space in your illustrative balance',
        accounts: 'Your accounts',
        all: 'View all',
        noTransactions: 'There are no real transactions in this version.',
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
        planShown: 'Your demo plan: save SAR 1,600, then allocate 35% gold, 40% equities, and 25% sukuk.',
        portfolio: 'Portfolio',
      };

  const kpis = [
    { id: 'balance', label: t.balance, value: formatMoney(monthly.income + monthly.emergency + monthly.investable, language), suffix: isArabic ? 'ر.س' : 'SAR', color: '#f9edc8', icon: <WalletCards size={16} /> },
    { id: 'income', label: t.income, value: formatMoney(6380, language), suffix: isArabic ? 'ر.س' : 'SAR', color: '#f6f2df', icon: <ArrowDownLeft size={16} /> },
    { id: 'expenses', label: t.expenses, value: formatMoney(4250, language), suffix: isArabic ? 'ر.س' : 'SAR', color: '#f8efd1', icon: <ArrowUpRight size={16} /> },
    { id: 'rate', label: t.rate, value: formatNumber(monthly.savingsRate, language, 1), suffix: '%', color: '#e4edd6', icon: <BarChart3 size={16} /> },
  ];

  return (
    <main className={`app-shell grain page-enter ${isArabic ? 'rtl' : 'ltr'}`} lang={language}>
      <div className="relative min-h-[100dvh] overflow-hidden px-4 py-4 sm:px-8 sm:py-8">
        <img className="watermark-logo" src={`${import.meta.env.BASE_URL}thamar-brand-transparent.png`} alt="" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-[1240px]">
          <ThamarHeader language={language} active="portfolio" onLanguageToggle={() => setLanguage(isArabic ? 'en' : 'ar')} />

          <section className="mt-9 flex flex-col justify-between gap-4 sm:mt-12 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.18em] text-[var(--olive)]">{t.eyebrow}</p>
              <h1 className="font-display text-3xl font-semibold tracking-[-.08em] text-[var(--ink)] sm:text-[2.45rem]" data-testid="heading-future-portfolio">{t.title}</h1>
              <p className="mt-2 max-w-xl text-sm leading-7 text-[var(--muted-foreground)]" data-testid="text-portfolio-intro">{t.intro}</p>
            </div>
            <div className="flex items-center gap-2 self-start rounded-full border border-[#d7e3bd] bg-[#f0f6e6] px-3 py-2 text-[11px] text-[var(--olive-deep)] md:self-auto" data-testid="status-portfolio-demo">
              <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />{t.demo}
            </div>
          </section>

          <section className="surface relative mt-6 overflow-hidden rounded-[2rem] p-5 sm:p-7" data-testid="card-portfolio-diagram">
            <div className="absolute inset-0 opacity-50" aria-hidden="true">
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border-[22px] border-[#f0eadc]" />
            </div>
            <div className="relative flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
              <div>
                <h2 className="font-display text-xl font-semibold tracking-[-.06em] text-[var(--ink)]">{t.diagram}</h2>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">{t.diagramNote}</p>
              </div>
              <div className="text-end">
                <p className="text-[10px] text-[var(--muted-foreground)]">{t.balance}</p>
                <p className="number mt-1 text-lg text-[var(--ink)]" dir="ltr">{formatMoney(monthly.income + monthly.emergency + monthly.investable, language)} <span className="text-[10px]">{isArabic ? 'ر.س' : 'SAR'}</span></p>
              </div>
            </div>
            <div className="relative mt-3 grid items-center gap-5 lg:grid-cols-[1fr_1.15fr]">
              <div className="h-[230px] min-w-0 sm:h-[270px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={portfolioMix} dataKey="value" nameKey={language} innerRadius={65} outerRadius={103} paddingAngle={4} stroke="none">
                      {portfolioMix.map((entry) => <Cell key={entry.id} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`${formatNumber(value, language)}%`, isArabic ? 'النسبة' : 'Share']} contentStyle={{ borderRadius: 12, border: '1px solid #dfe6ce', background: '#fbfaf4', fontSize: 11, direction: isArabic ? 'rtl' : 'ltr' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {portfolioMix.map((entry) => (
                  <div key={entry.id} className="rounded-xl p-3 sm:p-4" style={{ backgroundColor: `${entry.color}22` }} data-testid={`card-diagram-${entry.id}`}>
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/70 text-[10px] font-semibold text-[var(--olive-deep)]">{entry.id === 'cash' ? '₿' : entry.id === 'savings' ? 'S' : 'I'}</span>
                    <p className="mt-4 text-[10px] text-[var(--muted-foreground)]">{isArabic ? entry.ar : entry.en}</p>
                    <p className="number mt-2 text-xl text-[var(--ink)]" dir="ltr">{formatNumber(entry.value, language)}%</p>
                    <p className="mt-1 text-[10px] text-[var(--muted-foreground)]" dir="ltr">{formatMoney(entry.amount, language)} {isArabic ? 'ر.س' : 'SAR'}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label={t.portfolio} data-testid="section-portfolio-kpis">
            {kpis.map((item) => (
              <article key={item.id} className="surface rounded-2xl p-4 sm:p-5" style={{ backgroundColor: item.color }} data-testid={`card-portfolio-kpi-${item.id}`}>
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-medium text-[var(--muted-foreground)]">{item.label}</p>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/65 text-[var(--olive)]">{item.icon}</span>
                </div>
                <p className="number mt-5 text-2xl tracking-[-.08em] text-[var(--ink)]" dir="ltr" data-testid={`text-portfolio-kpi-${item.id}`}>{item.value}<span className="ms-1 text-sm tracking-normal text-[var(--muted-foreground)]">{item.suffix}</span></p>
                <p className="mt-3 text-[11px] text-[var(--muted-foreground)]">{formatPercent(4.2, language)} {t.change}</p>
              </article>
            ))}
          </section>

          <section className="surface mt-4 rounded-2xl p-5 sm:p-6" data-testid="card-portfolio-accounts">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-semibold tracking-[-.06em] text-[var(--ink)]">{t.accounts}</h2>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">{t.noTransactions}</p>
              </div>
              <button type="button" className="flex items-center gap-1 text-xs font-semibold text-[var(--olive)]" data-testid="button-view-accounts">{t.all}<ChevronDown size={14} /></button>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {portfolioAccounts.map((account) => (
                <div key={account.id} className="rounded-xl p-4" style={{ backgroundColor: account.color }} data-testid={`card-account-${account.id}`}>
                  <div className="flex items-center justify-between">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/60 text-[var(--olive-deep)]"><Wallet size={15} /></span>
                    <span className="text-[10px] font-medium text-[var(--muted-foreground)]">{isArabic ? account.kindAr : account.kindEn}</span>
                  </div>
                  <p className="mt-5 text-xs font-semibold text-[var(--ink)]">{isArabic ? account.ar : account.en}</p>
                  <p className="mt-1 font-mono text-[10px] text-[var(--muted-foreground)]" dir="ltr">{formatMaskedAccount(account.number, language)}</p>
                  <p className="number mt-3 text-base text-[var(--ink)]" dir="ltr">{formatMoney(account.value, language)} <span className="text-[10px] text-[var(--muted-foreground)]">{isArabic ? 'ر.س' : 'SAR'}</span></p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8" data-testid="section-portfolio-plans">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-semibold tracking-[-.06em] text-[var(--ink)] sm:text-2xl">{t.plans}</h2>
              </div>
              <span className="hidden text-[10px] text-[var(--muted-foreground)] sm:block">{t.demo}</span>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {portfolioPlans.map((plan) => (
                <article key={plan.id} className="surface rounded-2xl p-5" data-testid={`card-plan-${plan.id}`}>
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl text-[10px] font-semibold" style={{ backgroundColor: `${plan.color}22`, color: plan.color }}>{plan.ar === 'الاستثمار بالذهب' ? 'Au' : plan.ar === 'الاستثمار بالأسهم' ? 'EQ' : 'S'}</span>
                    <span className="number text-lg text-[var(--olive)]" dir="ltr" data-testid={`text-plan-return-${plan.id}`}>{formatPercent(isArabic ? plan.returnAr : plan.returnEn, language)}</span>
                  </div>
                  <h3 className="mt-5 font-display text-base font-semibold text-[var(--ink)]">{isArabic ? plan.ar : plan.en}</h3>
                  <div className="mt-3 flex items-center justify-between border-t border-[var(--line)] pt-3 text-xs text-[var(--muted-foreground)]">
                    <span>{t.risk}: {isArabic ? plan.riskAr : plan.riskEn}</span>
                    <span>{formatPercent(plan.allocation, language)} {t.allocation}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-6 grid gap-4 pb-12 lg:grid-cols-[1.3fr_.7fr]">
            <article className="rounded-2xl bg-[var(--olive)] p-6 text-[var(--paper)] sm:p-7" data-testid="card-safe-recommendation">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-[var(--gold-soft)]"><ShieldCheck size={20} /></div>
                <span className="font-mono text-[9px] tracking-[.16em] text-[var(--gold-soft)]">THAMAR GUIDANCE</span>
              </div>
              <h2 className="mt-6 font-display text-xl font-semibold tracking-[-.06em]">{t.safe}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#e5edcf]">{t.safeText}</p>
              <button type="button" onClick={() => setShowPlan((value) => !value)} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[var(--gold-soft)] underline decoration-[var(--gold)] underline-offset-4" data-testid="button-show-suggested-plan">
                {showPlan ? t.hidePlan : t.seePlan}{isArabic ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
              </button>
              {showPlan && <p className="mt-4 rounded-xl bg-white/10 p-3 text-xs leading-6 text-[#f4f6e9]" data-testid="text-suggested-plan">{t.planShown}</p>}
            </article>
            <article className="surface rounded-2xl p-6" data-testid="card-portfolio-note">
              <div className="flex items-center gap-2 text-[var(--olive)]"><Sparkles size={17} /><span className="font-mono text-[9px] tracking-[.16em]">THAMAR NOTE</span></div>
              <p className="mt-5 text-sm leading-7 text-[var(--muted-foreground)]">{isArabic ? 'تذكّر: التنويع يساعد على إدارة المخاطر، لكنه لا يلغيها.' : 'Remember: diversification helps manage risk, but it never removes it.'}</p>
              <Link href="/invest-today" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[var(--olive)] underline decoration-[var(--gold)] underline-offset-4" data-testid="link-portfolio-to-today">{isArabic ? 'شاهد استثمارك اليوم' : 'See today’s investments'}{isArabic ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
}