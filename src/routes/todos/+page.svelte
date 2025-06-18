<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ content, metadata, slug } = data);
</script>

<svelte:head>
  <title>{metadata?.title || 'Blog Post'}</title>
  <meta name="description" content={metadata?.excerpt || 'Blog post'}>
</svelte:head>

<div class="blog-container">
  <article class="blog-article">
    <svelte:component this={content} />

    <div class="blog-footer">
      <div class="tags-container">
        {#each metadata?.tags || [] as tag}
          <span class="tag">
            {tag}
          </span>
        {/each}
      </div>

      <div class="metadata">
        <p>Published on {new Date(metadata.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</p>
        {#if metadata.author}
          <p>By {metadata.author}</p>
        {/if}
      </div>
    </div>
  </article>
</div>

<style lang="postcss">
@reference "../../app.css";

.blog-container {
  @apply max-w-4xl mx-auto p-8;
}

.blog-article {
  @apply prose prose-lg prose-gray max-w-none;
  @apply prose-headings:text-gray-900;
  @apply prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline;
  @apply prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded;
  @apply prose-pre:bg-gray-900 prose-pre:text-gray-100;
}

.blog-footer {
  @apply mt-12 pt-8 border-t border-gray-200;
}

.tags-container {
  @apply flex flex-wrap gap-2 mb-4;
}

.tag {
  @apply bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm;
}

.metadata {
  @apply text-sm text-gray-600;
}
</style>