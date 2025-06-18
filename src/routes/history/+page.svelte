<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ posts, totalPosts } = data);

  // Track expanded state for each post
  let expandedPosts: Record<string, boolean> = {};

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      // month: 'long',
      // day: 'numeric',
      timeZone: 'UTC',
    });
  };

  // Toggle expanded state for a post
  const toggleExpanded = (slug: string) => {
    expandedPosts[slug] = !expandedPosts[slug];
  };
</script>

<svelte:head>
  <title>History</title>
  <meta name="description" content="Personal blog about development, technology, and learning">
</svelte:head>

<div class="blog-container">
  <div class="page-header">
    <h1 class="page-title">History</h1>
    <p class="page-subtitle">
      {totalPosts} {totalPosts === 1 ? 'post' : 'posts'} published
    </p>
  </div>

  {#if posts.length > 0}
    <div class="posts-list">
      {#each posts as post}
        <article class="post-card">
          <h2 class="post-title-link">
            {post.title}
          </h2>

          <div class="post-date-range blog-metadata">
            <time>{formatDate(post.start)}</time>
            <span>-</span>
            <time>{post.end ? formatDate(post.end) : 'Present'}</time>

            {#if post.author}
              <span>by {post.author}</span>
            {/if}
          </div>

          <div class="blog-tags-container">
            <span class="blog-metadata mr-2 flex items-center">Roles:</span>
            {#each post.roles || [] as role}
              <span class="blog-tag">
                {role}
              </span>
            {/each}
          </div>

          <div>
            <div class="blog-tags-container">
              <span class="blog-metadata mr-2 flex items-center">Tech:</span>
              {#each post.tags || [] as tag}
                <span class="blog-tag">
                  {tag}
                </span>
              {/each}
            </div>

            <div class="post-excerpt">
              <p>{post.excerpt}</p>
            </div>

            {#if expandedPosts[post.slug]}
              <div class="expandable-content" id="content-{post.slug}">
                <div class="blog-prose">
                  <svelte:component this={post.content} />
                </div>
              </div>
            {/if}

            <button
              onclick={() => toggleExpanded(post.slug)}
              class="content-toggle"
              aria-expanded={expandedPosts[post.slug]}
              aria-controls="content-{post.slug}"
              aria-label="{expandedPosts[post.slug] ? 'Collapse' : 'Expand'} {post.title}"
            >
              {expandedPosts[post.slug] ? 'Show less' : 'Show more'}
              <svg
                class="content-toggle-icon w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </article>
      {/each}
    </div>
  {:else}
    <div class="empty-state">
      <h2 class="empty-state-title">No posts yet</h2>
      <p class="empty-state-message">Check back soon for new content!</p>
    </div>
  {/if}
</div>