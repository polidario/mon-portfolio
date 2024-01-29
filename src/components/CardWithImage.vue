<script setup>
import WeeklyHowImage from "@/assets/weeklyhow-image.png"
</script>

<template>
  <div id="contactMe" class="my-16">
    <div class="d-my-5">
      <h2 class="text-lg-h2 text-md-h4 text-sm-h5 text-center">My work</h2>
    </div>

    <v-divider class="my-5"></v-divider>

    <v-card
      class="mx-auto"
      max-width="400"
    >
      <v-img
        class="align-end text-white"
        height="200"
        :src="WeeklyHowImage"
        cover
      >
        <v-card-title>WeeklyHow</v-card-title>
      </v-img>
    
      <v-card-subtitle class="pt-4">
        Course Marketplace
      </v-card-subtitle>
    
      <v-card-text>
        <div>Made with WordPress and WooCommerce. Developed to publish courses related mostly to Shopify Development</div>
      </v-card-text>
    
      <v-card-actions>
        <v-btn variant="flat" href="https://weeklyhow.com/" target="_blank">Website</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>