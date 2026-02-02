export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  date: string;
  image: string;
}

export interface ApiBlogPost {
  id: number;
  user_id: number;
  title: string;
  description: string;
  content_text: string;
  content_html: string;
  photo_url: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  success: boolean;
  total_blogs: number;
  message: string;
  offset: number;
  limit: number;
  blogs: ApiBlogPost[];
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch('https://api.slingacademy.com/v1/sample-data/blog-posts?offset=0&limit=10');
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    const data: ApiResponse = await response.json();
    if (!data.success) {
      throw new Error(data.message || 'API request failed');
    }
    return data.blogs.map((post) => ({
      id: post.id.toString(),
      title: post.title,
      description: post.description,
      content: post.content_text,
      category: post.category,
      date: new Date(post.created_at).toISOString().split('T')[0],
      image: post.photo_url,
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

export function getCategories(posts: BlogPost[]): string[] {
  const categories = new Set(posts.map((post) => post.category));
  return ['All', ...Array.from(categories)];
}
