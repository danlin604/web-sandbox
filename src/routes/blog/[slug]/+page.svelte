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
  <article class="blog-prose">
    <svelte:component this={content} />

    <!-- Post metadata footer -->
    <div class="blog-footer">
      <div class="blog-tags-container">
        {#each metadata?.tags || [] as tag}
          <span class="blog-tag">
            {tag}
          </span>
        {/each}
      </div>

      <div class="blog-metadata">
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