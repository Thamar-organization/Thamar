import { TrendingUp, TrendingDown, Book, ArrowRightLeft, Target, Coins, Shield, Layers, Scale, Percent, Zap } from 'lucide-react';
import type { Language } from '@/data/mock-finance';
import type { InfographicId } from '@/data/mock-insights';

export default function Infographic({ id, language }: { id: InfographicId, language: Language }) {
  const isArabic = language === 'ar';

  if (id === 'term-cards') {
    const terms = [
      {
        icon: Book,
        titleAr: 'السهم (Stock)',
        titleEn: 'Stock (Equity)',
        descAr: 'حصة ملكية في شركة. شراء سهم يجعلك شريكاً بنسبة من الشركة.',
        descEn: 'A share of ownership in a company. Buying a stock makes you a part-owner.'
      },
      {
        icon: Layers,
        titleAr: 'المؤشر (Index)',
        titleEn: 'Market Index',
        descAr: 'مقياس يتابع أداء مجموعة من الشركات (مثل مؤشر تاسي) ليعكس حالة السوق ككل.',
        descEn: 'A measure tracking a group of companies (like TASI) to reflect overall market health.'
      },
      {
        icon: Coins,
        titleAr: 'القيمة السوقية (Market Cap)',
        titleEn: 'Market Cap',
        descAr: 'حجم الشركة. تُحسب بضرب عدد أسهم الشركة في سعر السهم الواحد.',
        descEn: 'The size of a company. Calculated by multiplying total shares by the stock price.'
      },
      {
        icon: Zap,
        titleAr: 'السيولة (Liquidity)',
        titleEn: 'Liquidity',
        descAr: 'مدى سهولة وسرعة بيع وشراء أصل ما دون التأثير بشكل كبير على سعره.',
        descEn: 'How easily and quickly an asset can be bought or sold without affecting its price.'
      },
      {
        icon: TrendingUp,
        titleAr: 'التقلب (Volatility)',
        titleEn: 'Volatility',
        descAr: 'مدى سرعة وحجم تغير سعر الأصل صعوداً وهبوطاً. التقلب العالي يعني مخاطرة أعلى.',
        descEn: 'How fast and how much an asset\'s price changes. High volatility means higher risk.'
      },
      {
        icon: Percent,
        titleAr: 'توزيعات الأرباح (Dividend)',
        titleEn: 'Dividend',
        descAr: 'جزء من أرباح الشركة يتم توزيعه على المساهمين نقداً بشكل دوري.',
        descEn: 'A portion of a company\'s profit paid out to shareholders in cash periodically.'
      },
      {
        icon: ArrowRightLeft,
        titleAr: 'سعر الطلب (Bid)',
        titleEn: 'Bid Price',
        descAr: 'أعلى سعر يعرضه مشترٍ حاليًا لشراء السهم أو الأصل.',
        descEn: 'The highest price a buyer currently offers to pay for an asset.'
      },
      {
        icon: ArrowRightLeft,
        titleAr: 'سعر العرض (Ask)',
        titleEn: 'Ask Price',
        descAr: 'أقل سعر يقبل به بائع حاليًا لبيع السهم أو الأصل.',
        descEn: 'The lowest price a seller currently accepts to sell an asset.'
      }
    ];

    return (
      <div 
        className="my-8 grid gap-4 sm:grid-cols-2" 
        role="region" 
        aria-label={isArabic ? 'بطاقات المصطلحات المالية' : 'Financial terms cards'}
        data-testid="infographic-term-cards"
      >
        {terms.map((term, i) => {
          const Icon = term.icon;
          return (
            <div key={i} className="flex gap-4 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--leaf-pale)] text-[var(--olive-deep)]">
                <Icon size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[var(--ink)]">{isArabic ? term.titleAr : term.titleEn}</h4>
                <p className="mt-1 text-sm leading-relaxed text-[var(--muted-foreground)]">{isArabic ? term.descAr : term.descEn}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (id === 'supply-demand') {
    return (
      <div 
        className="my-8 rounded-[2rem] bg-gradient-to-br from-[var(--paper)] to-[var(--leaf-pale)] p-6 shadow-sm border border-[var(--line)] sm:p-8"
        role="region"
        aria-label={isArabic ? 'رسم بياني للعرض والطلب' : 'Supply and Demand diagram'}
        data-testid="infographic-supply-demand"
      >
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-around">
          <div className="flex flex-1 flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--leaf)] text-[var(--olive-deep)] shadow-md">
              <TrendingUp size={32} />
            </div>
            <h4 className="font-bold text-[var(--ink)]">{isArabic ? 'طلب مرتفع' : 'High Demand'}</h4>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              {isArabic ? 'مشترون كثر + بائعون قلة' : 'Many buyers + Few sellers'}
            </p>
            <div className="mt-4 rounded-full bg-[var(--olive)] px-4 py-1.5 text-sm font-bold text-white shadow-sm">
              {isArabic ? 'السعر يرتفع' : 'Price Goes Up'}
            </div>
          </div>
          
          <div className="flex shrink-0 items-center justify-center">
            <Scale size={48} className="text-[var(--gold)] opacity-50" strokeWidth={1} />
          </div>

          <div className="flex flex-1 flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 shadow-md dark:bg-red-900/30 dark:text-red-400">
              <TrendingDown size={32} />
            </div>
            <h4 className="font-bold text-[var(--ink)]">{isArabic ? 'عرض مرتفع' : 'High Supply'}</h4>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              {isArabic ? 'بائعون كثر + مشترون قلة' : 'Many sellers + Few buyers'}
            </p>
            <div className="mt-4 rounded-full bg-red-500 px-4 py-1.5 text-sm font-bold text-white shadow-sm">
              {isArabic ? 'السعر ينخفض' : 'Price Goes Down'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'market-anatomy') {
    return (
      <div 
        className="my-8 overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--paper)] shadow-[0_20px_40px_rgba(72,82,43,0.05)]"
        role="region"
        aria-label={isArabic ? 'تشريح شاشة السوق المالي' : 'Market screen anatomy'}
        data-testid="infographic-market-anatomy"
      >
        <div className="border-b border-[var(--line)] bg-[var(--leaf-pale)]/50 p-6 text-center">
          <h4 className="font-mono text-sm font-bold tracking-widest text-[var(--muted-foreground)] opacity-70">
            {isArabic ? 'مؤشر السوق الرئيسي (TASI)' : 'MAIN MARKET INDEX (TASI)'}
          </h4>
          <div className="mt-2 flex items-center justify-center gap-4">
            <span className="font-display text-4xl font-bold tracking-tight text-[var(--ink)]">12,450.75</span>
            <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
              <TrendingUp size={16} />
              +1.24%
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-[var(--line)] rtl:divide-x-reverse sm:grid-cols-4">
          <div className="p-4 text-center">
            <p className="text-xs text-[var(--muted-foreground)]">{isArabic ? 'الافتتاح' : 'Open'}</p>
            <p className="mt-1 font-mono font-bold text-[var(--ink)]">12,300.20</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-xs text-[var(--muted-foreground)]">{isArabic ? 'الأعلى' : 'High'}</p>
            <p className="mt-1 font-mono font-bold text-[var(--ink)]">12,480.00</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-xs text-[var(--muted-foreground)]">{isArabic ? 'الأدنى' : 'Low'}</p>
            <p className="mt-1 font-mono font-bold text-[var(--ink)]">12,250.50</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-xs text-[var(--muted-foreground)]">{isArabic ? 'حجم التداول' : 'Volume'}</p>
            <p className="mt-1 font-mono font-bold text-[var(--ink)]">5.2B</p>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'asset-classes') {
    return (
      <div 
        className="my-8 flex flex-col gap-4"
        role="region"
        aria-label={isArabic ? 'مقارنة فئات الأصول' : 'Asset classes comparison'}
        data-testid="infographic-asset-classes"
      >
        <div className="flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--gold)]/10 text-[var(--gold)]">
            <Shield size={24} />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-[var(--ink)]">{isArabic ? 'صكوك (Sukuk)' : 'Sukuk'}</h4>
            <div className="mt-2 flex gap-2">
              <span className="rounded bg-[var(--leaf-pale)] px-2 py-0.5 text-xs text-[var(--olive-deep)]">{isArabic ? 'مخاطرة منخفضة' : 'Low Risk'}</span>
              <span className="rounded bg-[var(--leaf-pale)] px-2 py-0.5 text-xs text-[var(--olive-deep)]">{isArabic ? 'عائد ثابت' : 'Fixed Return'}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--olive)]/10 text-[var(--olive)]">
            <TrendingUp size={24} />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-[var(--ink)]">{isArabic ? 'أسهم (Equities)' : 'Stocks (Equities)'}</h4>
            <div className="mt-2 flex gap-2">
              <span className="rounded bg-orange-100 px-2 py-0.5 text-xs text-orange-800 dark:bg-orange-950/30 dark:text-orange-400">{isArabic ? 'مخاطرة عالية' : 'High Risk'}</span>
              <span className="rounded bg-[var(--leaf-pale)] px-2 py-0.5 text-xs text-[var(--olive-deep)]">{isArabic ? 'نمو رأسمالي' : 'Capital Growth'}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'order-types') {
    return (
      <div 
        className="my-8 grid gap-4 sm:grid-cols-2"
        role="region"
        aria-label={isArabic ? 'أنواع الأوامر' : 'Order types'}
        data-testid="infographic-order-types"
      >
        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <Zap size={24} />
          </div>
          <h4 className="mb-2 font-bold text-[var(--ink)]">{isArabic ? 'أمر سوق (Market Order)' : 'Market Order'}</h4>
          <p className="text-sm text-[var(--muted-foreground)]">
            {isArabic 
              ? 'يُنفذ فوراً بأفضل سعر متوفر حالياً في السوق. يضمن لك التنفيذ السريع لكنه لا يضمن لك السعر.' 
              : 'Executes immediately at the best available price. Guarantees speed but not the exact price.'}
          </p>
        </div>
        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--leaf)] text-[var(--olive-deep)]">
            <Target size={24} />
          </div>
          <h4 className="mb-2 font-bold text-[var(--ink)]">{isArabic ? 'أمر محدد (Limit Order)' : 'Limit Order'}</h4>
          <p className="text-sm text-[var(--muted-foreground)]">
            {isArabic 
              ? 'أنت تحدد السعر الذي ترغب بالبيع أو الشراء به. يضمن لك السعر الذي تريده ولكنه لا يضمن سرعة التنفيذ.' 
              : 'You specify the exact price to buy or sell. Guarantees the price but not immediate execution.'}
          </p>
        </div>
      </div>
    );
  }

  return null;
}
