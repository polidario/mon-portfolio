<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtext: {
    type: String
  },
  body: {
    type: String
  },
  color: {
    type: String
  }
})
</script>

<template>
  <div class="hero-section d-flex flex-column align-center justify-center ga-10 mt-4 mb-16">
    <div class="d-flex flex-column ga-10 pa-5">
      <h2 class="d-flex flex-column text-lg-h2 text-md-h4 text-sm-h5 text-center">
        <span>{{ title }}</span>
        <span class="font-weight-bold mt-4">
          {{ subtext }}
        </span>
      </h2>
      <div class="d-flex flex-rows ga-5">
        <v-icon icon="mdi-creation"></v-icon> 
        <p class="text-h3 font-weight-medium">{{ body }}</p>
      </div>
    </div>
    
    <div class="d-flex flex-column ga-3">
      <v-btn 
        color="primary" 
        class="rounded-pill font-weight-bold text-capitalize px-10" 
        href="https://linkedin.com/in/polidario" 
        target="_blank"
        prepend-icon="mdi-linkedin"
        size="x-large"
      >
        Let's connect!
      </v-btn>

      <v-btn 
        variant="text"
        class="rounded-pill font-weight-bold text-capitalize"
      >
        Hit me up!
      </v-btn>
    </div>
    
  </div>
</template>

<style>
.hero-section {
  height: 412px;
}
</style>