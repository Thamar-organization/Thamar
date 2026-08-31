export type Language = 'ar' | 'en';

export const monthly = {
  income: 18400,
  expenses: 11250,
  savings: 7150,
  emergency: 42600,
  investable: 3200,
  savingsRate: 38.9,
  score: 78,
};

export const marketIndicators = [
  { id: 'gold', ar: 'الذهب', en: 'Gold', value: '2,334.10', change: '+1.24%', positive: true, color: '#d4a83d', symbol: 'Au' },
  { id: 'equities', ar: 'الأسهم العالمية', en: 'Global equities', value: '5,214.32', change: '+0.68%', positive: true, color: '#6f844b', symbol: 'EQ' },
  { id: 'bitcoin', ar: 'بيتكوين', en: 'Bitcoin', value: '67,420', change: '-0.42%', positive: false, color: '#c97c49', symbol: 'BTC' },
  { id: 'diamond', ar: 'الألماس', en: 'Diamonds', value: '1,960', change: '+0.18%', positive: true, color: '#8e9db1', symbol: 'D' },
  { id: 'oil', ar: 'النفط', en: 'Oil', value: '82.14', change: '+0.37%', positive: true, color: '#69745c', symbol: 'O' },
  { id: 'inflation', ar: 'التضخم', en: 'Inflation', value: '2.74%', change: '-0.12%', positive: true, color: '#a47a56', symbol: 'π' },
  { id: 'rate', ar: 'الفائدة الأساسية', en: 'Interest rate', value: '5.25%', change: '0.00%', positive: true, color: '#8a9563', symbol: '%' },
];

export const trendData = {
  '1M': [
    { label: '1', value: 42 }, { label: '5', value: 46 }, { label: '10', value: 43 }, { label: '15', value: 49 }, { label: '20', value: 52 }, { label: '25', value: 50 }, { label: '30', value: 57 },
  ],
  '3M': [
    { label: 'ينا', value: 35 }, { label: 'فبر', value: 38 }, { label: 'مار', value: 44 }, { label: 'أبر', value: 42 }, { label: 'ماي', value: 49 }, { label: 'يون', value: 54 }, { label: 'يول', value: 57 },
  ],
  '6M': [
    { label: 'فبر', value: 31 }, { label: 'مار', value: 37 }, { label: 'أبر', value: 36 }, { label: 'ماي', value: 45 }, { label: 'يون', value: 51 }, { label: 'يول', value: 57 }, { label: 'أغس', value: 61 }, { label: 'سبت', value: 64 },
  ],
};

export const investments = [
  { id: 'balanced', ar: 'محفظة متوازنة', en: 'Balanced portfolio', fit: 92, riskAr: 'مخاطر متوسطة', riskEn: 'Moderate risk', rationaleAr: 'توزّع هادئ بين النمو والاستقرار، وتناسب خطتك الحالية.', rationaleEn: 'A steady blend of growth and stability that fits your current plan.', color: '#71804a', badge: true },
  { id: 'sukuk', ar: 'صكوك عالمية', en: 'Global sukuk', fit: 81, riskAr: 'مخاطر منخفضة', riskEn: 'Lower risk', rationaleAr: 'خيار دفاعي يساعد على حماية السيولة مع عائد متوقع.', rationaleEn: 'A defensive choice to protect liquidity with an expected return.', color: '#b58b45', badge: false },
  { id: 'equities', ar: 'أسهم نمو عالمية', en: 'Global growth equities', fit: 74, riskAr: 'مخاطر مرتفعة', riskEn: 'Higher risk', rationaleAr: 'فرصة نمو أبعد، لكن مع تذبذب يحتاج إلى صبر أطول.', rationaleEn: 'Longer-horizon growth potential, with more movement along the way.', color: '#52756a', badge: false },
];

export const portfolioAccounts = [
  { id: 'cash', ar: 'الحساب الرئيسي', en: 'Main account', kindAr: 'كاش', kindEn: 'Cash', number: '••••3574', value: 6380, color: '#d8e8be' },
  { id: 'savings', ar: 'حساب التوفير', en: 'Savings account', kindAr: 'ادخار', kindEn: 'Savings', number: '••••2258', value: 11200, color: '#f4e7bb' },
  { id: 'investments', ar: 'حساب الاستثمار', en: 'Investment account', kindAr: 'استثمار', kindEn: 'Investments', number: '••••3346', value: 7270, color: '#e4d9c3' },
];

export const portfolioMix = [
  { id: 'cash', ar: 'كاش', en: 'Cash', value: 26, amount: 6380, color: '#8b9d67' },
  { id: 'savings', ar: 'ادخار', en: 'Savings', value: 45, amount: 11200, color: '#d4a83d' },
  { id: 'investments', ar: 'استثمار', en: 'Investments', value: 29, amount: 7270, color: '#6d7c72' },
];

export const portfolioPlans = [
  { id: 'gold-plan', ar: 'الاستثمار بالذهب', en: 'Gold plan', returnAr: '+8.4%', returnEn: '+8.4%', riskAr: 'منخفض', riskEn: 'Low', allocation: '35%', color: '#d4a83d' },
  { id: 'equity-plan', ar: 'الاستثمار بالأسهم', en: 'Equity plan', returnAr: '+12.1%', returnEn: '+12.1%', riskAr: 'متوسط', riskEn: 'Moderate', allocation: '40%', color: '#6f844b' },
  { id: 'sukuk-plan', ar: 'الصكوك العالمية', en: 'Global sukuk', returnAr: '+5.8%', returnEn: '+5.8%', riskAr: 'منخفض', riskEn: 'Low', allocation: '25%', color: '#8e9db1' },
];