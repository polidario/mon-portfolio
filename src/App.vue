<script setup lang="ts">
import { RouterView } from 'vue-router';

import AnnouncementBar from '@/components/AnnouncementBar.vue';
import NavHeader from '@/components/NavHeader.vue';
import MainFooter from '@/components/MainFooter.vue';

</script>

<template>
  <v-layout class="d-block" theme="dark" :style="{ background: $vuetify.theme.themes.dark.colors.background }">
    <AnnouncementBar message="This website is going through a redesign 😱. Please bear with me. ❤️" />
    <NavHeader />

    <main>
      <RouterView v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </RouterView>
    </main>
    
    <MainFooter />
    
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