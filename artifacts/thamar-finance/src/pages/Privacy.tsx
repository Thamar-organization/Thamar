import { ArrowLeft, ArrowRight, Check, Info, LockKeyhole, ShieldCheck, Sprout, UsersRound } from 'lucide-react';
import { Link } from 'wouter';

import useLanguagePreference from '@/hooks/use-language';

export default function Privacy() {
  const [language, setLanguage] = useLanguagePreference();
  const isArabic = language === 'ar';
  const content = isArabic
    ? {
        eyebrow: 'ثَمَر · الخصوصية',
        title: 'سياسة الخصوصية',
        intro: 'صُمّمت ثَمَر لتمنحك وضوحًا أكبر حول أموالك، مع احترام خصوصيتك من البداية.',
        demo: 'نسخة تجريبية',
        demoText: 'هذه النسخة تستخدم أرقامًا تجريبية ثابتة للعرض فقط داخل متصفحك.',
        collect: 'ما الذي نجمعه',
        collectText: 'لا تجمع النسخة التجريبية من ثَمَر أي بيانات هوية أو حسابات بنكية أو أرقام بطاقات أو كلمات مرور. جميع الأرقام المعروضة داخل التطبيق بيانات تجريبية ثابتة.',
        use: 'كيف تُستخدم البيانات',
        useText: 'تُستخدم الأرقام التجريبية لعرض المؤشرات والرسوم البيانية والتوصيات الاسترشادية داخل متصفحك فقط.',
        local: 'التخزين المحلي',
        localText: 'نحفظ تفضيل اللغة (عربي/إنجليزي) في متصفحك فقط، ويمكن حذفه بمسح بيانات الموقع.',
        thirdParty: 'أطراف ثالثة',
        thirdPartyText: 'لا تتم مشاركة أي بيانات مع أطراف ثالثة، ولا تُستخدم مفاتيح أو أسرار داخل التطبيق.',
        guidance: 'الطبيعة الاسترشادية',
        guidanceText: 'المؤشرات والعوائد المعروضة تقديرية لأغراض استرشادية فقط وليست ضمانًا أو توصية استثمارية مؤكدة.',
        back: 'العودة إلى البداية',
        lang: 'English',
      }
    : {
        eyebrow: 'THAMAR · PRIVACY',
        title: 'Privacy policy',
        intro: 'Thamar is designed to give you a clearer view of your money while respecting your privacy from the start.',
        demo: 'Demo version',
        demoText: 'This version uses fixed illustrative numbers for display in your browser only.',
        collect: 'What we collect',
        collectText: 'The Thamar demo does not collect identity details, bank accounts, card numbers, or passwords. Every number shown in the app is fixed demo data.',
        use: 'How data is used',
        useText: 'Demo numbers are used only to display indicators, charts, and educational guidance inside your browser.',
        local: 'Local storage',
        localText: 'We save your language preference (Arabic/English) in your browser only. You can remove it by clearing site data.',
        thirdParty: 'Third parties',
        thirdPartyText: 'No data is shared with third parties, and the app does not use keys or secrets.',
        guidance: 'Educational nature',
        guidanceText: 'Displayed indicators and returns are estimates for educational context only. They are not a guarantee or confirmed investment recommendation.',
        back: 'Back to the start',
        lang: 'العربية',
      };

  const sections = [
    { id: 'collect', title: content.collect, text: content.collectText, icon: ShieldCheck },
    { id: 'use', title: content.use, text: content.useText, icon: Info },
    { id: 'local', title: content.local, text: content.localText, icon: LockKeyhole },
    { id: 'third-party', title: content.thirdParty, text: content.thirdPartyText, icon: UsersRound },
    { id: 'guidance', title: content.guidance, text: content.guidanceText, icon: Check },
  ];

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

        <section className="mx-auto mt-10 max-w-[1160px] overflow-hidden rounded-[2rem] bg-[var(--paper)] shadow-[0_22px_65px_rgba(87,108,53,.1)] sm:mt-16">
          <div className="grid lg:grid-cols-[.7fr_1.3fr]">
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
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--gold-soft)] text-[var(--olive-deep)]"><Sprout size={16} /></span>
                  <h2 className="font-display text-base font-semibold text-[var(--ink)]">{content.demo}</h2>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]" data-testid="text-demo-privacy">{content.demoText}</p>
              </article>

              <div className="mt-9 grid gap-7 sm:grid-cols-2">
                {sections.map((item) => (
                  <article key={item.id} data-testid={`section-privacy-${item.id}`}>
                    <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--leaf)] text-[var(--olive-deep)]"><item.icon size={17} /></div>
                    <h2 className="font-display text-lg font-semibold tracking-[-.05em] text-[var(--ink)]">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{item.text}</p>
                  </article>
                ))}
              </div>

              <Link href="/" className="mt-10 inline-flex items-center gap-2 rounded-xl bg-[var(--olive)] px-4 py-3 text-sm font-semibold text-[var(--paper)] transition hover:bg-[var(--olive-deep)]" data-testid="link-back-home">
                {isArabic ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
                {content.back}
              </Link>
            </div>
          </div>
        </section>
        <p className="mx-auto mt-5 max-w-[1160px] px-1 text-[10px] text-[var(--muted-foreground)]" data-testid="text-privacy-footer">{isArabic ? 'نسخة توضيحية · لا توجد بيانات حقيقية في التطبيق' : 'Illustrative version · no real data is used in the app'}</p>
      </div>
    </main>
  );
}