<script setup lang="ts">
import { onMounted } from 'vue';
import { useHead } from '@unhead/vue';

onMounted(() => {
  useHead({
    meta: [
      {
        name: 'description',
        content: 'Learn more about how I got started as a software engineer, my experiences, skills and tech stacks.'
      },
      {
        name: 'keywords',
        content: 'about, bernard polidario, software engineer, frontend developer, shopify developer'
      }
    ]
  });
});
</script>

<template>
  <div class="about">
    <h1>This page is still under construction</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

  .about h1 {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    width: 100%;
    color: var(--color-primary);
  }
}
</style>
