<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtext: {
    type: String
  },
  color: {
    type: String
  }
})
</script>

<template>
  <div class="d-flex flex-column align-center ga-10 mt-16">
    <h2 class="d-flex flex-column text-lg-h2 text-md-h4 text-sm-h5 text-center ga-3">
      <span>{{ title }}</span>
      <span class="font-weight-bold">{{ subtext }}</span>
    </h2>
    <div class="d-flex flex-column ga-3">
      <v-btn 
        color="primary" 
        class="rounded-pill font-weight-bold text-capitalize px-10" 
        href="https://linkedin.com/in/polidario" 
        prepend-icon="mdi-linkedin"
      >
        Let's connect!
      </v-btn>

      <v-btn 
        variant="text"
        class="font-weight-bold text-capitalize"
      >
        Contact me
      </v-btn>
    </div>
    
  </div>
</template>