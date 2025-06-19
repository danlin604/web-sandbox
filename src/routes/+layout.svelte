<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import { base } from '$app/paths'

  let { children } = $props();
  let mobileMenuOpen = $state(false);

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<section class="main-section">
  <header class="header">
    <nav aria-label="Global" class="nav-container">
      <div class="nav-wrapper">
        <!-- Mobile hamburger button -->
        <button
          class="mobile-menu-button sm:hidden"
          onclick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {#if mobileMenuOpen}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            {/if}
          </svg>
        </button>

        <!-- Desktop Navigation Links -->
        <ul class="nav-list">
          <li><a class="nav-link" href="{base}/">Home</a></li>
          <li><a class="nav-link" href="{base}/about">About</a></li>
          <li><a class="nav-link" href="{base}/blog">Blog</a></li>
          <li><a class="nav-link" href="{base}/todos">TODOs</a></li>
          <li><a class="nav-link" href="{base}/history">History</a></li>
        </ul>

        <!-- Theme Toggle -->
        <div class="theme-toggle-wrapper">
          <ThemeToggle />
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      {#if mobileMenuOpen}
        <div class="mobile-nav">
          <ul class="mobile-nav-list">
            <li><a class="mobile-nav-link" href="{base}/">Home</a></li>
            <li><a class="mobile-nav-link" href="{base}/about" >About</a></li>
            <li><a class="mobile-nav-link" href="{base}/blog">Blog</a></li>
            <li><a class="mobile-nav-link" href="{base}/todos">TODOs</a></li>
            <li><a class="mobile-nav-link" href="{base}/history">History</a></li>
          </ul>
        </div>
      {/if}
    </nav>
  </header>

  <main class="flex-1">
    {@render children()}
  </main>

  <footer class="footer">
    <div class="footer-content">
      <p class="footer-text">© 2025 Me</p>
    </div>
  </footer>
</section>

<style lang="postcss">
  @reference '../app.css';

  .header {
    @apply bg-white border-b border-gray-200 sticky top-0 z-10;
  }

  .nav-container {
    @apply max-w-4xl mx-auto;
  }

  .nav-wrapper {
    @apply flex items-center justify-between px-4 py-2;
  }

  .mobile-menu-button {
    @apply p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-300;
  }

  .nav-list {
    @apply hidden sm:flex flex-1 items-center justify-center gap-1;
  }

  .nav-link {
    @apply px-4 py-2 min-h-[44px] inline-flex items-center rounded-lg font-medium;
    @apply text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-300;
  }

  .theme-toggle-wrapper {
    @apply flex items-center;
  }

  .mobile-nav {
    @apply sm:hidden border-t border-gray-200 bg-white;
  }

  .mobile-nav-list {
    @apply flex flex-col gap-4 p-4;
  }

  .mobile-nav-list li {
    @apply flex justify-center;
  }

  .mobile-nav-link {
    @apply px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg font-medium transition-colors duration-300;
    @apply text-center w-full;
  }

  .main-section {
    @apply flex flex-1 flex-col justify-between bg-gray-50 min-h-screen;
  }

  .footer {
    @apply bg-white border-t border-gray-200;
  }

  .footer-content {
    @apply max-w-4xl mx-auto px-4 py-6 text-center;
  }

  .footer-text {
    @apply text-sm text-gray-600;
  }
</style>