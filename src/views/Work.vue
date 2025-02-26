<script setup lang="ts">
import Card from '@/components/Card.vue';
import Alert from '@/components/Alert.vue';
</script>

<template>
  <div class="container">
    <h1>My Work</h1>

    <Alert
      title="Under Construction"
      message="This page is under construction and all content is placeholder."
      type="error"
    />

    <Card
      title="My Portfolio"
      summary="A collection of my projects"
      image="https://picsum.photos/360/640?grayscale"
      link="/portfolio"
    />
    <Card
      title="My Blog"
      summary="A collection of my thoughts"
      image="https://picsum.photos/360/640?grayscale"
      link="/blog"
    />
  </div>
</template>
  
<style scoped>
.container {
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: var(--space-5);

  margin-top: var(--space-15);
  margin-bottom: var(--space-15);
}

</style>
  