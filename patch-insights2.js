const fs = require('fs');
let content = fs.readFileSync('artifacts/thamar-finance/src/data/mock-insights.ts', 'utf8');

const newArticles = `  ,
  {
    id: 'market-terminology',
    category: 'market',
    readTimeMinutes: 7,
    date: '2024-06-01',
    titleAr: 'المصطلحات المالية: لغة السوق',
    titleEn: 'Financial Terminology: The Language of the Market',
    summaryAr: 'دليل مبسط لأهم المصطلحات التي تحتاجها لفهم ما يحدث في السوق المالي.',
    summaryEn: 'A simplified guide to the most important terms you need to understand what happens in the financial market.',
    blocks: [
      {
        type: 'text',
        contentAr: 'هل تشعر بالضياع عند سماع المحللين الماليين يتحدثون؟ لست وحدك. عالم المال مليء بالمصطلحات المعقدة، ولكن بمجرد فهم الأساسيات، يصبح الأمر بسيطاً جداً. إليك أهم المصطلحات التي يجب أن تعرفها:',
        contentEn: 'Do you feel lost when you hear financial analysts speak? You are not alone. The financial world is full of complex jargon, but once you understand the basics, it becomes very simple. Here are the most important terms you should know:'
      },
      {
        type: 'infographic',
        id: 'term-cards'
      },
      {
        type: 'text',
        contentAr: 'هذه المصطلحات هي أدواتك الأساسية. كلما قرأت أو سمعت تحليلاً مالياً، تذكر هذه المفاهيم وستجد أن الصورة أصبحت أوضح بكثير.',
        contentEn: 'These terms are your basic tools. Whenever you read or hear financial analysis, remember these concepts and you will find the picture much clearer.'
      }
    ]
  },
  {
    id: 'how-market-works',
    category: 'market',
    readTimeMinutes: 5,
    date: '2024-06-03',
    titleAr: 'ما هو السوق المالي وكيف يعمل؟',
    titleEn: 'What is the Financial Market and How Does it Work?',
    summaryAr: 'العرض والطلب هما المحركان الأساسيان لجميع الأسواق. اكتشف كيف يتم تحديد أسعار الأصول.',
    summaryEn: 'Supply and demand are the main drivers of all markets. Discover how asset prices are determined.',
    blocks: [
      {
        type: 'text',
        contentAr: 'تخيل سوق الخضار المحلي. هناك بائعون لديهم منتجات (عرض)، وهناك مشترون يريدون هذه المنتجات (طلب). السوق المالي يعمل بنفس الطريقة بالضبط، ولكن بدلاً من الخضار، يتم تداول الأسهم والصكوك والأصول الأخرى.\\n\\nالسعر ببساطة هو نقطة الالتقاء بين ما يطلبه البائع وما يدفعه المشتري.',
        contentEn: 'Imagine your local vegetable market. There are sellers with produce (supply), and buyers who want that produce (demand). The financial market works exactly the same way, but instead of vegetables, stocks, sukuk, and other assets are traded.\\n\\nThe price is simply the meeting point between what a seller asks and what a buyer is willing to pay.'
      },
      {
        type: 'infographic',
        id: 'supply-demand'
      },
      {
        type: 'text',
        contentAr: 'فهم العرض والطلب يفسر لك لماذا ترتفع أسعار الشركات عندما تعلن عن أرباح جيدة (يزيد الطلب) ولماذا تنخفض عندما تكون هناك أخبار سلبية (يزيد العرض من قبل البائعين الخائفين).',
        contentEn: 'Understanding supply and demand explains why companies\\' prices rise when they announce good profits (demand increases) and why they fall when there is negative news (supply increases from fearful sellers).'
      }
    ]
  },
  {
    id: 'reading-market-data',
    category: 'market',
    readTimeMinutes: 6,
    date: '2024-06-05',
    titleAr: 'كيف تقرأ بيانات السوق المالي؟',
    titleEn: 'How to Read Financial Market Data?',
    summaryAr: 'المؤشرات، الأسعار، وحجم التداول. تفكيك الشاشة المعقدة إلى معلومات يمكنك استخدامها.',
    summaryEn: 'Indices, prices, and trading volume. Decoding the complex screen into usable information.',
    blocks: [
      {
        type: 'text',
        contentAr: 'عندما تنظر إلى شاشة التداول لأول مرة، قد تبدو كأنها شفرة معقدة من الأرقام والألوان. لكنها في الواقع تخبرك بقصة بسيطة عن حالة السوق في تلك اللحظة.',
        contentEn: 'When you look at a trading screen for the first time, it might look like a complex cipher of numbers and colors. But it actually tells a simple story about the state of the market at that moment.'
      },
      {
        type: 'infographic',
        id: 'market-anatomy'
      },
      {
        type: 'text',
        contentAr: 'المؤشر (Index) هو رقم يمثل أداء مجموعة من الشركات. إذا ارتفع المؤشر، فهذا يعني أن أغلب الشركات أو أهمها قد ارتفعت قيمتها. الأخضر يعني ارتفاعاً عن سعر الإغلاق السابق، والأحمر يعني انخفاضاً.',
        contentEn: 'An Index is a number representing the performance of a group of companies. If the index rises, it means most or the most important companies have increased in value. Green means a rise from the previous closing price, and red means a drop.'
      },
      {
        type: 'infographic',
        id: 'order-types'
      }
    ]
  }
];`;

content = content.replace(/\];\s*$/, newArticles);
fs.writeFileSync('artifacts/thamar-finance/src/data/mock-insights.ts', content);
