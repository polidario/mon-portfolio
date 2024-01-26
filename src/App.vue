<script setup>
import { RouterView } from 'vue-router'
import HeroSection from './components/HeroSection.vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<template>
  <v-layout class="rounded rounded-md" theme="dark">
    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Menu"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar title="Hello World! 👋" :elevation="2">
      <template v-slot:append>
        <v-btn class="primary" :icon="theme.global.current.value.dark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'" @click="toggleTheme"></v-btn>
      </template>
    </v-app-bar>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <HeroSection title="Hi, I'm Bernard Polidario" subtext="A Frontend Developer" color="primary"/>
    </v-main>
  </v-layout>
  <RouterView />
</template>