import { useState } from 'react';
import { ArrowDownLeft, ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, ChevronDown, ShieldCheck, Sparkles, Wallet, WalletCards } from 'lucide-react';
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Link } from 'wouter';

import ThamarHeader from '@/components/ThamarHeader';
import { monthly, portfolioAccounts, portfolioMix, portfolioPlans, type Language } from '@/data/mock-finance';
import useLanguagePreference from '@/hooks/use-language';

function money(value: number, language: Language) {
  return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', { maximumFractionDigits: 0 }).format(value);
}

export default function Portfolio() {
  const [language, setLanguage] = useLanguagePreference();
  const [showPlan, setShowPlan] = useState(false);
  const isArabic = language === 'ar';
  const t = isArabic
    ? {
        eyebrow: 'مساحتك المالية · نظرة بعيدة',
        title: 'محفظتك المستقبلية',
        intro: 'صورة واحدة لكل ما تبنيه اليوم من أجل غد أكثر استدامة.',
        demo: 'بيانات تجريبية — ليست توصية مالية',
        balance: 'إجمالي الرصيد',
        income: 'الدخل',
        expenses: 'المصروفات',
        rate: 'معدل الادخار',
        change: 'من الشهر الماضي',
        accounts: 'حساباتك',
        all: 'عرض الكل',
        cash: 'الكاش',
        saving: 'الادخار',
        investment: 'الاستثمار',
        distribution: 'توزيع محفظتك',
        distributionNote: 'نسبة كل مساحة من إجمالي رصيدك التجريبي',
        plans: 'خطط الاستثمار التي ساهمت فيها',
        return: 'العائد المتوقع',
        risk: 'المخاطرة',
        allocation: 'من المحفظة',
        safe: 'أفضل طريقة وأكثرها أماناً',
        safeText: 'استمر في تنويع محفظتك بين الادخار والصكوك والأسهم، واحتفظ بصندوق طوارئ يغطي ستة أشهر قبل رفع المخاطر.',
        seePlan: 'اعرض خطتي المقترحة',
        planShown: 'خطتك التجريبية: 1,600 ر.س للادخار، ثم توزيع 35% ذهب و40% أسهم و25% صكوك.',
        noTransactions: 'لا توجد معاملات حقيقية في هذه النسخة.',
        portfolio: 'محفظة',
      }
    : {
        eyebrow: 'YOUR MONEY SPACE · LONG VIEW',
        title: 'Your future portfolio',
        intro: 'One calm view of what you are building today for a more sustainable tomorrow.',
        demo: 'Demo data — not financial advice',
        balance: 'Total balance',
        income: 'Income',
        expenses: 'Expenses',
        rate: 'Saving rate',
        change: 'from last month',
        accounts: 'Your accounts',
        all: 'View all',
        cash: 'Cash',
        saving: 'Savings',
        investment: 'Investments',
        distribution: 'Your portfolio mix',
        distributionNote: 'Share of each space in your illustrative balance',
        plans: 'Investment plans you joined',
        return: 'Expected return',
        risk: 'Risk',
        allocation: 'of portfolio',
        safe: 'The safest way forward',
        safeText: 'Keep balancing savings, sukuk, and equities, and build a six-month emergency fund before increasing risk.',
        seePlan: 'See my suggested plan',
        planShown: 'Your demo plan: save SAR 1,600, then allocate 35% gold, 40% equities, and 25% sukuk.',
        noTransactions: 'There are no real transactions in this version.',
        portfolio: 'Portfolio',
      };

  const kpis = [
    { id: 'balance', label: t.balance, value: money(monthly.income + monthly.emergency + monthly.investable, language), suffix: 'ر.س', color: 'bg-[#f9edc8]' },
    { id: 'income', label: t.income, value: money(6380, language), suffix: 'ر.س', color: 'bg-[#f6f2df]' },
    { id: 'expenses', label: t.expenses, value: money(4250, language), suffix: 'ر.س', color: 'bg-[#f8efd1]' },
    { id: 'rate', label: t.rate, value: `${monthly.savingsRate}`, suffix: '%', color: 'bg-[#e4edd6]' },
  ];

  return (
    <main className={`app-shell grain page-enter ${isArabic ? 'rtl' : 'ltr'}`} lang={language}>
      <div className="relative min-h-[100dvh] overflow-hidden px-4 py-4 sm:px-8 sm:py-8">
        <div className="watermark-logo" aria-hidden="true">ثَمَر</div>
        <div className="relative z-10 mx-auto max-w-[1240px]">
          <ThamarHeader language={language} active="portfolio" onLanguageToggle={() => setLanguage(isArabic ? 'en' : 'ar')} />

          <section className="mt-10 flex flex-col justify-between gap-5 sm:mt-14 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.18em] text-[var(--olive)]">{t.eyebrow}</p>
              <h1 className="font-display text-3xl font-semibold tracking-[-.08em] text-[var(--ink)] sm:text-[2.6rem]" data-testid="heading-future-portfolio">{t.title}</h1>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted-foreground)]" data-testid="text-portfolio-intro">{t.intro}</p>
            </div>
            <div className="flex items-center gap-2 self-start rounded-full border border-[#d7e3bd] bg-[#f0f6e6] px-3 py-2 text-[11px] text-[var(--olive-deep)] md:self-auto" data-testid="status-portfolio-demo">
              <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />{t.demo}
            </div>
          </section>

          <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label={t.portfolio}>
            {kpis.map((item, index) => (
              <article key={item.id} className={`surface soft-hover rounded-2xl p-5 ${item.color}`} data-testid={`card-portfolio-kpi-${item.id}`}>
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-medium text-[var(--muted-foreground)]">{item.label}</p>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/60 text-[var(--olive)]">
                    {index === 0 ? <WalletCards size={16} /> : index === 1 ? <ArrowDownLeftIcon /> : index === 2 ? <ArrowUpRightIcon /> : <BarChart3 size={16} />}
                  </span>
                </div>
                <p className="number mt-5 text-2xl tracking-[-.08em] text-[var(--ink)]" dir="ltr" data-testid={`text-portfolio-kpi-${item.id}`}>{item.value}<span className="ms-1 text-sm tracking-normal text-[var(--muted-foreground)]">{item.suffix}</span></p>
                <p className="mt-3 text-[11px] text-[var(--muted-foreground)]">+4.2% {t.change}</p>
              </article>
            ))}
          </section>

          <section className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
            <article className="surface rounded-2xl p-5 sm:p-6" data-testid="card-portfolio-accounts">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-lg font-semibold tracking-[-.06em] text-[var(--ink)]">{t.accounts}</h2>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">{t.noTransactions}</p>
                </div>
                <button type="button" className="flex items-center gap-1 text-xs font-semibold text-[var(--olive)]" data-testid="button-view-accounts">{t.all}<ChevronDown size={14} /></button>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {portfolioAccounts.map((account) => (
                  <div key={account.id} className="rounded-xl p-4" style={{ backgroundColor: account.color }} data-testid={`card-account-${account.id}`}>
                    <div className="flex items-center justify-between">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/60 text-[var(--olive-deep)]"><Wallet size={15} /></span>
                      <span className="text-[10px] font-medium text-[var(--muted-foreground)]">{isArabic ? account.kindAr : account.kindEn}</span>
                    </div>
                    <p className="mt-5 text-xs font-semibold text-[var(--ink)]">{isArabic ? account.ar : account.en}</p>
                    <p className="mt-1 font-mono text-[10px] text-[var(--muted-foreground)]">{account.number}</p>
                    <p className="number mt-3 text-base text-[var(--ink)]" dir="ltr">{money(account.value, language)} <span className="text-[10px] text-[var(--muted-foreground)]">SAR</span></p>
                  </div>
                ))}
              </div>
            </article>

            <article className="surface rounded-2xl p-5 sm:p-6" data-testid="card-portfolio-mix">
              <div>
                <h2 className="font-display text-lg font-semibold tracking-[-.06em] text-[var(--ink)]">{t.distribution}</h2>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">{t.distributionNote}</p>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-[150px] w-[150px] shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={portfolioMix} dataKey="value" nameKey={language} innerRadius={47} outerRadius={68} paddingAngle={3} stroke="none">
                        {portfolioMix.map((entry) => <Cell key={entry.id} fill={entry.color} />)}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`${value}%`, isArabic ? 'النسبة' : 'Share']} contentStyle={{ borderRadius: 12, border: '1px solid #dfe6ce', background: '#fbfaf4', fontSize: 11, direction: isArabic ? 'rtl' : 'ltr' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="min-w-0 flex-1 space-y-3">
                  {portfolioMix.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between gap-3 text-xs" data-testid={`text-portfolio-mix-${entry.id}`}>
                      <span className="flex items-center gap-2 text-[var(--muted-foreground)]"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />{isArabic ? entry.ar : entry.en}</span>
                      <span className="number text-[var(--ink)]">{entry.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </section>

          <section className="mt-10" data-testid="section-portfolio-plans">
            <div className="mb-4">
              <h2 className="font-display text-xl font-semibold tracking-[-.06em] text-[var(--ink)] sm:text-2xl">{t.plans}</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {portfolioPlans.map((plan) => (
                <article key={plan.id} className="surface soft-hover rounded-2xl p-5" data-testid={`card-plan-${plan.id}`}>
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold" style={{ backgroundColor: `${plan.color}22`, color: plan.color }}>{plan.ar === 'الاستثمار بالذهب' ? 'Au' : plan.ar === 'الاستثمار بالأسهم' ? 'EQ' : 'S'}</span>
                    <span className="number text-lg text-[var(--olive)]" data-testid={`text-plan-return-${plan.id}`}>{isArabic ? plan.returnAr : plan.returnEn}</span>
                  </div>
                  <h3 className="mt-5 font-display text-base font-semibold text-[var(--ink)]">{isArabic ? plan.ar : plan.en}</h3>
                  <div className="mt-3 flex items-center justify-between border-t border-[var(--line)] pt-3 text-xs text-[var(--muted-foreground)]">
                    <span>{t.risk}: {isArabic ? plan.riskAr : plan.riskEn}</span>
                    <span>{plan.allocation} {t.allocation}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10 grid gap-4 pb-12 lg:grid-cols-[1.3fr_.7fr]">
            <article className="rounded-2xl bg-[var(--olive)] p-6 text-[var(--paper)] sm:p-8" data-testid="card-safe-recommendation">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-[var(--gold-soft)]"><ShieldCheck size={20} /></div>
                <span className="font-mono text-[9px] tracking-[.16em] text-[var(--gold-soft)]">THAMAR GUIDANCE</span>
              </div>
              <h2 className="mt-7 font-display text-xl font-semibold tracking-[-.06em]">{t.safe}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#e5edcf]">{t.safeText}</p>
              <button type="button" onClick={() => setShowPlan((value) => !value)} className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[var(--gold-soft)] underline decoration-[var(--gold)] underline-offset-4" data-testid="button-show-suggested-plan">
                {showPlan ? (isArabic ? 'إخفاء الخطة' : 'Hide plan') : t.seePlan}{isArabic ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
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

function ArrowDownLeftIcon() {
  return <ArrowDownLeft size={16} />;
}

function ArrowUpRightIcon() {
  return <ArrowUpRight size={16} />;
}