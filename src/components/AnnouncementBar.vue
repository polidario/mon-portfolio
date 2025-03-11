<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
    message: String,
});

</script>

<template>
    <div class="announcement">
        <p>{{ message }}</p>
    </div>
</template>

<style scoped>
.announcement {
  display: inline-block;
  height: 100%;
  text-align: center;
  width: 100%;
  background: black;
  color: white;
  font-family: Arial, sans;
  margin: 0;
  padding: var(--space-4);
  vertical-align: middle;
  font-size: 0.8em;
}
</style>