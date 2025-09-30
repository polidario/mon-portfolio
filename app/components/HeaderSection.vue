<template>
    <h1>{{ content }}</h1>
</template>

<script setup lang="ts">
defineProps({
  content: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.header {
  padding: 1rem 0;
  text-align: center;
  width: 100%;
}
</style>