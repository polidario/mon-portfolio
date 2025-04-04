<script setup lang="ts">
import { onMounted } from 'vue';
import { useHead } from '@unhead/vue';

onMounted(() => {
  useHead({
    meta: [
      {
        name: 'description',
        content: 'Page not found'
      },
      {
        name: 'keywords',
        content: '404, page not found'
      }
    ]
  });
});
</script>

<template>
  <div class="page-404">
    <h1>Page not found</h1>
    <p>The page you are looking for does not exist.</p>
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
    