<script setup>
import { RouterView } from 'vue-router'
import HeroSection from './components/HeroSection.vue'
import ImageComparison from './components/ImageComparison.vue';
import TwoColumnText from './components/TwoColumnText.vue';
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
        <v-list-subheader class="font-weight-bold text-h6">MENU</v-list-subheader>
        <v-list-item link="#" title="Home"></v-list-item>
        <v-list-item link="#" title="About me"></v-list-item>
        <v-list-item link="#" title="My projects"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar title="Hello World! 👋" :elevation="2">
      <template v-slot:append>
        <v-btn class="primary" :icon="theme.global.current.value.dark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'" @click="toggleTheme"></v-btn>
      </template>
    </v-app-bar>

    <v-main class="d-flex flex-column align-center justify-center mt-16" style="min-height: 300px;">
      <div :style="{ maxWidth: '1080px', padding: '10px' }">
        <ImageComparison />
      </div>
      
      <HeroSection 
        title="Hi, I'm Bernard Polidario" 
        subtext="A Frontend Developer" 
        body="I develop and teach people how to code through online courses and YouTube videos. I think it's fun!"
        color="primary"
      />

      <TwoColumnText />
    </v-main>
  </v-layout>
  <RouterView />
</template>