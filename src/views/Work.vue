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
      title="WeeklyHow"
      summary="A brand that I made to help people learn Shopify development"
      image="/images/weeklyhow-homepage.png"
      link="https://weeklyhow.com/"
      link_text="Visit site"
      category="Brand"
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
  