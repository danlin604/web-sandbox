import type { PageLoad } from './$types.js';

export const prerender = true;

export const load: PageLoad = async () => {
  try {
    // Get all markdown files from the content/blog directory
    const allPostFiles = import.meta.glob('../../content/blog/*.md');

    const posts = [];

    // Load all posts and extract metadata
    for (const [path, resolver] of Object.entries(allPostFiles)) {
      const postModule = await resolver();
      const metadata = (postModule as any).metadata;

      // Only include published posts
      if (metadata && metadata.published !== false) {
        posts.push({
          ...metadata,
          filename: path.split('/').pop(),
        });
      }
    }

    // Sort posts by date (newest first)
    const sortedPosts = posts.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return {
      posts: sortedPosts,
      totalPosts: sortedPosts.length,
    };
  } catch (e) {
    console.error('Error loading blog posts:', e);
    return {
      posts: [],
      totalPosts: 0,
    };
  }
};