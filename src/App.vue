<script setup>
import { RouterView } from 'vue-router';
import { defineAsyncComponent } from 'vue';

import Image1 from '@/assets/bernard-polidario-a.jpg';

const HeadingTitle = defineAsyncComponent(() => import('./components/HeadingTitle.vue'));
const FadeInSection = defineAsyncComponent(() => import('./components/FadeInSection.vue'));
const HeroSection = defineAsyncComponent(() => import('./components/HeroSection.vue'));
const ImageComparison = defineAsyncComponent(() => import('./components/ImageComparison.vue'));
const GridFold = defineAsyncComponent(() => import('./components/GridFold.vue'));
const TwoColumnText = defineAsyncComponent(() => import('./components/TwoColumnText.vue'));
const ContactMe = defineAsyncComponent(() => import('./components/ContactMe.vue'));
const NavigationBar = defineAsyncComponent(() => import('./components/NavigationBar.vue'));
const IconList = defineAsyncComponent(() => import('./components/IconList.vue'));
const InfiniteScroll = defineAsyncComponent(() => import('./components/InfiniteScroll.vue'));

// Icons
const IconCursor = defineAsyncComponent(() => import('./components/icons/IconCursor.vue'));
const IconJavascript = defineAsyncComponent(() => import('./components/icons/tech/IconJavascript.vue'));
const IconHTML = defineAsyncComponent(() => import('./components/icons/tech/IconHTML.vue'));
const IconCSS = defineAsyncComponent(() => import('./components/icons/tech/IconCSS.vue'));

import { useTheme } from 'vuetify'

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

const techStack = [
  {
    title: 'Javascript',
    description: 'Programming Language',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    icon: IconJavascript,
  },
  {
    title: 'HTML',
    description: 'Hypertext Markup Language',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    icon: IconHTML,
  },
  {
    title: 'CSS',
    description: 'Cascading Style Sheets',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    icon: IconCSS,
  }
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

    <v-main class="d-flex flex-column align-center justify-center ga-16 mt-16" style="min-height: 300px;">
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
        <HeadingTitle 
          title="The Stacks"
          subtitle="that I use to build web applications"
        />
        <GridFold>
          <template #item_a>
            <IconList v-for="item in techStack" :key="item.title" :title="item.title" :description="item.description">
              <template #icon>
                <component :is="item.icon" />
              </template>
            </IconList>
          </template>
          <template #item_b>
            <IconList :title="'HTML'" :description="'Hypertext Markup Language'">
              <template #icon>
                <IconHTML />
              </template>
            </IconList>
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