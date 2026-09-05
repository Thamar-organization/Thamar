import { useMemo, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Bot, CircleHelp, Info, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Link } from 'wouter';

import ThamarHeader from '@/components/ThamarHeader';
import { marketIndicators, trendData, type Language } from '@/data/mock-finance';
import useLanguagePreference from '@/hooks/use-language';

const assetIds = ['gold', 'equities', 'bitcoin', 'diamond', 'oil'] as const;

const assetPlans = {
  gold: { returnAr: '+8.4%', returnEn: '+8.4%', riskAr: 'منخفض', riskEn: 'Low', impactAr: 'يدعم حماية المحفظة عند ارتفاع التضخم.', impactEn: 'Can help protect the portfolio when inflation rises.' },
  equities: { returnAr: '+12.1%', returnEn: '+12.1%', riskAr: 'متوسط', riskEn: 'Moderate', impactAr: 'يستفيد من النمو، لكنه يتأثر بتغير الفائدة.', impactEn: 'Benefits from growth, but reacts to rate changes.' },
  bitcoin: { returnAr: '+18.6%', returnEn: '+18.6%', riskAr: 'مرتفع', riskEn: 'High', impactAr: 'تذبذب مرتفع؛ يناسب نسبة صغيرة ومدة أطول فقط.', impactEn: 'High volatility; better kept small and long-term.' },
  diamond: { returnAr: '+5.1%', returnEn: '+5.1%', riskAr: 'منخفض', riskEn: 'Low', impactAr: 'تنويع بديل، مع سيولة أقل من الأصول المتداولة.', impactEn: 'An alternative diversifier with lower liquidity.' },
  oil: { returnAr: '+6.7%', returnEn: '+6.7%', riskAr: 'متوسط', riskEn: 'Moderate', impactAr: 'يتأثر بالطلب العالمي والأحداث الجيوسياسية.', impactEn: 'Sensitive to global demand and geopolitics.' },
};

const copy = {
  ar: {
    eyebrow: 'ثَمَر · قراءة اليوم',
    title: 'مؤشرات الاقتصاد العالمي اليوم',
    intro: 'نقرأ حركة السوق بهدوء، ونربطها بخططك الاستثمارية دون وعود أو تنبؤات مؤكدة.',
    demo: 'بيانات توضيحية — ليست توصية مالية',
    market: 'حركة الأصول اليوم',
    marketNote: 'اضغط على أي أصل لمعرفة أثره على خطتك',
    return: 'العائد المتوقع',
    risk: 'الخطورة',
    impact: 'التأثير على خطتك',
    economy: 'مؤشرات الاقتصاد العالمي',
    advisor: 'اسأل مساعد ثَمَر',
    advisorNote: 'مساعد تجريبي يعتمد على الأرقام التوضيحية الحالية.',
    placeholder: 'مثال: كيف أوازن بين الذهب والأسهم؟',
    ask: 'اسأل ثَمَر',
    thinking: 'يفكر في بيانات التجربة...',
    answer: 'من واقع أرقامك التوضيحية، يبدو أن المحفظة المتوازنة هي الأقرب للاستدامة. ابدأ بنسبة صغيرة في الأصل الذي اخترته، واحتفظ بسيولة للطوارئ. هذه إضاءة عامة وليست توصية شخصية.',
    safe: 'الأكثر أماناً',
    safeText: 'الصكوك والادخار النقدي أقل تذبذباً عادةً، لكن لا يوجد استثمار بلا مخاطر.',
    disclaimer: 'هذا المساعد تعليمي فقط. لا يقدم توصيات استثمارية أو ضماناً للربح.',
    trend: 'اتجاه الأصل المختار',
    viewPortfolio: 'شاهد محفظتك المستقبلية',
    macroNote: 'قراءة تجريبية مختصرة',
    askReady: 'اسأل عن توزيع المخاطر أو تأثير مؤشر اقتصادي.',
  },
  en: {
    eyebrow: 'THAMAR · TODAY’S READ',
    title: 'Global economy today',
    intro: 'A calm read of market movement and how it may relate to your plans, without promises or certainty.',
    demo: 'Illustrative data — not financial advice',
    market: 'Asset movement today',
    marketNote: 'Select any asset to see its plan impact',
    return: 'Expected return',
    risk: 'Risk',
    impact: 'Impact on your plan',
    economy: 'Global economy indicators',
    advisor: 'Ask Thamar',
    advisorNote: 'A demo assistant using the current illustrative numbers.',
    placeholder: 'Example: how do I balance gold and equities?',
    ask: 'Ask Thamar',
    thinking: 'Thinking through demo data...',
    answer: 'Based on your illustrative numbers, a balanced portfolio appears closest to a sustainable path. Keep any new exposure small and retain emergency liquidity. This is general education, not personal advice.',
    safe: 'Lower volatility',
    safeText: 'Sukuk and cash savings are typically steadier, but no investment is risk-free.',
    disclaimer: 'This assistant is educational only. It does not provide investment advice or guarantee returns.',
    trend: 'Selected asset trend',
    viewPortfolio: 'View your future portfolio',
    macroNote: 'Short illustrative read',
    askReady: 'Ask about risk allocation or an economic indicator.',
  },
};

export default function InvestToday() {
  const [language, setLanguage] = useLanguagePreference();
  const [activeId, setActiveId] = useState<(typeof assetIds)[number]>('gold');
  const [question, setQuestion] = useState('');
  const [asked, setAsked] = useState(false);
  const isArabic = language === 'ar';
  const t = copy[language];
  const active = useMemo(() => marketIndicators.find((item) => item.id === activeId) ?? marketIndicators[0], [activeId]);
  const plan = assetPlans[activeId];
  const macroIndicators = marketIndicators.filter((item) => item.id === 'inflation' || item.id === 'rate');

  return (
    <main className={`app-shell grain page-enter ${isArabic ? 'rtl' : 'ltr'}`} lang={language}>
      <div className="relative min-h-[100dvh] overflow-hidden px-4 py-4 sm:px-8 sm:py-8">
        <img className="watermark-logo" src={`${import.meta.env.BASE_URL}thamar-brand.png`} alt="" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-[1240px]">
          <ThamarHeader language={language} active="today" onLanguageToggle={() => setLanguage(isArabic ? 'en' : 'ar')} />

          <section className="mt-10 flex flex-col justify-between gap-5 sm:mt-14 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.18em] text-[var(--olive)]">{t.eyebrow}</p>
              <h1 className="font-display text-3xl font-semibold tracking-[-.08em] text-[var(--ink)] sm:text-[2.6rem]" data-testid="heading-invest-today">{t.title}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted-foreground)]" data-testid="text-invest-today-intro">{t.intro}</p>
            </div>
            <div className="flex items-center gap-2 self-start rounded-full border border-[#d7e3bd] bg-[#f0f6e6] px-3 py-2 text-[11px] text-[var(--olive-deep)] md:self-auto" data-testid="status-market-demo">
              <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />{t.demo}
            </div>
          </section>

          <section className="mt-7 grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
            <article className="surface rounded-2xl p-5 sm:p-6" data-testid="card-market-assets">
              <div className="mb-5">
                <h2 className="font-display text-xl font-semibold tracking-[-.06em] text-[var(--ink)]">{t.market}</h2>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">{t.marketNote}</p>
              </div>
              <div className="space-y-2">
                {assetIds.map((id) => {
                  const item = marketIndicators.find((indicator) => indicator.id === id)!;
                  const itemPlan = assetPlans[id];
                  const selected = activeId === id;
                  return (
                    <button key={id} type="button" onClick={() => setActiveId(id)} className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-start transition ${selected ? 'border-[var(--olive)] bg-[var(--leaf-pale)] shadow-sm' : 'border-transparent bg-[#fbfaf4] hover:border-[var(--line)]'}`} data-testid={`button-asset-${id}`} aria-pressed={selected}>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[10px] font-semibold" style={{ backgroundColor: `${item.color}22`, color: item.color }}>{item.symbol}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold text-[var(--ink)]">{item[language]}</span>
                        <span className="mt-1 block text-[10px] text-[var(--muted-foreground)]">{t.impact}: {isArabic ? itemPlan.impactAr : itemPlan.impactEn}</span>
                      </span>
                      <span className="hidden text-end sm:block">
                        <span className="block text-[10px] text-[var(--muted-foreground)]">{t.return}</span>
                        <span className="number text-xs text-[var(--olive)]">{isArabic ? itemPlan.returnAr : itemPlan.returnEn}</span>
                      </span>
                      <span className="text-end">
                        <span className={`flex items-center justify-end gap-1 text-xs font-semibold ${item.positive ? 'text-[var(--olive)]' : 'text-[#b86746]'}`}>
                          {item.positive ? <ArrowUp size={13} /> : <ArrowDown size={13} />}{item.change}
                        </span>
                        <span className="mt-1 block text-[10px] text-[var(--muted-foreground)]">{t.risk}: {isArabic ? itemPlan.riskAr : itemPlan.riskEn}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </article>

            <article className="relative overflow-hidden rounded-2xl bg-[var(--olive)] p-5 text-[var(--paper)] sm:p-6" data-testid="card-investment-advisor">
              <div className="absolute -bottom-16 -end-12 text-[150px] font-display leading-none text-white/[.04]" aria-hidden="true">ثَمَر</div>
              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-[var(--gold-soft)]"><Bot size={20} /></span>
                  <span className="font-mono text-[9px] tracking-[.16em] text-[var(--gold-soft)]">THAMAR AI</span>
                </div>
                <h2 className="mt-7 font-display text-xl font-semibold tracking-[-.06em]">{t.advisor}</h2>
                <p className="mt-2 text-xs leading-6 text-[#e5edcf]">{t.advisorNote}</p>
                <textarea value={question} onChange={(event) => setQuestion(event.target.value)} rows={3} placeholder={t.placeholder} className="mt-5 w-full resize-none rounded-xl border border-white/15 bg-white/10 p-3 text-xs leading-6 text-white outline-none placeholder:text-[#d4ddc0] focus:border-[var(--gold-soft)]" data-testid="input-advisor-question" />
                <button type="button" onClick={() => setAsked(true)} className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[var(--gold-soft)] px-4 py-3 text-xs font-semibold text-[var(--ink)] transition hover:bg-[#fff0b7]" data-testid="button-ask-advisor">
                  <MessageCircle size={15} />{t.ask}
                </button>
                {asked ? (
                  <div className="mt-4 rounded-xl bg-white/10 p-3 text-xs leading-6 text-[#f4f6e9]" data-testid="text-advisor-answer">
                    <span className="mb-1 block font-semibold text-[var(--gold-soft)]">{question.trim() ? question : t.askReady}</span>
                    {t.answer}
                  </div>
                ) : (
                  <p className="mt-4 flex items-start gap-2 text-[10px] leading-5 text-[#d4ddc0]" data-testid="text-advisor-disclaimer"><Info size={14} className="mt-0.5 shrink-0" />{t.disclaimer}</p>
                )}
              </div>
            </article>
          </section>

          <section className="mt-4 grid gap-4 lg:grid-cols-[.7fr_1.3fr]">
            <article className="surface rounded-2xl p-5 sm:p-6" data-testid="card-economy-indicators">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-semibold tracking-[-.06em] text-[var(--ink)]">{t.economy}</h2>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">{t.macroNote}</p>
                </div>
                <CircleHelp size={17} className="text-[var(--muted-foreground)]" />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {macroIndicators.map((item) => (
                  <div key={item.id} className="rounded-xl bg-[var(--leaf-pale)] p-4" data-testid={`card-macro-${item.id}`}>
                    <p className="text-[10px] text-[var(--muted-foreground)]">{item[language]}</p>
                    <p className="number mt-2 text-lg text-[var(--ink)]" dir="ltr">{item.value}</p>
                    <p className={`mt-2 text-[10px] font-semibold ${item.positive ? 'text-[var(--olive)]' : 'text-[#b86746]'}`}>{item.change}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-start gap-2 border-t border-[var(--line)] pt-4 text-xs leading-6 text-[var(--muted-foreground)]"><ShieldCheck size={16} className="mt-1 shrink-0 text-[var(--olive)]" />{t.safeText}</div>
            </article>

            <article className="surface rounded-2xl p-5 sm:p-6" data-testid="card-selected-asset-trend">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-semibold" style={{ backgroundColor: `${active.color}22`, color: active.color }}>{active.symbol}</span>
                    <div>
                      <h2 className="font-display text-lg font-semibold tracking-[-.06em] text-[var(--ink)]">{t.trend}: {active[language]}</h2>
                      <p className="mt-1 text-xs text-[var(--muted-foreground)]">{isArabic ? plan.impactAr : plan.impactEn}</p>
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <p className="number text-xl text-[var(--ink)]" dir="ltr">{active.value}</p>
                  <p className={`mt-1 text-xs font-semibold ${active.positive ? 'text-[var(--olive)]' : 'text-[#b86746]'}`}>{active.change}</p>
                </div>
              </div>
              <div className="mt-5 h-[170px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData['3M']} margin={{ top: 6, right: 6, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="todayTrendFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={active.color} stopOpacity={0.25} />
                        <stop offset="100%" stopColor={active.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#879077', fontSize: 10 }} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #dfe6ce', background: '#fbfaf4', fontSize: 11 }} formatter={(value: number) => [`${value.toFixed(1)}`, isArabic ? 'القيمة' : 'Value']} />
                    <Area type="monotone" dataKey="value" stroke={active.color} strokeWidth={2.5} fill="url(#todayTrendFill)" activeDot={{ r: 5, fill: active.color, stroke: '#fbfaf4', strokeWidth: 3 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-4 text-xs">
                <span className="flex items-center gap-2 text-[var(--muted-foreground)]"><Sparkles size={14} className="text-[var(--gold)]" />{t.disclaimer}</span>
                <Link href="/portfolio" className="inline-flex items-center gap-2 font-semibold text-[var(--olive)] underline decoration-[var(--gold)] underline-offset-4" data-testid="link-today-to-portfolio">{t.viewPortfolio}{isArabic ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link>
              </div>
            </article>
          </section>
          <p className="pb-6 pt-4 text-center text-[10px] text-[var(--muted-foreground)]" data-testid="text-market-footnote">OpenBB-inspired demo indicators · {t.demo}</p>
        </div>
      </div>
    </main>
  );
}