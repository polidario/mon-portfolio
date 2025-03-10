<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

import Image1 from '@/assets/bernard-polidario-a.jpg';

// Components
const HeadingTitle = defineAsyncComponent(() => import('@/components/HeadingTitle.vue'));
const FadeInSection = defineAsyncComponent(() => import('@/components/FadeInSection.vue'));
const HeroSection = defineAsyncComponent(() => import('@/components/HeroSection.vue'));
const ImageComparison = defineAsyncComponent(() => import('@/components/ImageComparison.vue'));
const GridFold = defineAsyncComponent(() => import('@/components/GridFold.vue'));
const ContactMe = defineAsyncComponent(() => import('@/components/ContactMe.vue'));
const IconList = defineAsyncComponent(() => import('@/components/IconList.vue'));
const InfiniteScroll = defineAsyncComponent(() => import('@/components/InfiniteScroll.vue'));

//Animations
const Floater = defineAsyncComponent(() => import('@/components/animations/Floater.vue'));
const CursorFollower = defineAsyncComponent(() => import('@/components/animations/CursorFollower.vue'));

// Icons
const IconSmiley = defineAsyncComponent(() => import('@/components/icons/IconSmiley.vue'));
const IconHeart = defineAsyncComponent(() => import('@/components/icons/IconHeart.vue'));
const IconJavascript = defineAsyncComponent(() => import('@/components/icons/tech/IconJavascript.vue'));
const IconTypescript = defineAsyncComponent(() => import('@/components/icons/tech/IconTypescript.vue'));
const IconHTML = defineAsyncComponent(() => import('@/components/icons/tech/IconHTML.vue'));
const IconCSS = defineAsyncComponent(() => import('@/components/icons/tech/IconCSS.vue'));
const IconUnity = defineAsyncComponent(() => import('@/components/icons/tech/IconUnity.vue'));
const IconPython = defineAsyncComponent(() => import('@/components/icons/tech/IconPython.vue'));
const IconSupabase = defineAsyncComponent(() => import('@/components/icons/tech/IconSupabase.vue'));
const IconFigma = defineAsyncComponent(() => import('@/components/icons/tech/IconFigma.vue'));

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

const techStackA = [
  {
    title: 'Javascript',
    description: 'Programming Language',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    icon: IconJavascript,
  },
  {
    title: 'CSS',
    description: 'Cascading Style Sheets',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    icon: IconCSS,
  },
  {
    title: 'TypeScript',
    description: 'High-level programming language',
    url: 'https://www.typescriptlang.org/',
    icon: IconTypescript,
  },
  {
    title: 'Unity',
    description: 'Game Development Engine',
    url: 'https://unity.com/',
    icon: IconUnity,
  },
]

const techStackB = [
  {
    title: 'HTML',
    description: 'Hypertext Markup Language',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    icon: IconHTML,
  },
  {
    title: 'Python',
    description: 'Programming Language',
    url: 'https://www.python.org/',
    icon: IconPython,
  },
  {
    title: 'Supabase',
    description: 'Dedicated Postgres Database',
    url: 'https://supabase.io/',
    icon: IconSupabase,
  },
  {
    title: 'Figma',
    description: 'Collaborative Interface Design Tool',
    url: 'https://www.figma.com/',
    icon: IconFigma,
  },
]
</script>

<template>
  <div class="home d-flex flex-column align-center justify-center ga-16" style="min-height: 300px;">
    <FadeInSection :useMargin="false">
      <div :style="{ maxWidth: '1080px' }">
        <ImageComparison />
      </div>
    </FadeInSection>
    

    <HeroSection 
      title="Hi, I'm Bernard Polidario" 
      subtext="A Frontend Developer" 
      body="I design web apps for human satisfaction"
      color="primary"
    />
    
    <FadeInSection :useMargin="false">
      <GridFold id="aboutMe">
        <template #item_a>
          <h2 class="text-h1 font-weight-bold">6 Yrs.</h2>
          <div class="py-3">
            <p class="text-h4">of developing web applications that makes people's lives easier</p>
          </div>
        </template>

        <template #item_b>
          <img :src="Image1" class="grid-images" />
        </template>

        <template #top_right_overlay>
            <div class="cursor">
              <Floater>
                <IconSmiley />
              </Floater>
            </div>
        </template>

        <template #overlay>
            <div class="overlay-card-text">
              <div class="cursor">
                <CursorFollower>
                  <IconHeart :width="'400'" :height="'400'" :color="'#ff1f1f'" />
                </CursorFollower>
              </div>
              <div class="content">
                <p class="text">I specialize in Frontend Development, crafting intuitive, engaging user experiences. Skilled in coding, multimedia design, and content creation.</p>
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
          <IconList :items="techStackA" />
        </template>
        <template #item_b>
          <IconList :items="techStackB" />
        </template>
      </GridFold>
    </FadeInSection>

    <InfiniteScroll :icons="techIcons"/>

    <ContactMe />
  </div>
</template>
