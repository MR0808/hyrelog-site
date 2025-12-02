import { BlogIndexClient } from './BlogIndexClient';
import { getAllBlogPosts, getAllCategories } from '@/lib/blog';

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getAllBlogPosts(),
    getAllCategories(),
  ]);

  return <BlogIndexClient initialPosts={posts} categories={categories} />;
}

