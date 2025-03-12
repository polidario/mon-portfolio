<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue';

import Image1 from '@/assets/bernard-polidario-a.jpg';

// Components
const HeadingTitle = defineAsyncComponent(() => import('@/components/HeadingTitle.vue'));
const HeroSection = defineAsyncComponent(() => import('@/components/HeroSection.vue'));
const ImageComparison = defineAsyncComponent(() => import('@/components/ImageComparison.vue'));
const GridFold = defineAsyncComponent(() => import('@/components/GridFold.vue'));
const ContactMe = defineAsyncComponent(() => import('@/components/ContactMe.vue'));
const IconList = defineAsyncComponent(() => import('@/components/IconList.vue'));
const InfiniteScroll = defineAsyncComponent(() => import('@/components/InfiniteScroll.vue'));

//Animations
const ObjectFloater = defineAsyncComponent(() => import('@/components/animations/ObjectFloater.vue'));
const CursorFollower = defineAsyncComponent(() => import('@/components/animations/CursorFollower.vue'));

// Icons
const IconSmiley = defineAsyncComponent(() => import('@/components/icons/IconSmiley.vue'));
const IconHeart = defineAsyncComponent(() => import('@/components/icons/IconHeart.vue'));

const techIcons = ref([])

onMounted( async () => {
  techIcons.value = await fetch('http://localhost:3001/stacks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => {
    return res.json()
  })
})
</script>

<template>
  <div id="homepage" class="home d-flex flex-column align-center justify-center ga-16" style="min-height: 300px;">
    <div :style="{ maxWidth: '1080px' }" id="imageComparison">
      <ImageComparison />
    </div>

    <HeroSection 
      title="Hi, I'm Bernard Polidario" 
      subtext="A Frontend Developer" 
      body="I design web apps for human satisfaction"
      color="primary"
    />
    
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
            <ObjectFloater>
              <IconSmiley />
            </ObjectFloater>
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

    
    <img src="/images/gradient-highlight.webp" class="position-absolute bottom-0 left-0 w-100 h-100 z-back" />

    <HeadingTitle 
        title="The Stacks"
        subtitle="that I use to build web applications"
      />
      
    <IconList :items="techIcons" />

    <InfiniteScroll :icons="techIcons"/>

    <ContactMe />
  </div>
</template>