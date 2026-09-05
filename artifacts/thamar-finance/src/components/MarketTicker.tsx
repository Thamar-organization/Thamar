import { getGetMarketQuotesQueryKey, useGetMarketQuotes } from '@workspace/api-client-react';
import { ArrowDown, ArrowUp, Radio } from 'lucide-react';
import { Link } from 'wouter';

import type { Language } from '@/data/mock-finance';

const symbols: Record<string, string> = {
  gold: 'Au',
  equities: 'TASI',
  bitcoin: 'BTC',
  oil: 'OIL',
};

function formatPrice(value: number, language: Language) {
  return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
    minimumFractionDigits: value < 100 ? 2 : 0,
    maximumFractionDigits: value < 100 ? 2 : 1,
  }).format(value);
}

function formatChange(value: number, language: Language) {
  const formatted = new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(value));
  return `${value >= 0 ? '+' : '-'}${formatted}%`;
}

function currencyLabel(currency: string, language: Language) {
  if (currency === 'POINTS') return language === 'ar' ? 'نقطة' : 'pts';
  if (currency === 'SAR') return language === 'ar' ? 'ر.س' : 'SAR';
  return currency;
}

export default function MarketTicker({ language }: { language: Language }) {
  const isArabic = language === 'ar';
  const { data, isLoading, isError } = useGetMarketQuotes({
    query: {
      queryKey: getGetMarketQuotesQueryKey(),
      refetchInterval: 60_000,
      staleTime: 30_000,
      retry: 2,
    },
  });

  const quotes = data?.quotes ?? [];
  const unavailable = isError || data?.status === 'unavailable';

  return (
    <section className="mt-8 w-full max-w-5xl" aria-label={isArabic ? 'أسعار السوق الحالية' : 'Current market prices'} data-testid="section-live-market-ticker">
      <div className="mb-3 flex items-center justify-between gap-3 px-1 text-[10px] text-[var(--muted-foreground)]">
        <span className="flex items-center gap-2 font-semibold text-[var(--olive-deep)]">
          <Radio size={13} className={unavailable ? 'text-[#b86746]' : 'text-[var(--gold)]'} />
          {isArabic ? 'حركة السوق' : 'Market movement'}
        </span>
        {data?.updatedAt && (
          <span>
            {isArabic ? 'آخر تحديث' : 'Updated'}{' '}
            {new Intl.DateTimeFormat(isArabic ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' }).format(new Date(data.updatedAt))}
          </span>
        )}
      </div>

      <div className="market-ticker overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--paper)] shadow-[0_12px_35px_rgba(72,82,43,.08)]">
        {isLoading ? (
          <p className="px-5 py-5 text-center text-xs text-[var(--muted-foreground)]">{isArabic ? 'جاري تحديث الأسعار...' : 'Updating prices...'}</p>
        ) : unavailable || quotes.length === 0 ? (
          <p className="px-5 py-5 text-center text-xs text-[#a45f45]">{isArabic ? 'تعذر تحميل الأسعار الحية حاليًا.' : 'Live prices are currently unavailable.'}</p>
        ) : (
          <div className="market-ticker-track flex w-max items-stretch" dir="ltr">
            {[...quotes, ...quotes].map((quote, index) => {
              const positive = quote.changePercent >= 0;
              return (
                <Link
                  key={`${quote.id}-${index}`}
                  href="/invest-today"
                  className="flex min-w-[245px] items-center gap-3 border-e border-[var(--line)] px-5 py-4 transition hover:bg-[var(--leaf-pale)]"
                  data-testid={index < quotes.length ? `link-live-quote-${quote.id}` : undefined}
                  aria-hidden={index >= quotes.length ? true : undefined}
                  tabIndex={index >= quotes.length ? -1 : undefined}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--leaf-pale)] text-[10px] font-bold text-[var(--olive-deep)]">{symbols[quote.id]}</span>
                  <span className="min-w-0 flex-1" dir={isArabic ? 'rtl' : 'ltr'}>
                    <span className="block truncate text-xs font-semibold text-[var(--ink)]">{isArabic ? quote.nameAr : quote.nameEn}</span>
                    <span className="number mt-1 block text-sm text-[var(--ink)]" dir="ltr">
                      {formatPrice(quote.price, language)} <span className="text-[9px] text-[var(--muted-foreground)]">{currencyLabel(quote.currency, language)}</span>
                    </span>
                  </span>
                  <span className={`flex items-center gap-1 text-[10px] font-semibold ${positive ? 'text-[var(--olive)]' : 'text-[#b86746]'}`}>
                    {positive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                    <span dir="ltr">{formatChange(quote.changePercent, language)}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}