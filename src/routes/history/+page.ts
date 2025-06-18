import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => {
  try {
    // Get all markdown files from the content/blog directory
    const allPostFiles = import.meta.glob('../../content/history/*.md');

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
          slug: path.split('/').pop()?.replace('.md', ''),
          content: postModule.default,
        });
      }
    }

    const sortedPosts = posts.sort((a, b) =>
      new Date(b.start).getTime() - new Date(a.start).getTime()
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