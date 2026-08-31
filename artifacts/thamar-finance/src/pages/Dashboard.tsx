import { useState } from 'react';

import ThamarHeader from '@/components/ThamarHeader';
import type { Language } from '@/data/mock-finance';

export default function Dashboard() {
  const [language, setLanguage] = useState<Language>('ar');
  const isArabic = language === 'ar';

  return (
    <main className={`app-shell grain page-enter ${isArabic ? 'rtl' : 'ltr'}`} lang={language}>
      <div className="relative min-h-[100dvh] overflow-hidden px-4 py-4 sm:px-8 sm:py-8">
        <div className="watermark-logo" aria-hidden="true">THAMAR</div>
        <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-2rem)] max-w-[1240px] flex-col sm:min-h-[calc(100dvh-4rem)]">
          <ThamarHeader language={language} active="home" onLanguageToggle={() => setLanguage(isArabic ? 'en' : 'ar')} />

          <section className="flex flex-1 flex-col items-center justify-center pb-10 pt-12 text-center sm:pb-16 sm:pt-16" data-testid="section-overview-brand">
            <img
              src={`${import.meta.env.BASE_URL}thamar-logo.png`}
              alt={isArabic ? 'شعار ثَمَر' : 'Thamar logo'}
              className="h-56 w-56 rounded-[2.5rem] object-cover shadow-[0_22px_55px_rgba(87,108,53,.13)] sm:h-72 sm:w-72 lg:h-80 lg:w-80"
              data-testid="img-overview-logo"
            />
            <p className="mt-8 max-w-2xl text-xs leading-7 text-[var(--muted-foreground)] sm:mt-10 sm:text-sm sm:leading-8" data-testid="text-overview-definition">
              {isArabic
                ? 'ثَمَر منصة مالية تهدف إلى زيادة الوعي والرقابة الفعلية على السوق المالي وتغيرات الاقتصاد العالمي لتحقيق الاستدامة المالية بشكل ذكي.'
                : 'Thamar is a financial platform built to increase awareness and active oversight of financial markets and global economic changes for smarter financial sustainability.'}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}