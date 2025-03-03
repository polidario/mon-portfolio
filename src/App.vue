<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

import AnnouncementBar from '@/components/AnnouncementBar.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

</script>

<template>
  <v-layout class="d-block" theme="dark">
    <AnnouncementBar message="This website is going through a redesign 😱. Please bear with me. ❤️" />
    <Header />

    <main>
      <RouterView v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </RouterView>
    </main>
    
    <Footer />
    
  </v-layout>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  opacity: 1;
  transition: opacity 1s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>