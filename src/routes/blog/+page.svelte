<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ posts, totalPosts } = data);
</script>

<svelte:head>
  <title>Blog - Me</title>
  <meta name="description" content="Personal blog about development, technology, and learning">
</svelte:head>

<div class="blog-container">
  <div class="page-header">
    <h1 class="page-title">Blog</h1>
    <p class="page-subtitle">
      {totalPosts} {totalPosts === 1 ? 'post' : 'posts'} published
    </p>
  </div>

  {#if posts.length > 0}
    <div class="posts-list">
      {#each posts as post}
        <article class="post-card">
          <h2 class="post-title-link">
            <a href="/blog/{post.slug}">
              {post.title}
            </a>
          </h2>

          <div class="post-date-range blog-metadata">
            <time>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {#if post.author}
              <span>by {post.author}</span>
            {/if}
          </div>

          <p class="post-excerpt">{post.excerpt}</p>

          <div class="flex justify-between items-center">
            <div class="blog-tags-container">
              {#each post.tags || [] as tag}
                <span class="blog-tag">
                  {tag}
                </span>
              {/each}
            </div>

            <a
              href="/blog/{post.slug}"
              class="read-more-link"
              aria-label="Read complete article: {post.title}"
            >
              Continue reading
              <svg
                class="read-more-arrow w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
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