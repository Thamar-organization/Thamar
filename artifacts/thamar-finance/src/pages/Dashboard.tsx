import { useMemo, useState, type ReactNode } from 'react';
import { ArrowDownLeft, ArrowLeft, ArrowUpLeft, BarChart3, ChevronDown, CircleHelp, Clock3, Coins, Home, LogOut, Menu, MoreHorizontal, ShieldCheck, Sparkles, TrendingDown, TrendingUp, Wallet, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { investments, marketIndicators, monthly, trendData, type Language } from '@/data/mock-finance';

type Range = keyof typeof trendData;

const labels = {
  ar: {
    overview: 'نظرة عامة', dashboard: 'لوحة اليوم', investments: 'استثماراتي', journal: 'دفتر المصروفات', settings: 'الإعدادات',
    hello: 'مساء الخير، سارة', intro: 'هذه صورة هادئة لأموالك هذا الشهر.', demo: 'بيانات توضيحية — ليست نصيحة مالية',
    projectEyebrow: 'اسم المشروع', projectName: 'ثَمَر', mission: 'هدف المشروع هو زيادة الوعي والرقابة الفعلية على السوق المالي وتغيرات الاقتصاد العالمي لتحقيق الاستدامة المالية بشكل ذكي.',
    month: 'أغسطس 2025', income: 'الدخل الشهري', expenses: 'المصروفات', savings: 'المدخرات', emergency: 'صندوق الطوارئ', investable: 'المتاح للاستثمار',
    compared: 'مقارنة بالشهر الماضي', rate: 'معدل الادخار', score: 'مؤشر الاستدامة المالية', healthy: 'وضعك المالي يتحسن', scoreNote: 'أنت على مسار جيد. الاستمرارية أهم من الكمال.',
    markets: 'خطط الاستثمار', marketsNote: 'خيارات استثمارية مرتبطة بقراءة المؤشرات', trend: 'اتجاه السوق', trendNote: 'حركة مؤشر مركب للتوضيح فقط', month1: 'شهر', months3: '3 أشهر', months6: '6 أشهر',
    explore: 'مقارنة خيارات الاستثمار', exploreNote: 'اقتراحات مبنية على أرقام تجريبية وأهداف شائعة', suitable: 'الأنسب لك', fit: 'ملاءمة', risk: 'مستوى المخاطرة', learn: 'لماذا هذا الخيار؟',
    suggestion: 'اقتراح ثَمَر', suggestionText: 'قبل زيادة استثمارك، ارفع صندوق الطوارئ إلى ستة أشهر من المصروفات.', seePlan: 'شاهد الخطة', dataNote: 'آخر تحديث تجريبي منذ لحظات',
    logout: 'العودة لتسجيل الدخول', lang: 'English', profile: 'سارة م.',
  },
  en: {
    overview: 'Overview', dashboard: 'Today’s dashboard', investments: 'My investments', journal: 'Spending journal', settings: 'Settings',
    hello: 'Good evening, Sarah', intro: 'A calm view of your money this month.', demo: 'Illustrative data — not financial advice',
    projectEyebrow: 'PROJECT NAME', projectName: 'THAMAR', mission: 'The project aims to increase awareness and active oversight of financial markets and global economic changes to achieve smarter financial sustainability.',
    month: 'August 2025', income: 'Monthly income', expenses: 'Expenses', savings: 'Savings', emergency: 'Emergency fund', investable: 'Ready to invest',
    compared: 'vs. last month', rate: 'Savings rate', score: 'Financial sustainability', healthy: 'Your finances are improving', scoreNote: 'You are on a good path. Consistency beats perfection.',
    markets: 'Investment plans', marketsNote: 'Investment options informed by market indicators', trend: 'Market trend', trendNote: 'Composite movement for illustration only', month1: '1 month', months3: '3 months', months6: '6 months',
    explore: 'Compare investment options', exploreNote: 'Suggestions based on demo numbers and common goals', suitable: 'Best fit', fit: 'Fit', risk: 'Risk level', learn: 'Why this option?',
    suggestion: 'A note from Thamar', suggestionText: 'Before increasing investments, build your emergency fund toward six months of expenses.', seePlan: 'View the plan', dataNote: 'Demo data refreshed moments ago',
    logout: 'Return to sign in', lang: 'العربية', profile: 'Sarah M.',
  },
};

function formatMoney(value: number, language: Language) {
  return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', { maximumFractionDigits: 0 }).format(value);
}

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2" data-testid="link-dashboard-logo">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--gold-soft)] text-[var(--olive-deep)]"><SproutIcon /></span>
      <span>
        <span className="block font-display text-base font-semibold leading-none tracking-[-.08em] text-[var(--ink)]">ثَمَر</span>
        <span className="font-mono text-[8px] tracking-[.16em] text-[var(--olive)]">THAMAR</span>
      </span>
    </Link>
  );
}

function SproutIcon() {
  return <Sparkles size={18} strokeWidth={1.7} aria-hidden="true" />;
}

function StatCard({ icon, title, value, unit, note, tone = 'paper', testId }: { icon: ReactNode; title: string; value: string; unit?: string; note: string; tone?: 'paper' | 'green' | 'gold'; testId: string }) {
  return (
    <article className={`surface soft-hover rounded-[1.35rem] p-5 ${tone === 'green' ? 'bg-[var(--leaf)]' : tone === 'gold' ? 'bg-[#fbf1d4]' : ''}`} data-testid={testId}>
      <div className="flex items-start justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/60 text-[var(--olive)]">{icon}</span>
        <button type="button" className="text-[var(--muted-foreground)] transition hover:text-[var(--olive-deep)]" aria-label="More details" data-testid={`button-more-${testId}`}><MoreHorizontal size={18} /></button>
      </div>
      <p className="mt-5 text-sm text-[var(--muted-foreground)]" data-testid={`text-title-${testId}`}>{title}</p>
      <p className="number mt-1 text-[1.75rem] font-medium tracking-[-.08em] text-[var(--ink)]" dir="ltr" data-testid={`text-value-${testId}`}>{value}<span className="mr-1 ml-1 text-sm font-normal tracking-normal text-[var(--muted-foreground)]">{unit}</span></p>
      <p className="mt-3 text-xs text-[var(--muted-foreground)]" data-testid={`text-note-${testId}`}>{note}</p>
    </article>
  );
}

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [language, setLanguage] = useState<Language>('ar');
  const [range, setRange] = useState<Range>('3M');
  const [activeIndicator, setActiveIndicator] = useState('gold');
  const [menuOpen, setMenuOpen] = useState(false);
  const isArabic = language === 'ar';
  const t = labels[language];
  const selectedIndicator = marketIndicators.find((item) => item.id === activeIndicator) ?? marketIndicators[0];
  const chartData = useMemo(() => trendData[range], [range]);

  return (
    <main className={`app-shell grain page-enter ${isArabic ? 'rtl' : 'ltr'}`} lang={language}>
      <div className="mx-auto flex min-h-[100dvh] max-w-[1600px]">
        <aside className="hidden w-[248px] shrink-0 flex-col border-e border-[var(--line)] bg-[#e9f2d9] px-5 py-7 lg:flex">
          <Brand />
          <div className="mt-14">
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[.2em] text-[var(--muted-foreground)]">{isArabic ? 'المساحة الشخصية' : 'YOUR SPACE'}</p>
            <nav className="space-y-1" aria-label="Main navigation">
              {[
                { icon: Home, label: t.overview, active: true, id: 'overview', href: '/dashboard' },
                { icon: Wallet, label: isArabic ? 'محفظتك المستقبلية' : 'Your future portfolio', active: false, id: 'portfolio', href: '/portfolio' },
                { icon: BarChart3, label: isArabic ? 'استثمارك اليوم' : 'Invest today', active: false, id: 'today', href: '/invest-today' },
              ].map((item) => (
                <Link key={item.id} href={item.href} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${item.active ? 'bg-[var(--olive)] font-semibold text-[var(--paper)] shadow-sm' : 'text-[var(--olive-deep)] hover:bg-white/45'}`} data-testid={`nav-${item.id}`}>
                  <item.icon size={17} strokeWidth={item.active ? 2 : 1.7} />
                  <span>{item.label}</span>
                  {item.active && <span className="ms-auto h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto">
            <div className="mb-5 rounded-2xl bg-[var(--paper)]/70 p-4">
              <ShieldCheck size={18} className="mb-3 text-[var(--olive)]" />
              <p className="text-xs font-semibold text-[var(--olive-deep)]">{isArabic ? 'خصوصيتك أولاً' : 'Privacy, first'}</p>
              <p className="mt-1 text-[11px] leading-5 text-[var(--muted-foreground)]">{isArabic ? 'كل ما تراه هنا بيانات توضيحية.' : 'Everything here is illustrative demo data.'}</p>
            </div>
            <button type="button" onClick={() => setLocation('/')} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-[var(--muted-foreground)] transition hover:bg-white/45 hover:text-[var(--olive-deep)]" data-testid="button-logout">
              <LogOut size={17} />
              <span>{t.logout}</span>
            </button>
          </div>
        </aside>

        <div className="min-w-0 flex-1 px-4 py-4 sm:px-7 sm:py-6 lg:px-10 lg:py-8">
          <header className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 lg:hidden">
              <button type="button" onClick={() => setMenuOpen((value) => !value)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--paper)] text-[var(--olive-deep)]" aria-label="Open navigation" data-testid="button-mobile-menu">
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
              <Brand />
            </div>
            <span className="hidden text-xs text-[var(--muted-foreground)] lg:inline" data-testid="text-last-updated">{t.dataNote}</span>
            <div className="ms-auto flex items-center gap-2 sm:gap-4">
              <button type="button" onClick={() => setLanguage(isArabic ? 'en' : 'ar')} className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-xs font-medium text-[var(--olive-deep)] transition hover:border-[var(--olive)]" data-testid="button-dashboard-language">{t.lang}</button>
              <div className="hidden h-9 w-px bg-[var(--line)] sm:block" />
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--olive)] text-sm font-semibold text-[var(--paper)]">س</span>
                <span className="hidden text-sm font-medium text-[var(--ink)] sm:block" data-testid="text-profile-name">{t.profile}</span>
                <ChevronDown size={15} className="hidden text-[var(--muted-foreground)] sm:block" />
              </div>
            </div>
          </header>
          {menuOpen && (
            <div className="surface mt-4 rounded-2xl p-3 lg:hidden" data-testid="mobile-navigation">
              <Link href="/dashboard" className="flex w-full items-center gap-3 rounded-xl bg-[var(--olive)] px-3 py-3 text-sm font-semibold text-[var(--paper)]" data-testid="nav-mobile-overview"><Home size={17} />{t.overview}</Link>
              <Link href="/portfolio" className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-[var(--muted-foreground)]" data-testid="nav-mobile-portfolio"><Wallet size={17} />{isArabic ? 'محفظتك المستقبلية' : 'Your future portfolio'}</Link>
              <Link href="/invest-today" className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-[var(--muted-foreground)]" data-testid="nav-mobile-today"><BarChart3 size={17} />{isArabic ? 'استثمارك اليوم' : 'Invest today'}</Link>
              <button type="button" onClick={() => setLocation('/')} className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-[var(--muted-foreground)]" data-testid="button-mobile-logout"><LogOut size={17} />{t.logout}</button>
            </div>
          )}

          <div className="mx-auto max-w-[1240px]">
            <section className="surface mt-8 flex flex-col items-center gap-5 rounded-[1.35rem] p-5 text-center sm:flex-row sm:text-start" data-testid="section-project-overview">
              <img src={`${import.meta.env.BASE_URL}thamar-logo.png`} alt={isArabic ? 'شعار ثَمَر' : 'Thamar logo'} className="h-20 w-20 shrink-0 rounded-2xl object-cover shadow-sm" data-testid="img-project-logo" />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[var(--olive)]">{t.projectEyebrow}</p>
                <h2 className="mt-1 font-display text-2xl font-semibold tracking-[-.08em] text-[var(--ink)]" data-testid="text-project-name">{t.projectName}</h2>
                <p className="mt-2 max-w-4xl text-sm leading-7 text-[var(--muted-foreground)]" data-testid="text-project-mission">{t.mission}</p>
              </div>
            </section>
            <section className="mb-7 mt-10 flex flex-col justify-between gap-5 sm:mt-14 md:flex-row md:items-end">
              <div className="rise">
                <p className="mb-3 flex items-center gap-2 text-xs font-medium text-[var(--olive)]"><Clock3 size={14} />{t.month}</p>
                <h1 className="font-display text-3xl font-semibold tracking-[-.08em] text-[var(--ink)] sm:text-[2.7rem]" data-testid="heading-dashboard">{t.hello}</h1>
                <p className="mt-2 text-sm text-[var(--muted-foreground)]" data-testid="text-dashboard-intro">{t.intro}</p>
              </div>
              <div className="flex items-center gap-2 self-start rounded-full border border-[#d8dfc4] bg-[#f4f8ea] px-3 py-2 text-[11px] text-[var(--olive-deep)] md:self-auto" data-testid="status-demo-data">
                <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
                {t.demo}
              </div>
            </section>

            <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5" aria-label={t.overview}>
              <StatCard testId="card-income" title={t.income} value={formatMoney(monthly.income, language)} unit={isArabic ? 'ر.س' : 'SAR'} note={`+${isArabic ? '4.2' : '4.2'}% ${t.compared}`} icon={<ArrowDownLeft size={18} />} tone="paper" />
              <StatCard testId="card-expenses" title={t.expenses} value={formatMoney(monthly.expenses, language)} unit={isArabic ? 'ر.س' : 'SAR'} note={`-${isArabic ? '2.1' : '2.1'}% ${t.compared}`} icon={<ArrowUpLeft size={18} />} tone="paper" />
              <StatCard testId="card-savings" title={t.savings} value={formatMoney(monthly.savings, language)} unit={isArabic ? 'ر.س' : 'SAR'} note={`${formatMoney(monthly.savingsRate, language)}% ${t.rate}`} icon={<Coins size={18} />} tone="green" />
              <StatCard testId="card-emergency" title={t.emergency} value={formatMoney(monthly.emergency, language)} unit={isArabic ? 'ر.س' : 'SAR'} note={isArabic ? '3.8 أشهر من المصروفات' : '3.8 months of expenses'} icon={<ShieldCheck size={18} />} tone="paper" />
              <StatCard testId="card-investable" title={t.investable} value={formatMoney(monthly.investable, language)} unit={isArabic ? 'ر.س' : 'SAR'} note={isArabic ? 'بعد الالتزامات' : 'after commitments'} icon={<Wallet size={18} />} tone="gold" />
            </section>

            <section className="mt-3 grid gap-3 md:grid-cols-[1.25fr_.75fr]">
              <article className="surface rounded-[1.35rem] p-5 sm:p-6" data-testid="card-sustainability">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-[var(--muted-foreground)]">{t.score}</p>
                    <p className="mt-1 font-display text-xl font-semibold tracking-[-.06em] text-[var(--ink)]" data-testid="text-score-status">{t.healthy}</p>
                  </div>
                  <button type="button" aria-label="About financial score" className="text-[var(--muted-foreground)] transition hover:text-[var(--olive)]" data-testid="button-score-help"><CircleHelp size={18} /></button>
                </div>
                <div className="mt-6 flex items-center gap-6">
                  <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full" style={{ background: 'conic-gradient(var(--olive) 78%, var(--leaf) 0)' }}>
                    <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[var(--paper)]">
                      <span className="number text-2xl font-medium text-[var(--ink)]" data-testid="text-financial-score">{monthly.score}</span>
                    </div>
                  </div>
                  <div className="max-w-xs">
                    <p className="text-sm leading-7 text-[var(--muted-foreground)]">{t.scoreNote}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[var(--olive)]"><TrendingUp size={14} /> +6 {isArabic ? 'نقاط هذا الشهر' : 'points this month'}</div>
                  </div>
                </div>
              </article>
              <article className="rounded-[1.35rem] bg-[var(--olive)] p-5 text-[var(--paper)] sm:p-6" data-testid="card-thamar-suggestion">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-[var(--gold-soft)]"><Sparkles size={18} /></span>
                  <span className="font-mono text-[9px] tracking-[.16em] text-[var(--gold-soft)]">THAMAR NOTE</span>
                </div>
                <h2 className="mt-7 font-display text-xl font-semibold tracking-[-.06em]">{t.suggestion}</h2>
                <p className="mt-2 text-sm leading-7 text-[#e5edcf]">{t.suggestionText}</p>
                <button type="button" onClick={() => window.alert(isArabic ? 'الخطة المقترحة: ادخر 1,600 ر.س شهرياً حتى تكتمل ستة أشهر.' : 'Suggested plan: save SAR 1,600 monthly until you reach six months.')} className="mt-5 flex items-center gap-2 text-xs font-semibold text-[var(--gold-soft)] underline decoration-[var(--gold)] underline-offset-4" data-testid="button-see-plan">{t.seePlan}<ArrowLeft size={14} /></button>
              </article>
            </section>

            <section className="mt-10" data-testid="section-market">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl font-semibold tracking-[-.06em] text-[var(--ink)] sm:text-2xl">{t.markets}</h2>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">{t.marketsNote}</p>
                </div>
                <span className="hidden items-center gap-1.5 text-[10px] text-[var(--muted-foreground)] sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />{t.demo}</span>
              </div>
              <div className="mobile-scroll flex gap-3 pb-1">
                {marketIndicators.map((item) => (
                  <button type="button" key={item.id} onClick={() => setActiveIndicator(item.id)} className={`surface soft-hover min-w-[154px] rounded-[1.2rem] p-4 text-start transition ${activeIndicator === item.id ? 'border-[var(--olive)] ring-2 ring-[#d5e6b6]' : ''}`} data-testid={`button-indicator-${item.id}`} aria-pressed={activeIndicator === item.id}>
                    <div className="flex items-center justify-between">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-semibold" style={{ backgroundColor: `${item.color}22`, color: item.color }}>{item.symbol}</span>
                      {item.positive ? <TrendingUp size={14} className="text-[var(--olive)]" /> : <TrendingDown size={14} className="text-[#b86746]" />}
                    </div>
                    <p className="mt-4 text-xs text-[var(--muted-foreground)]" data-testid={`text-indicator-name-${item.id}`}>{item[language]}</p>
                    <p className="number mt-1 text-base text-[var(--ink)]" dir="ltr" data-testid={`text-indicator-value-${item.id}`}>{item.value}</p>
                    <p className={`mt-1 text-xs font-medium ${item.positive ? 'text-[var(--olive)]' : 'text-[#b86746]'}`}>{item.change}</p>
                  </button>
                ))}
              </div>
            </section>

            <section className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_.6fr]">
              <article className="surface rounded-[1.35rem] p-5 sm:p-6" data-testid="card-market-trend">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-display text-xl font-semibold tracking-[-.06em] text-[var(--ink)]">{t.trend}</h2>
                      <span className="rounded-full bg-[var(--leaf)] px-2 py-1 text-[10px] font-semibold text-[var(--olive-deep)]" data-testid="text-selected-indicator">{selectedIndicator[language]}</span>
                    </div>
                    <p className="mt-1 text-xs text-[var(--muted-foreground)]">{t.trendNote}</p>
                  </div>
                  <div className="flex rounded-lg bg-[var(--leaf-pale)] p-1">
                    {(['1M', '3M', '6M'] as Range[]).map((item) => (
                      <button type="button" key={item} onClick={() => setRange(item)} className={`rounded-md px-3 py-1.5 text-[11px] font-medium transition ${range === item ? 'bg-[var(--paper)] text-[var(--olive-deep)] shadow-sm' : 'text-[var(--muted-foreground)] hover:text-[var(--olive-deep)]'}`} data-testid={`button-range-${item}`} aria-pressed={range === item}>{item === '1M' ? t.month1 : item === '3M' ? t.months3 : t.months6}</button>
                    ))}
                  </div>
                </div>
                <div className="mt-7 h-[230px] w-full" data-testid="chart-market-trend">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: isArabic ? 5 : 18, left: isArabic ? 18 : 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={selectedIndicator.color} stopOpacity={.24} />
                          <stop offset="100%" stopColor={selectedIndicator.color} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#e4e9d8" strokeDasharray="3 5" vertical={false} />
                      <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#879077', fontSize: 10 }} dy={8} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#879077', fontSize: 10 }} width={30} domain={['dataMin - 4', 'dataMax + 4']} />
                      <Tooltip cursor={{ stroke: '#bdcaa4', strokeDasharray: '3 3' }} contentStyle={{ borderRadius: 12, border: '1px solid #dfe6ce', background: '#fbfaf4', fontSize: 11, direction: isArabic ? 'rtl' : 'ltr' }} formatter={(value: number) => [`${value.toFixed(1)}`, isArabic ? 'القيمة' : 'Value']} />
                      <Area type="monotone" dataKey="value" stroke={selectedIndicator.color} strokeWidth={2.5} fill="url(#trendFill)" activeDot={{ r: 5, fill: selectedIndicator.color, stroke: '#fbfaf4', strokeWidth: 3 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </article>
              <article className="surface flex flex-col rounded-[1.35rem] p-5 sm:p-6" data-testid="card-selected-indicator">
                <p className="text-xs text-[var(--muted-foreground)]">{isArabic ? 'المؤشر المختار' : 'Selected indicator'}</p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-semibold" style={{ backgroundColor: `${selectedIndicator.color}22`, color: selectedIndicator.color }}>{selectedIndicator.symbol}</span>
                  <div>
                    <p className="font-display text-base font-semibold text-[var(--ink)]" data-testid="text-selected-indicator-name">{selectedIndicator[language]}</p>
                    <p className="number mt-1 text-xl text-[var(--ink)]" dir="ltr" data-testid="text-selected-indicator-value">{selectedIndicator.value}</p>
                  </div>
                </div>
                <div className="mt-8 border-t border-[var(--line)] pt-5">
                  <p className="text-xs leading-6 text-[var(--muted-foreground)]">{isArabic ? 'اضغط على أي بطاقة لمتابعة المؤشر عبر الرسم البياني.' : 'Select any card above to follow its movement in the chart.'}</p>
                  <div className="mt-5 flex items-center justify-between text-xs">
                    <span className="text-[var(--muted-foreground)]">{isArabic ? 'التغير اليومي' : 'Daily change'}</span>
                    <span className={selectedIndicator.positive ? 'text-[var(--olive)]' : 'text-[#b86746]'}>{selectedIndicator.change}</span>
                  </div>
                </div>
                <div className="mt-auto pt-8 text-[10px] text-[var(--muted-foreground)]">{isArabic ? 'المصدر: بيانات تجريبية مستوحاة من OpenBB' : 'Source: demo data inspired by OpenBB'}</div>
              </article>
            </section>

            <section className="mt-10 pb-12" data-testid="section-investments">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl font-semibold tracking-[-.06em] text-[var(--ink)] sm:text-2xl">{t.explore}</h2>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">{t.exploreNote}</p>
                </div>
                <button type="button" onClick={() => window.alert(isArabic ? 'المقارنة التفصيلية ستتوفر في الخطوة القادمة.' : 'Detailed comparison is coming in the next step.')} className="hidden text-xs font-semibold text-[var(--olive)] underline decoration-[var(--gold)] underline-offset-4 sm:block" data-testid="button-view-all-options">{isArabic ? 'عرض الكل' : 'View all'}</button>
              </div>
              <div className="grid gap-3 xl:grid-cols-3">
                {investments.map((option) => (
                  <article key={option.id} className={`surface soft-hover relative rounded-[1.35rem] p-5 ${option.badge ? 'border-2 border-[var(--olive)]' : ''}`} data-testid={`card-investment-${option.id}`}>
                    {option.badge && <span className="absolute -top-3 end-4 rounded-full bg-[var(--gold)] px-3 py-1 text-[10px] font-semibold text-[var(--ink)]" data-testid={`badge-best-fit-${option.id}`}>{t.suitable}</span>}
                    <div className="flex items-start justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl text-xs font-semibold" style={{ backgroundColor: `${option.color}1b`, color: option.color }}>{option.id === 'balanced' ? 'B' : option.id === 'sukuk' ? 'S' : 'G'}</span>
                      <div className="text-end">
                        <p className="number text-2xl text-[var(--ink)]" data-testid={`text-fit-${option.id}`}>{option.fit}<span className="text-sm text-[var(--muted-foreground)]">%</span></p>
                        <p className="text-[10px] text-[var(--muted-foreground)]">{t.fit}</p>
                      </div>
                    </div>
                    <h3 className="mt-5 font-display text-base font-semibold text-[var(--ink)]" data-testid={`text-investment-name-${option.id}`}>{option[language]}</h3>
                    <div className="mt-2 flex items-center gap-2 text-xs text-[var(--muted-foreground)]"><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: option.color }} />{isArabic ? option.riskAr : option.riskEn}</div>
                    <p className="mt-4 min-h-[48px] text-xs leading-6 text-[var(--muted-foreground)]">{isArabic ? option.rationaleAr : option.rationaleEn}</p>
                    <button type="button" onClick={() => window.alert(isArabic ? `اخترت ${option.ar}. هذا عرض توضيحي فقط.` : `You selected ${option.en}. This is illustrative only.`)} className="mt-5 flex items-center gap-2 text-xs font-semibold text-[var(--olive)] underline decoration-[var(--gold)] underline-offset-4" data-testid={`button-learn-${option.id}`}>{t.learn}<ArrowLeft size={14} /></button>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}