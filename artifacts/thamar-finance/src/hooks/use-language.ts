import { useEffect, useState } from 'react';

import type { Language } from '@/data/mock-finance';

const LANGUAGE_KEY = 'thamar-language';

export default function useLanguagePreference() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'ar';
    return window.localStorage.getItem(LANGUAGE_KEY) === 'en' ? 'en' : 'ar';
  });

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_KEY, language);
  }, [language]);

  return [language, setLanguage] as const;
}