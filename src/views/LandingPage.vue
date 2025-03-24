<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { supabase } from '@/supabase/client';
import { useDisplay } from 'vuetify'
import { useHead } from '@unhead/vue';

const { mobile } = useDisplay()

import { TimelineItem, type IconListItem } from '@/types/Components';

// Assets
import BernardImage from '@/assets/bernard-polidario-a.webp';
import PortfolioBanner from '@/assets/portfolio-banner.webp';

const HERO_CONFIG = {
  title: "Hi, I'm Bernard Polidario",
  subtext: "A Frontend Developer",
  body: "I design web apps for human satisfaction",
  color: "primary"
} as const;

// Components
import HeadingTitle from '@/components/HeadingTitle.vue';
import HeroSection from '@/components/HeroSection.vue';
import ImageComparison from '@/components/ImageComparison.vue';
import GridFold from '@/components/GridFold.vue';
import ContactMe from '@/components/ContactMe.vue';
import IconList from '@/components/IconList.vue';
import ParallaxImages from '@/components/ParallaxImages.vue';

//Animations
import CursorFollower from '@/components/animations/CursorFollower.vue';

// Icons
import IconHeart from '@/components/icons/IconHeart.vue';
import TimelineVertical from '@/components/TimelineVertical.vue';

// State
const techIcons = ref<IconListItem[]>([]);
const timelineItems = ref<TimelineItem[]>([]);

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

const fetchWorkExperiences = async () => {
  try {
    const { data, error } = await supabase.from('work_experiences').select();
    
    if (error) throw error;
    if (!data) throw new Error('No data found');

    data.forEach((item) => {
      const date = new Date(item.worked_from).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      timelineItems.value.push({
        id: item.id,
        title: item.title,
        subtitle: item.company,
        date,
        description: item.description
      });
    });
  } catch (error) {
    console.error('Error fetching work experiences:', error);
  }
}

onMounted(() => {
  fetchTechStacks();
  fetchWorkExperiences();
  useHead({
    meta: [
      {
        name: 'description',
        content: 'I design web apps for human satisfaction. I am a frontend developer based in France.'
      },
      {
        name: 'keywords',
        content: 'full-stack developer, frontend developer, shopify developer, web developer, bernard polidario'
      },
      { name: 'author', content: 'Bernard Polidario'},
      { name: 'robots', content: 'index, follow'},
      { name: 'og:title', content: 'Bernard Polidario - Frontend Developer'},
      { name: 'og:description', content: 'I design web apps for human satisfaction. A software engineer based in France.'},
      { name: 'og:image',  content: PortfolioBanner},
      { name: 'og:url',  content: 'https://polidario.com/'},
      { name: 'og:type',  content: 'website'},
      { name: 'og:site_name',  content: 'Bernard Polidario'},
      { name: 'og:locale',  content: 'en_US' },
    ]
  });
});
</script>

<template>
  <div id="homepage" class="home d-flex flex-column align-center justify-center ga-16" style="min-height: 300vh;">
    <div :style="{ maxWidth: '1080px', zIndex: 1 }" id="imageComparison">
      <ImageComparison />
    </div>

    <ParallaxImages />

    <HeroSection v-bind="HERO_CONFIG" />
    
    <section id="aboutMe">
      <GridFold>
        <template #item_a>
          <h2 class="text-h1 text-white font-weight-bold">6 Yrs.</h2>
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

        <template #overlay>
          <div class="overlay-card-text">
            <div v-if="!mobile" class="cursor">
              <CursorFollower>
                <IconHeart width="400" height="400" color="#ff1f1f" />
              </CursorFollower>
            </div>
            <div class="content">
              <div class="content-card">
                <h2 class="text-h5 text-white font-weight-bold">Skilled in coding, loves sharing</h2>
                <p>I've been in a relationship with coding since I was young, I'd marry this if I could.</p>
              </div>
            </div>
          </div>
        </template>
      </GridFold>
    </section>

    <TimelineVertical :items="timelineItems">

    </TimelineVertical>

    <section id="tech-stack" class="tech-stack">
      <HeadingTitle 
        title="The Stacks"
        subtitle="that I use to build web applications"
      />
        
      <IconList :items="techIcons" />

    </section>

    <ContactMe />
  </div>
</template>

<style scoped lang="scss">
.home {
  position: relative;
  overflow: hidden;
}

.home::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(65,41,76);
  background: -moz-radial-gradient(circle, rgba(65,41,76,0.8295693277310925) 8%, rgba(32,41,69,0.865983893557423) 38%, rgba(13,9,20,0.7035189075630253) 70%);
  background: -webkit-radial-gradient(circle, rgba(65,41,76,0.8295693277310925) 8%, rgba(32,41,69,0.865983893557423) 38%, rgba(13,9,20,0.7035189075630253) 70%);
  background: radial-gradient(circle, rgba(65,41,76,0.8295693277310925) 8%, rgba(32,41,69,0.865983893557423) 38%, rgba(13,9,20,0.7035189075630253) 70%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#41294c",endColorstr="#0d0914",GradientType=1);
  z-index: 0;
}

.grid-images {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.content-card {
  background: linear-gradient(145deg, rgba(31, 31, 35, 0.95), rgba(35, 35, 40, 0.75));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  padding: var(--space-5);
  box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
}

.content-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px -1px rgba(0, 0, 0, 0.3);
}
</style>