import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

// RSS feed sources - US focused
const RSS_FEEDS = [
  {
    url: 'https://rss.cnn.com/rss/cnn_us.rss',
    name: 'CNN US'
  },
  {
    url: 'https://www.npr.org/rss/rss.php?id=1001', // NPR US News
    name: 'NPR'
  },
  {
    url: 'https://www.usatoday.com/news/top-stories/rss/',
    name: 'USA Today'
  },
  {
    url: 'https://www.latimes.com/local/rss2.0.xml',
    name: 'LA Times'
  }
];

// Keywords for filtering relevant topics
const RELEVANT_KEYWORDS = [
  'community',
  'protection',
  'harassment',
  'incident',
  'safety',
  'crime',
  'law enforcement',
  'neighborhood',
  'security',
  'threat',
  'violence',
  'abuse',
  'stalking',
  'bullying',
  'discrimination',
  'hate crime',
  'domestic violence',
  'sexual harassment',
  'assault'
];

const MAX_ARTICLES = 20;
const MAX_DESCRIPTION_LENGTH = 150; // Maximum description length in characters
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'news');

// Ensure the images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Check if article is relevant to our topics
function isRelevantArticle(item: { title?: string; contentSnippet?: string; content?: string }): boolean {
  const searchText = `${item.title} ${item.contentSnippet || ''} ${item.content || ''}`.toLowerCase();
  return RELEVANT_KEYWORDS.some(keyword => searchText.includes(keyword.toLowerCase()));
}

// Truncate text to a maximum length
function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Download and save image
async function downloadAndSaveImage(imageUrl: string): Promise<string | null> {
  try {
    // Skip invalid URLs
    if (!imageUrl || !imageUrl.startsWith('http')) {
      return null;
    }

    // Validate URL format
    try {
      new URL(imageUrl);
    } catch {
      return null;
    }

    const response = await axios.get(imageUrl, { 
      responseType: 'arraybuffer',
      timeout: 5000, // 5 second timeout
      validateStatus: (status) => status === 200,
      maxContentLength: 5 * 1024 * 1024 // 5MB limit
    });
    
    const contentType = response.headers['content-type'];
    if (!contentType?.startsWith('image/')) {
      return null;
    }

    const extension = contentType.split('/')[1];
    if (!['jpeg', 'jpg', 'png', 'gif', 'webp'].includes(extension)) {
      return null;
    }

    const filename = `${uuidv4()}.${extension}`;
    const filepath = path.join(IMAGES_DIR, filename);
    
    fs.writeFileSync(filepath, response.data);
    return `/images/news/${filename}`;
  } catch (error) {
    // Only log actual errors, not expected failures
    if (axios.isAxiosError(error) && error.code !== 'ECONNABORTED') {
      console.error(`Error downloading image from ${imageUrl}:`, error.message);
    }
    return null;
  }
}

export async function GET() {
  try {
    const parser = new Parser();
    const allArticles = [];

    // Fetch from all RSS feeds in parallel
    const feedPromises = RSS_FEEDS.map(async (feed) => {
      try {
        console.log(`\n=== Fetching feed from ${feed.name} ===`);
        const feedData = await parser.parseURL(feed.url);
        
        // Filter and process relevant articles
        const relevantItems = feedData.items.filter(isRelevantArticle);
        console.log(`Found ${relevantItems.length} relevant articles in ${feed.name}`);

        const articlePromises = relevantItems.map(async item => {
          const imageUrl = item.enclosure?.url;
          
          const localImagePath = imageUrl ? await downloadAndSaveImage(imageUrl) : null;
          
          const processedItem = {
            id: item.guid || item.link || '',
            title: item.title || '',
            description: truncateText(item.contentSnippet || item.content || '', MAX_DESCRIPTION_LENGTH),
            url: item.link || '',
            imageUrl: localImagePath,
            source: feed.name,
            date: item.isoDate || item.pubDate || new Date().toISOString()
          };

          console.log('Processed relevant article:', {
            title: processedItem.title,
            source: processedItem.source
          });
          
          return processedItem;
        });

        return await Promise.all(articlePromises);
      } catch (error) {
        console.error(`Error fetching feed ${feed.url}:`, error);
        return [];
      }
    });

    const results = await Promise.all(feedPromises);
    allArticles.push(...results.flat());
    
    // Sort by date and limit to MAX_ARTICLES
    const sortedArticles = allArticles
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, MAX_ARTICLES);

    console.log(`\n=== Final Results ===`);
    console.log(`Total relevant articles found: ${sortedArticles.length}`);
    console.log('Articles with images:', sortedArticles.filter(article => article.imageUrl).length);
    
    return NextResponse.json(sortedArticles);
  } catch (error) {
    console.error('Error fetching RSS feeds:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
