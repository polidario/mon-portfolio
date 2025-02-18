<script setup>
import { RouterView } from 'vue-router'

import Image1 from '@/assets/bernard-polidario-a.jpg'

import FadeInSection from './components/FadeInSection.vue';
import HeroSection from './components/HeroSection.vue'
import ImageComparison from './components/ImageComparison.vue';
import GridFold from './components/GridFold.vue';
import TwoColumnText from './components/TwoColumnText.vue';
import ContactMe from './components/ContactMe.vue'
import InfiniteScroll from './components/InfiniteScroll.vue';

import { useTheme } from 'vuetify'
import NavigationBar from './components/NavigationBar.vue';


import IconCursor from './components/icons/IconCursor.vue';

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
      
      <FadeInSection>
        <GridFold>
          <template #item_a>
            <h2 class="text-h1 font-weight-bold">6 Yrs.</h2>
            <div class="py-3">
              <p class="text-h4">of developing web applications that makes people's lives easier</p>
            </div>
          </template>

          <template #item_b>
            <img :src="Image1" class="grid-images" />
          </template>

          <template #overlay>
              <div class="card-text">
                <div class="cursor">
                  <IconCursor />
                </div>
                <div class="content">
                  <p class="text">I specialize in Frontend Development, crafting intuitive, engaging user experiences. Skilled in coding, multimedia design, and content creation. I focus on delivering seamless functionality and meaningful interactions.</p>
                </div>
              </div>
          </template>
        </GridFold>
      </FadeInSection>

      <FadeInSection>
        <GridFold>
          <template #item_a>
            <h2 class="text-h1 font-weight-bold">The Stacks</h2>
            <div class="py-3">
              <p class="text-h4">that I use to build web applications</p>
            </div>

            <GridFold>
              <template #item_a></template>
              <template #item_b></template>
            </GridFold>
          </template>
        </GridFold>
      </FadeInSection>

      <TwoColumnText />

      <InfiniteScroll :icons="techIcons"/>

      <ContactMe />

    </v-main>
  </v-layout>
  <RouterView />
</template>