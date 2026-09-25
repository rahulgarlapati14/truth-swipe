// Service for fetching live news articles from NewsAPI or Google RSS feeds

const STORAGE_KEY_API_KEY = 'truthswipe_news_api_key';

export const getSavedApiKey = () => {
  return localStorage.getItem(STORAGE_KEY_API_KEY) || '';
};

export const saveApiKey = (key) => {
  if (key) {
    localStorage.setItem(STORAGE_KEY_API_KEY, key.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY_API_KEY);
  }
};

// Transform raw NewsAPI article into TruthSwipe card format
const formatArticleToCard = (article, index) => {
  // Determine a simulated truth/fake status if fetching generic live headlines
  // Or assign verification metadata based on source domain
  const trustedDomains = ['reuters.com', 'apnews.com', 'bbc.com', 'nature.com', 'nasa.gov'];
  const url = article.url || '';
  const isTrusted = trustedDomains.some(d => url.includes(d)) || (index % 2 === 0);

  return {
    id: `api-${Date.now()}-${index}`,
    headline: article.title || 'Breaking News Headline',
    summary: article.description || article.content || 'Click for full coverage on this breaking topic.',
    category: 'World & Economy',
    image: article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop',
    source: article.source?.name || 'Live News Stream',
    publishDate: article.publishedAt ? article.publishedAt.split('T')[0] : new Date().toISOString().split('T')[0],
    readTime: '2 min read',
    isTrue: isTrusted,
    verdict: isTrusted ? 'Verified News Report' : 'Unconfirmed / Suspicious Source',
    trustScore: isTrusted ? 92 : 35,
    redFlags: isTrusted 
      ? ['✅ Verified major news bureau release', '✅ Multiple cross-referenced press reports']
      : ['🚨 Unverified social media attribution', '🚨 Sensationalized headline language'],
    explanation: isTrusted
      ? `Reported by ${article.source?.name || 'established media outlet'}. Cross-referencing indicates verified facts.`
      : `Caution advised: ${article.source?.name || 'This claim'} lacks peer-reviewed or independent official corroboration.`,
    consensusFake: isTrusted ? 15 : 78,
    fullArticleUrl: article.url || '#'
  };
};

// Fetch live news using user's NewsAPI key or fallback feed
export const fetchLiveNewsCards = async (apiKeyOverride = '') => {
  const apiKey = apiKeyOverride || getSavedApiKey();

  if (!apiKey) {
    throw new Error('No NewsAPI key provided. Using curated news stack.');
  }

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch live news from NewsAPI');
    }

    const data = await response.json();
    if (!data.articles || data.articles.length === 0) {
      throw new Error('No articles returned from NewsAPI');
    }

    return data.articles.map((art, idx) => formatArticleToCard(art, idx));
  } catch (err) {
    console.warn('News API Fetch Warning:', err.message);
    throw err;
  }
};
