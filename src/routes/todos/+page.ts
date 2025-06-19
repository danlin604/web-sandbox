import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types.js';

export const prerender = true;

export const load: PageLoad = async () => {
  try {
    const postModule = await import('../../content/todos/todos.md');
    const metadata = (postModule as any).metadata;

    return {
      metadata: metadata || {},
      content: postModule.default,
      slug: metadata?.slug ?? 'todos',
      filename: 'todos.md',
    };
  } catch (e) {
    console.error('Error loading todos.md:', e);
    throw error(404, 'TODOs not found');
  }
};