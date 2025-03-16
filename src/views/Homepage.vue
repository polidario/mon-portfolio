<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { supabase } from '@/supabase/client';
import type { IconListItem } from '@/types/Components';

// Assets
import BernardImage from '@/assets/bernard-polidario-a.jpg';

const HERO_CONFIG = {
  title: "Hi, I'm Bernard Polidario",
  subtext: "A Frontend Developer",
  body: "I design web apps for human satisfaction",
  color: "primary"
} as const;

// Components
const HeadingTitle = defineAsyncComponent(() => import('@/components/HeadingTitle.vue'));
const HeroSection = defineAsyncComponent(() => import('@/components/HeroSection.vue'));
const ImageComparison = defineAsyncComponent(() => import('@/components/ImageComparison.vue'));
const GridFold = defineAsyncComponent(() => import('@/components/GridFold.vue'));
const ContactMe = defineAsyncComponent(() => import('@/components/ContactMe.vue'));
const IconList = defineAsyncComponent(() => import('@/components/IconList.vue'));
const InfiniteScroll = defineAsyncComponent(() => import('@/components/InfiniteScroll.vue'));
const ParallaxImages = defineAsyncComponent(() => import('@/components/ParallaxImages.vue'));

//Animations
const ObjectFloater = defineAsyncComponent(() => import('@/components/animations/ObjectFloater.vue'));
const CursorFollower = defineAsyncComponent(() => import('@/components/animations/CursorFollower.vue'));

// Icons
const IconSmiley = defineAsyncComponent(() => import('@/components/icons/IconSmiley.vue'));
const IconHeart = defineAsyncComponent(() => import('@/components/icons/IconHeart.vue'));

// State
const techIcons = ref<IconListItem[]>([]);

const fetchTechStacks = async () => {
  try {
    const { data, error } = await supabase.from('stacks').select();
    
    if (error) throw error;
    if (!data) throw new Error('No data found');
    
    techIcons.value = data;
  } catch (error) {
    console.error('Error fetching tech stacks:', error);
  }
};

// Lifecycle
onMounted(fetchTechStacks);
</script>

<template>
  <main id="homepage" class="home d-flex flex-column align-center justify-center ga-16" style="min-height: 300vh;">
    <div :style="{ maxWidth: '1080px' }" id="imageComparison">
      <ImageComparison />
    </div>

    <ParallaxImages />

    <HeroSection v-bind="HERO_CONFIG" />
    
    <section id="aboutMe">
      <GridFold>
        <template #item_a>
          <h2 class="text-h1 font-weight-bold">6 Yrs.</h2>
          <div class="py-3">
            <p class="text-h4">of developing web applications that makes people's lives easier</p>
          </div>
        </template>

        <template #item_b>
          <img 
            :src="BernardImage" 
            alt="Bernard Polidario" 
            class="grid-images" 
            loading="lazy"
          >
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
                <IconHeart width="400" height="400" color="#ff1f1f" />
              </CursorFollower>
            </div>
            <div class="content">
              <h2 class="text-h5 font-weight-bold">Skilled in coding, loves sharing</h2>
              <p class="text">I've been in a relationship with coding since I was young, I'd marry this if I could.</p>
            </div>
          </div>
        </template>
      </GridFold>
    </section>
    
    <img 
      src="/images/gradient-highlight.webp" 
      alt="Gradient Background"
      class="position-absolute bottom-0 left-0 w-100 h-100" 
      loading="lazy"
    />

    <section id="tech-stack" class="tech-stack">
      <HeadingTitle 
        title="The Stacks"
        subtitle="that I use to build web applications"
      />
        
      <IconList :items="techIcons" />

      <InfiniteScroll :icons="techIcons"/>
    </section>

    <ContactMe />
  </main>
</template>

<style scoped lang="scss">
.home {
  position: relative;
  overflow: hidden;
}

.tech-stack {
  width: 100%;
  z-index: 1;
}

.grid-images {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
</style>