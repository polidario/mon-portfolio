<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
  }
})

</script>

<template>
    <div class="container my-16">
      <h2 class="title">{{ title }}</h2>
      <div v-if="subtitle" class="py-3">
        <p class="text-h4">{{ subtitle }}</p>
      </div>
    </div>
</template>

<style scoped>
.container {
  display: block;
  width: 100%;
}

.title {
  font-size: 6rem !important;
  font-weight: 300;
  line-height: 6rem;
  letter-spacing: -0.015625em !important;
  font-family: "Roboto", sans-serif;
  text-transform: none !important;
  font-weight: bold;
  width: 100%;
}

@media only screen and (max-width: 768px) {
  .container {
    padding-left: var(--space-5);
    padding-right: var(--space-5);
  }
}

</style>