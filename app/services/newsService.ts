import axios from 'axios';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  source: string;
  date: string;
}

interface NewsApiArticle {
  url: string;
  title: string;
  description: string | null;
  urlToImage: string | null;
  source: {
    name: string;
  };
  publishedAt: string;
}

// Default images for different types of news
const DEFAULT_IMAGES = {
  incident: '/images/blog/default-incident.jpg',
  community: '/images/blog/default-community.jpg',
  default: '/images/blog/default-news.jpg'
};

// Fallback data for when APIs are not available
const fallbackNews: NewsItem[] = [
  {
    id: "1",
    title: "Community Safety Meeting",
    description: "Join us for our monthly community safety meeting to discuss local concerns and solutions.",
    url: "#",
    imageUrl: DEFAULT_IMAGES.community,
    source: "Community News",
    date: new Date().toISOString()
  },
  {
    id: "2",
    title: "Know Your Rights Workshop",
    description: "Free workshop on understanding your rights and how to protect them in various situations.",
    url: "#",
    imageUrl: DEFAULT_IMAGES.community,
    source: "Community Updates",
    date: new Date().toISOString()
  },
  {
    id: "3",
    title: "New Support Network Launches",
    description: "Local organizations come together to create a stronger support network for our community.",
    url: "#",
    imageUrl: DEFAULT_IMAGES.community,
    source: "Community Updates",
    date: new Date().toISOString()
  }
];

const NEWS_API_KEY = '4c1ca46a915049cdb36663b64d4419a3';
const PAGE_SIZE = 5;
const MAX_ARTICLES = 20; // Maximum number of articles to fetch at once

// Simplified keywords to avoid query length issues
const keywords = [
  'community safety',
  'community protection',
  'neighborhood watch',
  'community security',
  'community incident'
].join(' OR ');

async function fetchFromNewsAPI(): Promise<NewsItem[]> {
  try {
    // Fetch maximum number of articles at once
    const params = new URLSearchParams({
      q: keywords,
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: MAX_ARTICLES.toString(),
      apiKey: NEWS_API_KEY
    });

    const response = await axios.get(
      `https://newsapi.org/v2/everything?${params.toString()}`
    );

    if (!response.data || !response.data.articles) {
      console.warn('No articles found in API response');
      return [];
    }

    return processNewsApiArticles(response.data.articles);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        console.error('Invalid request to News API:', error.response.data);
      } else if (error.response?.status === 401) {
        console.error('Unauthorized access to News API - check API key');
      } else if (error.response?.status === 429) {
        console.error('Rate limit exceeded for News API');
      } else {
        console.error('Error fetching from News API:', error.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    return [];
  }
}

export async function fetchNews(): Promise<NewsItem[]> {
  try {
    const newsApiResults = await fetchFromNewsAPI();

    // If we have results from the API, return them
    if (newsApiResults.length > 0) {
      const uniqueNews = removeDuplicates(newsApiResults);
      return uniqueNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    // If no results from API, return fallback data
    console.warn('No results from news API, using fallback data');
    return fallbackNews;
  } catch (error: unknown) {
    console.error('Error in fetchNews:', error);
    return fallbackNews;
  }
}

function getDefaultImage(text: string): string {
  const lowerText = text.toLowerCase();
  if (lowerText.includes('incident') || lowerText.includes('alert') || lowerText.includes('warning') || lowerText.includes('emergency')) {
    return DEFAULT_IMAGES.incident;
  }
  if (lowerText.includes('community') || lowerText.includes('meeting') || lowerText.includes('workshop') || lowerText.includes('program')) {
    return DEFAULT_IMAGES.community;
  }
  return DEFAULT_IMAGES.default;
}

function processNewsApiArticles(articles: NewsApiArticle[]): NewsItem[] {
  return articles.map(article => ({
    id: article.url,
    title: article.title,
    description: article.description || '',
    url: article.url,
    imageUrl: article.urlToImage || getDefaultImage(article.title + ' ' + article.description),
    source: article.source.name,
    date: article.publishedAt
  }));
}

function removeDuplicates(news: NewsItem[]): NewsItem[] {
  const seen = new Set();
  return news.filter(item => {
    const duplicate = seen.has(item.title);
    seen.add(item.title);
    return !duplicate;
  });
}

// Cache news results for 1 hour
let cachedNews: NewsItem[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export async function getNews(page: number = 1): Promise<NewsItem[]> {
  const now = Date.now();
  
  // If cache is empty or expired, fetch new data
  if (cachedNews.length === 0 || now - lastFetchTime > CACHE_DURATION) {
    const news = await fetchNews();
    cachedNews = news;
    lastFetchTime = now;
  }

  // Calculate start and end indices for the requested page
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  
  // Return the slice of news for the requested page
  return cachedNews.slice(startIndex, endIndex);
} 