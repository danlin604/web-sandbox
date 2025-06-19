<!-- src/routes/+page.svelte -->
<svelte:head>
  <title>Web Sandbox</title>
  <meta name="description" content="A personal web development sandbox">
</svelte:head>

<div class="page-container">
  <h1>Home</h1>
  <p>Some placeholder text.</p>
</div>

<style lang="postcss">
@reference "../app.css";

.page-container {
  @apply max-w-4xl mx-auto p-8;
}

.page-container h1 {
  @apply text-4xl font-bold text-gray-900 mb-4;
}

.page-container p {
  @apply text-gray-600 mb-4;
}
</style>