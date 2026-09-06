export type InsightCategory = 'basics' | 'strategy' | 'psychology' | 'assets';

export interface InsightArticle {
  id: string;
  category: InsightCategory;
  readTimeMinutes: number;
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  bodyAr: string;
  bodyEn: string;
  date: string;
}

export const insightCategories = {
  ar: {
    all: 'الكل',
    basics: 'أساسيات',
    strategy: 'استراتيجية',
    psychology: 'علم النفس المالي',
    assets: 'الأصول المالية',
  },
  en: {
    all: 'All',
    basics: 'Basics',
    strategy: 'Strategy',
    psychology: 'Psychology',
    assets: 'Assets',
  }
};

export const dailyTip = {
  titleAr: 'نصيحة اليوم',
  titleEn: 'Today\'s Tip',
  contentAr: 'الاستمرارية في الاستثمار بمبالغ صغيرة ومستدامة تفوق محاولة توقيت السوق بمبالغ كبيرة متقطعة.',
  contentEn: 'Consistency in investing small, sustainable amounts beats trying to time the market with large, sporadic sums.'
};

export const disclaimer = {
  ar: 'تنويه: هذا المحتوى للأغراض التعليمية فقط، ولا يعتبر استشارة مالية أو توصية استثمارية مخصصة. يرجى تقييم وضعك المالي الخاص والتشاور مع مختص قبل اتخاذ قراراتك.',
  en: 'Disclaimer: This content is for educational purposes only and does not constitute personalized financial or investment advice. Please evaluate your financial situation before making decisions.'
};

export const insightsData: InsightArticle[] = [
  {
    id: 'emergency-fund',
    category: 'basics',
    readTimeMinutes: 4,
    date: '2024-05-10',
    titleAr: 'لماذا تحتاج إلى صندوق طوارئ قبل البدء بالاستثمار؟',
    titleEn: 'Why You Need an Emergency Fund Before Investing',
    summaryAr: 'بناء الأساس المالي الصلب يبدأ بحماية نفسك من المفاجآت. تعرف على حجم صندوق الطوارئ المناسب لك.',
    summaryEn: 'Building a solid financial foundation starts with protecting yourself from surprises. Learn the right size for your emergency fund.',
    bodyAr: `الاستثمار هو أداة قوية لبناء الثروة، ولكن البدء فيه بدون شبكة أمان يمكن أن يؤدي إلى نتائج عكسية. صندوق الطوارئ هو مبلغ من المال تضعه جانباً لتغطية النفقات غير المتوقعة مثل الإصلاحات الطارئة للسيارة، الفواتير الطبية، أو فقدان الوظيفة.

لماذا هو مهم؟
عندما تواجه أزمة مالية دون وجود سيولة جاهزة، قد تضطر إلى سحب استثماراتك في وقت غير مناسب (ربما عندما تكون الأسواق منخفضة) أو اللجوء إلى ديون بفوائد عالية. صندوق الطوارئ يحمي استثماراتك ويمنحك راحة البال.

كم يجب أن تدخر؟
القاعدة العامة هي توفير نفقات المعيشة الأساسية لمدة 3 إلى 6 أشهر. ابدأ بخطوات صغيرة: استهدف تغطية نفقات شهر واحد أولاً، ثم قم بزيادة المبلغ تدريجياً.

أين تضعه؟
يجب أن يكون صندوق الطوارئ في حساب آمن وسهل الوصول إليه، مثل حساب ادخار منفصل عن حسابك الجاري لتجنب صرفه في النفقات اليومية.`,
    bodyEn: `Investing is a powerful tool for building wealth, but starting without a safety net can be counterproductive. An emergency fund is money set aside to cover unexpected expenses like urgent car repairs, medical bills, or job loss.

Why is it important?
When facing a financial crisis without ready cash, you might be forced to withdraw your investments at a bad time (perhaps during a market downturn) or resort to high-interest debt. An emergency fund protects your investments and gives you peace of mind.

How much should you save?
The general rule of thumb is to save 3 to 6 months of basic living expenses. Start small: aim to cover one month's expenses first, then gradually increase the amount.

Where to keep it?
Your emergency fund should be in a safe, easily accessible account, such as a high-yield savings account separate from your checking to avoid spending it on daily expenses.`
  },
  {
    id: 'compound-interest',
    category: 'basics',
    readTimeMinutes: 5,
    date: '2024-05-12',
    titleAr: 'سحر العائد التراكمي: كيف يعمل الوقت لصالحك',
    titleEn: 'The Magic of Compound Interest: How Time Works for You',
    summaryAr: 'الوقت هو أثمن مورد للمستثمر. اكتشف كيف يمكن للمبالغ الصغيرة أن تنمو بشكل كبير بمرور الزمن.',
    summaryEn: 'Time is an investor\'s most valuable asset. Discover how small amounts can grow significantly over time.',
    bodyAr: `يُقال إن العائد التراكمي هو الأعجوبة الثامنة في العالم. الفكرة بسيطة جداً: أنت تكسب عائداً ليس فقط على أموالك الأصلية، ولكن أيضاً على العوائد التي حققتها سابقاً.

كيف يعمل؟
إذا استثمرت 10,000 ريال بعائد 5٪، في السنة الأولى ستربح 500 ريال. في السنة الثانية، لن تكسب 5٪ على الـ 10,000 ريال فقط، بل على 10,500 ريال. قد يبدو الفرق صغيراً في البداية، ولكنه يتضخم بشكل هائل على مدى عقود.

قوة البداية المبكرة
الشخص الذي يبدأ باستثمار مبلغ صغير في العشرينات من عمره سيتفوق غالباً على الشخص الذي يستثمر مبلغاً أكبر بكثير في الأربعينات، ببساطة لأن أمواله حظيت بوقت أطول لتتراكم.

الاستمرارية هي المفتاح
لا تحتاج إلى مبالغ ضخمة لتستفيد من العائد التراكمي. المساهمات المنتظمة، حتى لو كانت صغيرة، مع إعادة استثمار العوائد هي الطريقة الأضمن لبناء الثروة على المدى الطويل.`,
    bodyEn: `Compound interest is often called the eighth wonder of the world. The concept is simple: you earn returns not just on your original money, but also on the returns you've previously earned.

How does it work?
If you invest SAR 10,000 at a 5% return, in the first year you earn SAR 500. In the second year, you earn 5% not just on the 10,000, but on 10,500. The difference might seem small at first, but it snowballs massively over decades.

The power of starting early
Someone who starts investing a small amount in their twenties will often outpace someone investing a much larger amount in their forties, simply because their money had more time to compound.

Consistency is key
You don't need huge sums to benefit from compounding. Regular contributions, even small ones, combined with reinvesting your returns, is the surest way to build long-term wealth.`
  },
  {
    id: 'diversification',
    category: 'strategy',
    readTimeMinutes: 4,
    date: '2024-05-15',
    titleAr: 'التنويع: لماذا لا يجب وضع كل البيض في سلة واحدة',
    titleEn: 'Diversification: Don\'t Put All Your Eggs in One Basket',
    summaryAr: 'طريقة ذكية لتقليل المخاطر مع الحفاظ على إمكانية النمو. استكشف كيف تبني محفظة متوازنة.',
    summaryEn: 'A smart way to reduce risk while maintaining growth potential. Explore how to build a balanced portfolio.',
    bodyAr: `التنويع هو استراتيجية توزيع استثماراتك عبر أصول مختلفة (مثل الأسهم، الصكوك، النقد، والذهب) لتقليل التعرض للمخاطر.

لماذا ننصح بالتنويع؟
تتحرك الأسواق المختلفة في اتجاهات مختلفة. عندما تنخفض الأسهم، قد ترتفع الصكوك أو يظل الذهب مستقراً. من خلال امتلاك مزيج من الأصول، يمكنك تقليل التقلبات في محفظتك. لا أحد يستطيع التنبؤ بدقة بالسوق الذي سيتفوق غداً، لذا فإن التنويع يحميك من الخسارة الكبيرة إذا تراجع أداء قطاع معين.

مستويات التنويع:
1. التنويع بين فئات الأصول: امتلاك أسهم وصكوك وأصول أخرى.
2. التنويع داخل فئة الأصل: عدم شراء سهم شركة واحدة فقط، بل شراء صندوق يستثمر في مئات الشركات.
3. التنويع الجغرافي: الاستثمار في الأسواق المحلية والعالمية.

التوازن المناسب لك
المحفظة المثالية تعتمد على عمرك وأهدافك. المحافظ الشابة قد تتحمل نسبة أعلى من الأسهم، بينما قد تفضل المحافظ الأقرب للتقاعد التركيز على الأصول الأكثر استقراراً.`,
    bodyEn: `Diversification is the strategy of spreading your investments across different assets (like stocks, sukuk, cash, and gold) to reduce your exposure to risk.

Why diversify?
Different markets move in different directions. When stocks fall, sukuk might rise or gold might remain stable. By holding a mix of assets, you smooth out the volatility of your portfolio. No one can perfectly predict which market will outperform tomorrow, so diversification protects you from massive losses if one sector struggles.

Levels of diversification:
1. Across asset classes: Holding stocks, sukuk, and other assets.
2. Within an asset class: Not buying just one company's stock, but a fund that invests in hundreds of companies.
3. Geographical diversification: Investing in both local and global markets.

Your right balance
The ideal portfolio depends on your age and goals. Younger portfolios might hold more equities for growth, while portfolios closer to retirement might lean heavily into more stable assets.`
  },
  {
    id: 'stocks-vs-sukuk',
    category: 'assets',
    readTimeMinutes: 6,
    date: '2024-05-18',
    titleAr: 'الأسهم مقابل الصكوك: فهم أدوات الاستثمار الأساسية',
    titleEn: 'Stocks vs. Sukuk: Understanding Core Investment Vehicles',
    summaryAr: 'مقارنة شاملة بين الملكية في الشركات وتمويلها، وكيف يخدم كل منهما أهدافك الاستثمارية.',
    summaryEn: 'A comprehensive comparison between owning companies and financing them, and how each serves your goals.',
    bodyAr: `لفهم كيفية بناء محفظة متوازنة، يجب أن تفهم الفرق الأساسي بين النوعين الرئيسيين للأصول المالية: الأسهم والصكوك.

الأسهم: حصة من الملكية
عندما تشتري سهماً، فأنت تشتري جزءاً صغيراً من شركة. إذا نجحت الشركة، ينمو استثمارك، وقد تحصل على توزيعات أرباح.
- الميزة: إمكانية نمو عالية على المدى الطويل، وتعد وسيلة ممتازة للتغلب على التضخم.
- المخاطرة: تقلبات عالية على المدى القصير؛ أسعار الأسهم تتأثر بأخبار الشركة والاقتصاد.

الصكوك: تمويل وتوزيعات ثابتة
الصكوك هي أداة مالية متوافقة مع الشريعة الإسلامية تمثل ملكية حصة شائعة في مشروع أو أصل مدر للدخل. بدلاً من إقراض المال بفائدة (كما في السندات)، يحصل حامل الصك على حصة من أرباح المشروع.
- الميزة: استقرار نسبي وتدفق نقدي متوقع ومستمر.
- المخاطرة: إمكانية نمو أقل مقارنة بالأسهم.

كيفية الجمع بينهما
المحفظة الذكية غالباً ما تحتوي على كليهما. توفر الأسهم محرك النمو لمواجهة التضخم، بينما توفر الصكوك الاستقرار والتدفق النقدي الذي يحمي المحفظة خلال الأوقات الاقتصادية الصعبة.`,
    bodyEn: `To build a balanced portfolio, you must understand the fundamental difference between the two main types of financial assets: stocks and sukuk.

Stocks: A Share of Ownership
When you buy a stock, you buy a tiny slice of a company. If the company succeeds, your investment grows, and you may receive dividends.
- Advantage: High long-term growth potential, excellent for beating inflation.
- Risk: High short-term volatility; prices fluctuate based on company news and the economy.

Sukuk: Financing with Steady Returns
Sukuk are Islamic financial certificates representing ownership in a tangible asset, service, or project. Unlike traditional bonds that pay interest, a sukuk holder earns a share of the profit generated by the underlying asset.
- Advantage: Relative stability and a predictable, steady cash flow.
- Risk: Lower growth potential compared to equities.

How they work together
A smart portfolio often contains both. Stocks provide the growth engine to outpace inflation, while sukuk offer stability and cash flow to anchor your portfolio during tough economic times.`
  },
  {
    id: 'risk-and-return',
    category: 'basics',
    readTimeMinutes: 5,
    date: '2024-05-20',
    titleAr: 'المخاطرة والعائد: وجهان لعملة واحدة',
    titleEn: 'Risk and Return: Two Sides of the Same Coin',
    summaryAr: 'لا يوجد عائد بدون مخاطرة. تعلم كيف تقيم قدرتك على تحمل المخاطر وتطابقها مع توقعاتك.',
    summaryEn: 'There is no return without risk. Learn how to assess your risk tolerance and match it with your expectations.',
    bodyAr: `القاعدة الذهبية في التمويل: العائد المحتمل مرتبط ارتباطاً وثيقاً بالمخاطر. كلما ارتفع العائد الذي تسعى إليه، زادت المخاطر التي يجب أن تكون مستعداً لتحملها.

فهم المخاطرة
في الاستثمار، المخاطرة لا تعني فقط احتمالية خسارة المال؛ بل تعني أيضاً "التقلب" (مدى تأرجح قيمة استثمارك صعوداً وهبوطاً بمرور الوقت).

تقييم قدرتك على تحمل المخاطر
يعتمد هذا على عاملين:
1. القدرة المالية: متى ستحتاج إلى المال؟ إذا كنت تستثمر للتقاعد بعد 20 عاماً، فلديك قدرة عالية لأن لديك الوقت للتعافي من الانخفاضات. إذا كنت تدخر لشراء منزل بعد عام، فقدرتك منخفضة جداً.
2. القدرة النفسية: هل ستصاب بالهلع وتبيع إذا انخفضت محفظتك بنسبة 20٪ في شهر واحد؟ الصدق مع نفسك هنا أمر بالغ الأهمية.

الخطر الأكبر: عدم الاستثمار
تجنب جميع المخاطر بوضع مالك في النقد فقط هو بحد ذاته مخاطرة! التضخم سيأكل قوتك الشرائية تدريجياً. الاستثمار المتوازن هو كيفية حماية ثروتك من التضخم مع إدارة التقلبات بصورة مدروسة.`,
    bodyEn: `The golden rule of finance: potential return is directly linked to risk. The higher the return you seek, the more risk you must be willing to accept.

Understanding Risk
In investing, risk doesn't just mean the possibility of losing money entirely; it primarily refers to "volatility"—how much your investment's value swings up and down over time.

Assessing your Risk Tolerance
This depends on two factors:
1. Financial Capacity: When will you need the money? If investing for retirement in 20 years, your capacity is high because you have time to recover from downturns. If saving for a house down-payment next year, your capacity is very low.
2. Psychological Tolerance: Will you panic and sell if your portfolio drops 20% in a month? Being honest with yourself here is crucial.

The biggest risk: Not investing
Avoiding all risk by keeping your money purely in cash is actually risky! Inflation will slowly eat away your purchasing power. Balanced investing is how you protect wealth from inflation while managing volatility thoughtfully.`
  },
  {
    id: 'emotional-investing',
    category: 'psychology',
    readTimeMinutes: 5,
    date: '2024-05-22',
    titleAr: 'التحكم بالمشاعر: عدو المستثمر الأول',
    titleEn: 'Emotional Control: The Investor\'s Biggest Enemy',
    summaryAr: 'الخوف والطمع هما السببان الرئيسيان لخسارة المستثمرين أموالهم. استراتيجيات للبقاء هادئاً.',
    summaryEn: 'Fear and greed are the main reasons investors lose money. Strategies to remain calm.',
    bodyAr: `النجاح في الاستثمار يعتمد على السلوك أكثر بكثير مما يعتمد على الذكاء. حتى أفضل الاستراتيجيات المالية ستفشل إذا لم يستطع المستثمر التحكم في عواطفه.

دورة المشاعر في السوق
- الطمع (في القمة): عندما يرتفع السوق، يشعر الناس بالثقة المفرطة ويرغبون في الشراء بكثافة.
- الخوف (في القاع): عندما يهبط السوق، يصاب الناس بالهلع ويبيعون بخسارة خوفاً من الأسوأ.
هذا السلوك يؤدي إلى الاستراتيجية الأسوأ على الإطلاق: الشراء بسعر مرتفع والبيع بسعر منخفض.

كيف تحمي نفسك من مشاعرك؟
1. الاستثمار الآلي: قم بأتمتة استقطاعك الشهري واستثمارك. الآلة لا تشعر بالخوف.
2. توقف عن متابعة الأخبار اليومية: التركيز المفرط على تقلبات السوق اليومية يسبب التوتر.
3. التزم بخطتك: حدد توزيع محفظتك وأهدافك عندما تكون هادئاً، ولا تغيرها في أوقات الأزمات.

تذكر أن التراجعات المؤقتة في الأسواق هي جزء طبيعي جداً من الدورة الاقتصادية، بل إنها غالباً ما تمثل فرصاً جيدة للشراء بأسعار أقل.`,
    bodyEn: `Investing success is much more about behavior than intelligence. Even the best financial strategies will fail if an investor cannot control their emotions.

The Market Emotion Cycle
- Greed (at the peak): When markets soar, people feel overconfident and want to buy heavily.
- Fear (at the bottom): When markets crash, people panic and sell at a loss fearing the worst.
This behavior leads to the absolute worst strategy: buying high and selling low.

How to protect yourself from your emotions?
1. Automated Investing: Automate your monthly savings and investments. Machines don't feel fear.
2. Stop watching daily news: Over-focusing on daily market fluctuations creates unnecessary stress.
3. Stick to your plan: Set your portfolio allocation and goals when you are calm, and don't change them during a crisis.

Remember that temporary market downturns are a completely normal part of the economic cycle—in fact, they often present excellent opportunities to buy at lower prices.`
  },
  {
    id: 'investment-fees',
    category: 'strategy',
    readTimeMinutes: 4,
    date: '2024-05-25',
    titleAr: 'التأثير الخفي للرسوم: ما تأخذه يؤثر على ما تكسبه',
    titleEn: 'The Hidden Impact of Fees: What They Take Affects What You Make',
    summaryAr: 'الرسوم المرتفعة يمكن أن تلتهم جزءاً كبيراً من عوائدك على المدى الطويل. كيف تقيم تكلفة استثماراتك.',
    summaryEn: 'High fees can eat up a massive portion of your returns over the long term. How to evaluate costs.',
    bodyAr: `في عالم الاستثمار، أنت لا تحصل على ما تدفع مقابله؛ بل تحصل على ما تحتفظ به. الرسوم الإدارية هي التكلفة الصامتة التي يمكن أن تقلل ثروتك المستقبلية بشكل جذري.

تأثير الـ 1٪
تخيل أنك استثمرت 100,000 ريال بعائد سنوي 7٪ لمدة 30 عاماً.
- إذا كانت الرسوم 0.5٪، سينمو استثمارك إلى حوالي 660,000 ريال.
- إذا كانت الرسوم 1.5٪، سينمو استثمارك إلى حوالي 500,000 ريال فقط.
فرق قدره 1٪ في الرسوم كلفك 160,000 ريال من ثروتك!

أنواع الرسوم التي يجب الانتباه لها:
- رسوم الإدارة السنوية: تُخصم نسبة مئوية من إجمالي أصولك سنوياً.
- رسوم الاشتراك/الاسترداد: رسوم تُدفع عند الشراء أو البيع.
- رسوم الأداء: نسبة تؤخذ في حال حقق الصندوق أرباحاً معينة.

كيف تتصرف؟
ابحث دائماً عن خيارات استثمارية منخفضة التكلفة، مثل الصناديق المتداولة (ETFs) التي توفر تنويعاً ممتازاً برسوم إدارية ضئيلة جداً مقارنة بالصناديق النشطة التقليدية.`,
    bodyEn: `In investing, you don't get what you pay for; you get what you keep. Management fees are the silent cost that can drastically reduce your future wealth.

The impact of 1%
Imagine you invest SAR 100,000 at a 7% annual return for 30 years.
- With a 0.5% fee, your investment grows to roughly SAR 660,000.
- With a 1.5% fee, it grows to only about SAR 500,000.
A mere 1% difference in fees cost you SAR 160,000 of your wealth!

Fees to watch out for:
- Annual management fees: A percentage deducted from your total assets every year.
- Front-end/Back-end loads: Fees paid when you buy or sell.
- Performance fees: A cut taken if the fund achieves a certain profit.

What to do?
Always look for low-cost investment options, such as Exchange-Traded Funds (ETFs), which offer excellent diversification at a fraction of the cost of traditional actively managed funds.`
  },
  {
    id: 'gold-role',
    category: 'assets',
    readTimeMinutes: 4,
    date: '2024-05-28',
    titleAr: 'دور الذهب: حماية المحفظة أم محرك للنمو؟',
    titleEn: 'The Role of Gold: Portfolio Protection or Growth Engine?',
    summaryAr: 'الذهب له مكانة خاصة في الثقافة والتمويل. متى وكيف يجب أن تدرجه في محفظتك.',
    summaryEn: 'Gold holds a special place in culture and finance. When and how you should include it in your portfolio.',
    bodyAr: `الذهب أصل فريد. على عكس الشركات التي تنتج أرباحاً، أو الصكوك التي تدفع عائداً، الذهب لا "ينتج" شيئاً. قيمته تنبع من ندرته والثقة التاريخية به. إذن، ما هو دوره في محفظتك؟

مخزن للقيمة وحماية من الأزمات
يُعتبر الذهب تاريخياً الملاذ الآمن خلال الأزمات الجيوسياسية والتضخم المفرط وتراجع ثقة الأسواق بالعملات الورقية. عندما تفقد الأصول الورقية قيمتها، يميل الذهب إلى الاحتفاظ بقوته الشرائية.

ليس محركاً للنمو
الذهب لا يدفع توزيعات أرباح. عائده الوحيد يأتي من بيعه بسعر أعلى مما اشتريته به. على المدى الطويل (عقود)، الأسهم تتفوق بكثير على الذهب في تحقيق النمو وبناء الثروة.

النسبة المقترحة
بالنسبة لمعظم المستثمرين، يُستخدم الذهب كأداة "تأمين" للمحفظة وليس كأصل أساسي. يوصي العديد من الخبراء بتخصيص نسبة تتراوح بين 5٪ إلى 10٪ كحد أقصى من إجمالي المحفظة للذهب لتخفيف التقلبات وتوفير الحماية في الأوقات الصعبة.`,
    bodyEn: `Gold is a unique asset. Unlike companies that produce profits or sukuk that pay a yield, gold doesn't "produce" anything. Its value comes from its scarcity and historical trust. So, what is its role in your portfolio?

A store of value and crisis hedge
Historically, gold is seen as a safe haven during geopolitical crises, hyperinflation, and when market confidence in fiat currencies drops. When paper assets lose value, gold tends to hold its purchasing power.

Not a growth engine
Gold pays no dividends. Your only return comes from selling it for more than you paid. Over the long term (decades), equities vastly outperform gold in terms of growth and wealth building.

Suggested Allocation
For most investors, gold serves as portfolio "insurance" rather than a primary asset. Many experts recommend allocating between 5% and 10% maximum of your total portfolio to gold to dampen volatility and provide protection during hard times.`
  }
];
