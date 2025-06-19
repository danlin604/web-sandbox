import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types.js';

export const prerender = true;

export const load: PageLoad = async ({ params }) => {
  const { slug } = params;

  try {
    const allPostFiles = import.meta.glob('../../../content/blog/*.md');

    // Iterate through all files to find matching post
    for (const [path, resolver] of Object.entries(allPostFiles)) {
      const postModule = await resolver();
      const metadata = (postModule as any).metadata;

      // Check if this post matches the slug
      if (metadata?.slug === slug) {
        return {
          content: postModule.default,
          metadata,
          slug,
          filename: path.split('/').pop(),
        };
      }
    }

    // If no matching post found, throw 404
    throw error(404, `Blog post '${slug}' not found`);
  } catch (e) {
    console.error('Error loading blog post:', e);
    throw error(404, 'Post not found');
  }
};
