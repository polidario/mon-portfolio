<script setup>
import { RouterView } from 'vue-router'
import HeroSection from './components/HeroSection.vue'
import ImageComparison from './components/ImageComparison.vue';
import TwoColumnText from './components/TwoColumnText.vue';
import ContactMe from './components/ContactMe.vue'
import InfiniteScroll from './components/InfiniteScroll.vue';
import { useTheme } from 'vuetify'
import NavigationBar from './components/NavigationBar.vue';

const theme = useTheme()

const techIcons = [
  'mdi-language-html5',
  'mdi-language-javascript',
  'mdi-react',
  'mdi-vuejs',
  'mdi-language-php',
  'mdi-git',
  'mdi-language-typescript',
  'mdi-github',
  'mdi-bootstrap',
  'mdi-unity',
]

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<template>
  <v-layout class="rounded rounded-md" theme="dark">
    <v-app-bar title="Hello World! 👋" :elevation="2">
      <template v-slot:append>
        <NavigationBar />
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
        body="I design web apps for human satisfaction"
        color="primary"
      />

      <TwoColumnText />

      <InfiniteScroll :icons="techIcons"/>

      <ContactMe />

    </v-main>
  </v-layout>
  <RouterView />
</template>