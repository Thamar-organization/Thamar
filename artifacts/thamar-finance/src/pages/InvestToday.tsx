import { useMemo, useState } from 'react';
import { getGetMarketQuotesQueryKey, useGetMarketQuotes } from '@workspace/api-client-react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Bot, MessageCircle } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Link } from 'wouter';

import ThamarHeader from '@/components/ThamarHeader';
import { marketIndicators, type Language } from '@/data/mock-finance';
import useLanguagePreference from '@/hooks/use-language';

const assetIds = ['gold', 'equities', 'bitcoin', 'oil'] as const;

const assetRisk = {
  gold: { ar: 'منخفض', en: 'Low' },
  equities: { ar: 'متوسط', en: 'Moderate' },
  bitcoin: { ar: 'مرتفع', en: 'High' },
  oil: { ar: 'متوسط', en: 'Moderate' },
};

const copy = {
  ar: {
    title: 'مؤشرات الاقتصاد العالمي',
    market: 'حركة الأصول',
    risk: 'الخطورة',
    advisor: 'اسأل مساعد ثَمَر',
    placeholder: 'مثال: كيف أوازن بين الذهب والأسهم؟',
    ask: 'اسأل ثَمَر',
    trend: 'حركة الأصل المختار',
    viewPortfolio: 'شاهد محفظتك المستقبلية',
    askReady: 'اسأل عن حركة الأصل أو مستوى المخاطر.',
    loading: 'جاري تحديث الأسعار...',
    unavailable: 'تعذر تحميل السعر الحي حاليًا',
    updated: 'آخر تحديث',
    connected: 'متصل بالسوق',
  },
  en: {
    title: 'Global economy indicators',
    market: 'Asset movement',
    risk: 'Risk',
    advisor: 'Ask Thamar',
    placeholder: 'Example: how do I balance gold and equities?',
    ask: 'Ask Thamar',
    trend: 'Selected asset movement',
    viewPortfolio: 'View your future portfolio',
    askReady: 'Ask about asset movement or risk level.',
    loading: 'Updating prices...',
    unavailable: 'Live price is currently unavailable',
    updated: 'Last updated',
    connected: 'Market connected',
  },
};

function localeFor(language: Language) {
  return language === 'ar' ? 'ar-SA' : 'en-US';
}

function formatPrice(value: number, language: Language) {
  return new Intl.NumberFormat(localeFor(language), {
    minimumFractionDigits: value < 100 ? 2 : 0,
    maximumFractionDigits: value < 100 ? 2 : 1,
  }).format(value);
}

function formatChange(value: number, language: Language) {
  const number = new Intl.NumberFormat(localeFor(language), {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(value));
  return `${value >= 0 ? '+' : '-'}${number}%`;
}

function currencyLabel(currency: string, language: Language) {
  if (currency === 'POINTS') return language === 'ar' ? 'نقطة' : 'pts';
  if (currency === 'SAR') return language === 'ar' ? 'ر.س' : 'SAR';
  return currency;
}

export default function InvestToday() {
  const [language, setLanguage] = useLanguagePreference();
  const [activeId, setActiveId] = useState<(typeof assetIds)[number]>('gold');
  const [question, setQuestion] = useState('');
  const [asked, setAsked] = useState(false);
  const isArabic = language === 'ar';
  const t = copy[language];
  const { data, isLoading } = useGetMarketQuotes({
    query: {
      queryKey: getGetMarketQuotesQueryKey(),
      refetchInterval: 60_000,
      staleTime: 30_000,
      retry: 2,
    },
  });

  const quoteById = useMemo(() => new Map((data?.quotes ?? []).map((quote) => [quote.id, quote])), [data?.quotes]);
  const active = useMemo(() => marketIndicators.find((item) => item.id === activeId) ?? marketIndicators[0], [activeId]);
  const activeQuote = quoteById.get(activeId);
  const chartData = useMemo(() => (activeQuote?.history ?? []).slice(-48).map((point) => ({
    label: new Intl.DateTimeFormat(localeFor(language), { hour: '2-digit', minute: '2-digit' }).format(new Date(point.time)),
    value: point.price,
  })), [activeQuote?.history, language]);

  const advisorAnswer = activeQuote
    ? isArabic
      ? `سجّل ${active[language]} تغيرًا قدره ${formatChange(activeQuote.changePercent, language)}، ووصلت آخر قراءة إلى ${formatPrice(activeQuote.price, language)} ${currencyLabel(activeQuote.currency, language)}. قارن الحركة بمدة الاستثمار ومستوى المخاطر قبل تعديل التوزيع.`
      : `${active[language]} moved ${formatChange(activeQuote.changePercent, language)}, with the latest reading at ${formatPrice(activeQuote.price, language)} ${currencyLabel(activeQuote.currency, language)}. Compare the move with your time horizon and risk level before changing allocation.`
    : t.unavailable;

  return (
    <main className={`app-shell grain page-enter ${isArabic ? 'rtl' : 'ltr'}`} lang={language}>
      <div className="relative min-h-[100dvh] overflow-hidden px-4 py-4 sm:px-8 sm:py-8">
        <img className="watermark-logo" src={`${import.meta.env.BASE_URL}thamar-brand-transparent.png`} alt="" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-[1240px]">
          <ThamarHeader language={language} active="today" onLanguageToggle={() => setLanguage(isArabic ? 'en' : 'ar')} />

          <section className="mt-10 flex flex-col justify-between gap-4 sm:mt-14 md:flex-row md:items-end">
            <h1 className="font-display text-3xl font-semibold tracking-[-.08em] text-[var(--ink)] sm:text-[2.6rem]" data-testid="heading-invest-today">{t.title}</h1>
            <div className="flex items-center gap-2 self-start rounded-full border border-[#d7e3bd] bg-[#f0f6e6] px-3 py-2 text-[11px] text-[var(--olive-deep)] md:self-auto">
              <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
              {isLoading ? t.loading : t.connected}
            </div>
          </section>

          <section className="mt-7 grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
            <article className="surface rounded-2xl p-5 sm:p-6" data-testid="card-market-assets">
              <h2 className="mb-5 font-display text-xl font-semibold tracking-[-.06em] text-[var(--ink)]">{t.market}</h2>
              <div className="space-y-2">
                {assetIds.map((id) => {
                  const item = marketIndicators.find((indicator) => indicator.id === id)!;
                  const quote = quoteById.get(id);
                  const positive = (quote?.changePercent ?? 0) >= 0;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setActiveId(id);
                        setAsked(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-start transition ${activeId === id ? 'border-[var(--olive)] bg-[var(--leaf-pale)] shadow-sm' : 'border-transparent bg-[#fbfaf4] hover:border-[var(--line)]'}`}
                      data-testid={`button-asset-${id}`}
                      aria-pressed={activeId === id}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[10px] font-semibold" style={{ backgroundColor: `${item.color}22`, color: item.color }}>{item.symbol}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold text-[var(--ink)]">{item[language]}</span>
                        <span className="mt-1 block text-[10px] text-[var(--muted-foreground)]">{t.risk}: {assetRisk[id][language]}</span>
                      </span>
                      {quote ? (
                        <span className="text-end">
                          <span className="number block text-sm font-semibold text-[var(--ink)]" dir="ltr">{formatPrice(quote.price, language)}</span>
                          <span className={`mt-1 flex items-center justify-end gap-1 text-[10px] font-semibold ${positive ? 'text-[var(--olive)]' : 'text-[#b86746]'}`}>
                            {positive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                            <span dir="ltr">{formatChange(quote.changePercent, language)}</span>
                          </span>
                        </span>
                      ) : (
                        <span className="text-[10px] text-[var(--muted-foreground)]">{isLoading ? t.loading : t.unavailable}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </article>

            <article className="relative overflow-hidden rounded-2xl bg-[var(--olive)] p-5 text-[var(--paper)] sm:p-6" data-testid="card-investment-advisor">
              <div className="absolute -bottom-16 -end-12 text-[150px] font-display leading-none text-white/[.04]" aria-hidden="true">ثَمَر</div>
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-[var(--gold-soft)]"><Bot size={20} /></div>
                <h2 className="mt-7 font-display text-xl font-semibold tracking-[-.06em]">{t.advisor}</h2>
                <textarea value={question} onChange={(event) => setQuestion(event.target.value)} rows={3} placeholder={t.placeholder} className="mt-5 w-full resize-none rounded-xl border border-white/15 bg-white/10 p-3 text-xs leading-6 text-white outline-none placeholder:text-[#d4ddc0] focus:border-[var(--gold-soft)]" data-testid="input-advisor-question" />
                <button type="button" onClick={() => setAsked(true)} className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[var(--gold-soft)] px-4 py-3 text-xs font-semibold text-[var(--ink)] transition hover:bg-[#fff0b7]" data-testid="button-ask-advisor">
                  <MessageCircle size={15} />{t.ask}
                </button>
                {asked && (
                  <div className="mt-4 rounded-xl bg-white/10 p-3 text-xs leading-6 text-[#f4f6e9]" data-testid="text-advisor-answer">
                    <span className="mb-1 block font-semibold text-[var(--gold-soft)]">{question.trim() ? question : t.askReady}</span>
                    {advisorAnswer}
                  </div>
                )}
              </div>
            </article>
          </section>

          <section className="surface mt-4 rounded-2xl p-5 sm:p-6" data-testid="card-selected-asset-trend">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-semibold" style={{ backgroundColor: `${active.color}22`, color: active.color }}>{active.symbol}</span>
                <div>
                  <h2 className="font-display text-lg font-semibold tracking-[-.06em] text-[var(--ink)]">{t.trend}: {active[language]}</h2>
                  {activeQuote && <p className="mt-1 text-[10px] text-[var(--muted-foreground)]">{t.updated}: {new Intl.DateTimeFormat(localeFor(language), { hour: '2-digit', minute: '2-digit' }).format(new Date(activeQuote.marketTime))}</p>}
                </div>
              </div>
              {activeQuote && (
                <div className="text-end">
                  <p className="number text-xl text-[var(--ink)]" dir="ltr">{formatPrice(activeQuote.price, language)} <span className="text-[9px] text-[var(--muted-foreground)]">{currencyLabel(activeQuote.currency, language)}</span></p>
                  <p className={`mt-1 text-xs font-semibold ${activeQuote.changePercent >= 0 ? 'text-[var(--olive)]' : 'text-[#b86746]'}`} dir="ltr">{formatChange(activeQuote.changePercent, language)}</p>
                </div>
              )}
            </div>

            <div className="mt-5 h-[190px] w-full">
              {chartData.length > 1 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 6, right: 6, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="todayTrendFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={active.color} stopOpacity={0.25} />
                        <stop offset="100%" stopColor={active.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="label" axisLine={false} tickLine={false} minTickGap={40} tick={{ fill: '#879077', fontSize: 10 }} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #dfe6ce', background: '#fbfaf4', fontSize: 11 }} formatter={(value: number) => [formatPrice(value, language), isArabic ? 'السعر' : 'Price']} />
                    <Area type="monotone" dataKey="value" stroke={active.color} strokeWidth={2.5} fill="url(#todayTrendFill)" activeDot={{ r: 5, fill: active.color, stroke: '#fbfaf4', strokeWidth: 3 }} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-[var(--muted-foreground)]">{isLoading ? t.loading : t.unavailable}</div>
              )}
            </div>

            <div className="mt-2 flex justify-end border-t border-[var(--line)] pt-4 text-xs">
              <Link href="/portfolio" className="inline-flex items-center gap-2 font-semibold text-[var(--olive)] underline decoration-[var(--gold)] underline-offset-4" data-testid="link-today-to-portfolio">{t.viewPortfolio}{isArabic ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}</Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}