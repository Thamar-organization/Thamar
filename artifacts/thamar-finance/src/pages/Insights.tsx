import { useState, useMemo, useEffect } from 'react';
import { Search, BookOpen, Clock, ChevronRight, ChevronLeft, Lightbulb, AlertTriangle, ArrowLeft, ArrowRight, BookMarked, Newspaper } from 'lucide-react';
import ThamarSidebar from '@/components/ThamarSidebar';
import useLanguagePreference from '@/hooks/use-language';
import { insightsData, insightCategories, dailyTip, disclaimer, type InsightCategory } from '@/data/mock-insights';

export default function Insights() {
  const [language, setLanguage] = useLanguagePreference();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<InsightCategory | 'all'>('all');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const isArabic = language === 'ar';

  // UI Text mapping
  const t = useMemo(() => ({
    pageTitle: isArabic ? 'معلومات اليوم والنصائح' : 'Today\'s Insights & Tips',
    pageSubtitle: isArabic 
      ? 'استثمر في معرفتك الماليّة. مقالات ونقاط رئيسية لتصبح مستثمراً واثقاً.'
      : 'Invest in your financial knowledge. Articles and key points to become a confident investor.',
    searchPlaceholder: isArabic ? 'ابحث في المقالات...' : 'Search articles...',
    readTime: isArabic ? 'دقائق للقراءة' : 'min read',
    readArticle: isArabic ? 'اقرأ المقال' : 'Read Article',
    backToList: isArabic ? 'العودة للمقالات' : 'Back to Insights',
    noResults: isArabic ? 'لا توجد مقالات تطابق بحثك.' : 'No articles match your search.',
  }), [isArabic]);

  // Derived filtered content
  const filteredArticles = useMemo(() => {
    return insightsData.filter((article) => {
      const matchSearch = (article.titleAr + ' ' + article.titleEn + ' ' + article.summaryAr + ' ' + article.summaryEn)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchCategory = activeCategory === 'all' || article.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, activeCategory]);

  const selectedArticle = useMemo(() => {
    return insightsData.find(a => a.id === selectedArticleId);
  }, [selectedArticleId]);

  // Scroll to top when opening article
  useEffect(() => {
    if (selectedArticleId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedArticleId]);

  return (
    <div className={`app-shell grain flex flex-col ${isArabic ? 'rtl' : 'ltr'}`} lang={language}>
      <ThamarSidebar 
        language={language} 
        active="insights" 
        onLanguageToggle={() => setLanguage(isArabic ? 'en' : 'ar')} 
      />

      <main className={`relative z-10 w-full flex-1 pb-16 transition-all duration-300 ${isArabic ? 'lg:pr-[280px]' : 'lg:pl-[280px]'}`}>
        <div className="mx-auto max-w-[1000px] px-4 py-6 sm:px-8 lg:py-12">
          
          {selectedArticle ? (
            // Full Article View
            <div className="rise delay-1">
              <button
                type="button"
                onClick={() => setSelectedArticleId(null)}
                className="group mb-8 flex items-center gap-2 rounded-full bg-[var(--leaf-pale)] px-5 py-2.5 text-sm font-semibold text-[var(--olive-deep)] shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--leaf)]"
                data-testid="button-back-to-list"
                aria-label={t.backToList}
              >
                {isArabic ? <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /> : <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />}
                {t.backToList}
              </button>

              <article className="surface overflow-hidden rounded-[2.5rem] bg-[var(--paper)] p-8 sm:p-12" data-testid={`article-full-${selectedArticle.id}`}>
                <div className="mb-8 flex items-center gap-4 border-b border-[var(--line)] pb-8">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--olive)]/10 text-[var(--olive)]">
                    <BookOpen size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <span className="rounded-lg bg-[var(--leaf)] px-2.5 py-1 text-[10px] font-bold tracking-wider text-[var(--olive-deep)]">
                        {insightCategories[language][selectedArticle.category]}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--muted-foreground)]">
                        <Clock size={12} />
                        <span>{selectedArticle.readTimeMinutes} {t.readTime}</span>
                      </div>
                    </div>
                    <h1 className="font-display text-2xl font-bold leading-tight tracking-[-.02em] text-[var(--ink)] sm:text-3xl lg:text-4xl" data-testid="heading-article-title">
                      {isArabic ? selectedArticle.titleAr : selectedArticle.titleEn}
                    </h1>
                  </div>
                </div>

                <div className="prose max-w-none text-base leading-loose text-[var(--ink)] opacity-90 prose-p:mb-6 prose-headings:font-display prose-headings:text-[var(--olive-deep)] prose-headings:font-bold">
                  {(isArabic ? selectedArticle.bodyAr : selectedArticle.bodyEn).split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </article>
            </div>
          ) : (
            // List View
            <>
              <header className="rise delay-1 mb-10 lg:mb-12">
                <h1 className="font-display text-3xl font-bold tracking-[-.04em] text-[var(--ink)] sm:text-4xl lg:text-[2.75rem]">
                  {t.pageTitle}
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted-foreground)]">
                  {t.pageSubtitle}
                </p>
              </header>

              {/* Daily Tip Card */}
              <section className="rise delay-2 mb-10">
                <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[var(--olive)] to-[var(--olive-deep)] p-6 text-[var(--paper)] shadow-[0_15px_30px_rgba(88,98,52,0.18)] sm:p-8" data-testid="card-daily-tip">
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[var(--gold)]/20 blur-3xl" aria-hidden="true" />
                  <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--gold-soft)] text-[var(--olive-deep)] shadow-inner">
                      <Lightbulb size={26} strokeWidth={2} />
                    </div>
                    <div>
                      <h2 className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--gold-soft)]">
                        {isArabic ? dailyTip.titleAr : dailyTip.titleEn}
                      </h2>
                      <p className="text-lg font-medium leading-relaxed sm:text-xl">
                        {isArabic ? dailyTip.contentAr : dailyTip.contentEn}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Filters and Search */}
              <div className="rise delay-3 sticky top-16 z-20 mb-8 flex flex-col gap-4 bg-[var(--background)]/90 py-4 backdrop-blur-md lg:top-0 lg:flex-row lg:items-center lg:justify-between">
                <div className="mobile-scroll flex flex-nowrap items-center gap-2 pb-2 lg:pb-0" role="tablist" aria-label={isArabic ? 'تصفية حسب الفئة' : 'Filter by category'}>
                  {(Object.entries(insightCategories[language]) as [InsightCategory | 'all', string][]).map(([key, label]) => (
                    <button
                      key={key}
                      role="tab"
                      aria-selected={activeCategory === key}
                      onClick={() => setActiveCategory(key)}
                      className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] ${
                        activeCategory === key
                          ? 'bg-[var(--olive)] text-[var(--paper)] shadow-md'
                          : 'bg-[var(--leaf-pale)] text-[var(--olive-deep)] hover:bg-[var(--leaf)]'
                      }`}
                      data-testid={`filter-category-${key}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full lg:w-72">
                  <div className="pointer-events-none absolute inset-y-0 flex items-center px-4 text-[var(--olive)] opacity-70" aria-hidden="true" style={{ [isArabic ? 'right' : 'left']: 0 }}>
                    <Search size={18} />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full rounded-2xl border-none bg-[var(--paper)] py-3 text-sm text-[var(--ink)] shadow-sm ring-1 ring-[var(--line)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--olive)]"
                    style={{ paddingInlineStart: '2.75rem', paddingInlineEnd: '1rem' }}
                    aria-label={t.searchPlaceholder}
                    data-testid="input-search-insights"
                  />
                </div>
              </div>

              {/* Articles Grid */}
              <div className="rise delay-4">
                {filteredArticles.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {filteredArticles.map((article) => (
                      <article 
                        key={article.id} 
                        className="surface soft-hover group relative flex cursor-pointer flex-col overflow-hidden rounded-[2rem] p-6 focus-within:ring-2 focus-within:ring-[var(--gold)]"
                        onClick={() => setSelectedArticleId(article.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedArticleId(article.id);
                          }
                        }}
                        tabIndex={0}
                        role="button"
                        data-testid={`card-article-${article.id}`}
                        aria-label={`${isArabic ? article.titleAr : article.titleEn}`}
                      >
                        <div className="mb-5 flex items-center justify-between">
                          <span className="rounded-lg bg-[var(--leaf-pale)] px-3 py-1.5 text-xs font-bold text-[var(--olive-deep)]">
                            {insightCategories[language][article.category]}
                          </span>
                          <span className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--muted-foreground)]">
                            <Clock size={12} />
                            {article.readTimeMinutes} {t.readTime}
                          </span>
                        </div>
                        
                        <h3 className="font-display text-xl font-bold leading-snug tracking-[-.02em] text-[var(--ink)] group-hover:text-[var(--olive)] transition-colors">
                          {isArabic ? article.titleAr : article.titleEn}
                        </h3>
                        
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted-foreground)] opacity-90">
                          {isArabic ? article.summaryAr : article.summaryEn}
                        </p>

                        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[var(--olive)]">
                          <span>{t.readArticle}</span>
                          <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                            {isArabic ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-[var(--line)] bg-[var(--paper)]/50 py-20 text-center" data-testid="empty-state-insights">
                    <BookMarked size={48} className="mb-4 text-[var(--line)]" strokeWidth={1.5} />
                    <p className="text-lg font-medium text-[var(--muted-foreground)]">{t.noResults}</p>
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <div className="rise delay-5 mt-12 rounded-2xl bg-[var(--paper)] p-5 border border-[var(--line)] shadow-sm flex items-start gap-4">
                <AlertTriangle size={20} className="shrink-0 text-[var(--gold)] mt-0.5" />
                <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)] opacity-90 font-medium">
                  {isArabic ? disclaimer.ar : disclaimer.en}
                </p>
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
}
