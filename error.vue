<script setup lang="ts">
</script>

<template>
    <div class="page-404">
        <h1>Error</h1>
        <p>The page you are looking for does not exist.</p>
        <NuxtLink to="/">Go back home</NuxtLink>
    </div>
</template>

<style lang="scss">
.page-404 {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: var(--space-5);

  h1 {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    width: 100%;
    color: var(--color-white);
  }

  p {
    font-size: 1.25rem;
    text-align: center;
    color: var(--color-gray-500);
  }
}
</style>
    