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
    </div>
  </template>
    
  <style>
  .page-404 {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  
  .page-404 h1 {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    width: 100%;
    color: var(--color-primary);
  }
  </style>
    