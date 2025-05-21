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

// Default images for different types of news
const DEFAULT_IMAGES = {
  incident: '/images/blog/default-incident.jpg',
  community: '/images/blog/default-community.jpg',
  default: '/images/blog/default-news.jpg'
};

// Fallback data for when RSS feeds are not available
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

const PAGE_SIZE = 5;

async function fetchFromAPI(): Promise<NewsItem[]> {
  try {
    const response = await axios.get('/api/news');
    return response.data;
  } catch (error) {
    console.error('Error fetching news from API:', error);
    return [];
  }
}

export async function fetchNews(): Promise<NewsItem[]> {
  try {
    const apiResults = await fetchFromAPI();

    // If we have results from the API, return them
    if (apiResults.length > 0) {
      const uniqueNews = removeDuplicates(apiResults);
      return uniqueNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    // If no results from API, return fallback data
    console.warn('No results from API, using fallback data');
    return fallbackNews;
  } catch (error: unknown) {
    console.error('Error in fetchNews:', error);
    return fallbackNews;
  }
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