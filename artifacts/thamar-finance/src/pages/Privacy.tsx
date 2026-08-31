import { ArrowLeft, ArrowRight, Check, LockKeyhole, ShieldCheck, Sprout } from 'lucide-react';
import { Link } from 'wouter';

import type { Language } from '@/data/mock-finance';
import { useState } from 'react';

export default function Privacy() {
  const [language, setLanguage] = useState<Language>('ar');
  const isArabic = language === 'ar';
  const content = isArabic ? {
    eyebrow: 'ثَمَر · الخصوصية',
    title: 'مساحتك المالية، تبقى لك.',
    intro: 'صُمّمت ثَمَر لتساعدك على فهم قراراتك المالية، لا لجمع تفاصيل حياتك.',
    demo: 'هذه نسخة تجريبية',
    demoText: 'كل الأرقام التي تراها في هذه التجربة مصطنعة ومخصصة للعرض فقط. لا يتم حفظ أي معلومات مالية حقيقية أو إرسالها إلى أي خدمة.',
    never: 'ما لا نطلبه',
    neverText: 'لا نطلب أو نخزّن معلومات الهوية، أرقام الحسابات البنكية، بيانات البطاقات، كلمات مرور الخدمات البنكية، أو أي بيانات دخول حساسة.',
    use: 'ما الذي نستخدمه؟',
    useText: 'تستخدم ثَمَر بيانات توضيحية محلية لبناء تجربة لوحة مالية ومقارنة خيارات استثمارية. لا توجد معاملات، أو ربط حسابات، أو أسعار حقيقية في هذه النسخة.',
    promise: 'وعدنا البسيط',
    promiseText: 'سنشرح لك دائماً ما تراه، ونترك القرار بين يديك. الثقة تبدأ من الوضوح.',
    back: 'العودة إلى البداية',
    lang: 'English',
  } : {
    eyebrow: 'THAMAR · PRIVACY',
    title: 'Your financial space stays yours.',
    intro: 'Thamar is designed to help you understand your money — not collect your life.',
    demo: 'This is a demo',
    demoText: 'Every number in this experience is synthetic and for display only. No real financial information is stored or sent to any service.',
    never: 'What we never ask for',
    neverText: 'We do not request or store identity details, bank account numbers, card details, banking passwords, or sensitive sign-in information.',
    use: 'What do we use?',
    useText: 'Thamar uses local illustrative data to build a financial overview and compare investment options. There are no transactions, account connections, or live prices in this version.',
    promise: 'Our simple promise',
    promiseText: 'We will always make the numbers you see clear, and keep the decision in your hands. Trust begins with clarity.',
    back: 'Back to the start',
    lang: 'العربية',
  };

  return (
    <main className={`app-shell grain page-enter ${isArabic ? 'rtl' : 'ltr'}`} lang={language}>
      <div className="min-h-[100dvh] px-5 py-5 sm:px-10 sm:py-8">
        <header className="mx-auto flex max-w-[1160px] items-center justify-between">
          <Link href="/" className="flex items-center gap-2" data-testid="link-privacy-logo">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--gold-soft)] text-[var(--olive-deep)]"><Sprout size={18} /></span>
            <span className="font-display text-base font-semibold tracking-[-.08em] text-[var(--ink)]">ثَمَر</span>
            <span className="font-mono text-[9px] tracking-[.17em] text-[var(--olive)]">THAMAR</span>
          </Link>
          <button type="button" onClick={() => setLanguage(isArabic ? 'en' : 'ar')} className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-xs font-medium text-[var(--olive-deep)] transition hover:border-[var(--olive)]" data-testid="button-privacy-language">{content.lang}</button>
        </header>

        <section className="mx-auto mt-12 max-w-[1160px] overflow-hidden rounded-[2rem] bg-[var(--paper)] shadow-[0_22px_65px_rgba(87,108,53,.1)] sm:mt-20">
          <div className="grid lg:grid-cols-[.8fr_1.2fr]">
            <div className="relative overflow-hidden bg-[var(--leaf)] px-7 py-12 sm:px-14 sm:py-16">
              <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full border-[30px] border-[#c5dfa1]" />
              <div className="relative">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf5dc] text-[var(--olive-deep)]"><LockKeyhole size={21} /></span>
                <p className="mt-12 font-mono text-[10px] tracking-[.2em] text-[var(--olive)]">{content.eyebrow}</p>
                <h1 className="mt-4 max-w-sm font-display text-3xl font-semibold leading-[1.6] tracking-[-.08em] text-[var(--ink)] sm:text-4xl" data-testid="heading-privacy">{content.title}</h1>
                <p className="mt-5 max-w-sm text-sm leading-8 text-[var(--olive-deep)]" data-testid="text-privacy-intro">{content.intro}</p>
              </div>
            </div>
            <div className="px-7 py-10 sm:px-14 sm:py-14">
              <article className="rounded-2xl border border-[#e5d49f] bg-[#fff9e8] p-5 sm:p-6" data-testid="card-demo-privacy">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--gold-soft)] text-[var(--olive-deep)]"><ShieldCheck size={16} /></span>
                  <h2 className="font-display text-base font-semibold text-[var(--ink)]">{content.demo}</h2>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]" data-testid="text-demo-privacy">{content.demoText}</p>
              </article>
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <article data-testid="section-never-request">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--leaf)] text-[var(--olive-deep)]"><Check size={17} /></div>
                  <h2 className="font-display text-lg font-semibold tracking-[-.05em] text-[var(--ink)]">{content.never}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{content.neverText}</p>
                </article>
                <article data-testid="section-local-data">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--leaf)] text-[var(--olive-deep)]"><Sprout size={17} /></div>
                  <h2 className="font-display text-lg font-semibold tracking-[-.05em] text-[var(--ink)]">{content.use}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{content.useText}</p>
                </article>
              </div>
              <article className="mt-10 border-t border-[var(--line)] pt-8" data-testid="section-promise">
                <h2 className="font-display text-lg font-semibold tracking-[-.05em] text-[var(--ink)]">{content.promise}</h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted-foreground)]">{content.promiseText}</p>
              </article>
              <Link href="/" className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[var(--olive)] px-4 py-3 text-sm font-semibold text-[var(--paper)] transition hover:bg-[var(--olive-deep)]" data-testid="link-back-home">
                {isArabic ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
                {content.back}
              </Link>
            </div>
          </div>
        </section>
        <p className="mx-auto mt-5 max-w-[1160px] px-1 text-[10px] text-[var(--muted-foreground)]">{isArabic ? 'آخر تحديث: أغسطس 2025 · نسخة توضيحية' : 'Last updated: August 2025 · Illustrative version'}</p>
      </div>
    </main>
  );
}