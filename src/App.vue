<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { RouterView } from 'vue-router';

const Header = defineAsyncComponent(() => import('@/components/Header.vue'));
</script>

<template>
  <v-layout class="d-block" theme="dark">
    <Header />

    <RouterView v-slot="{ Component, route }">
      <transition name="fade" mode="out-in" :duration="{
        enter: 1000,
        leave: 1000,
      }">
        <component :is="Component" :key="route.path"/>
      </transition>
    </RouterView>
  </v-layout>
</template>

<style>
.fade-enter-active, .fade-leave-fron, .fade-leave-active {
  opacity: 1;
  transition: opacity 1s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>