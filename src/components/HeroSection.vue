<script setup>
import IconFranceFlag from './icons/IconFranceFlag.vue';
import { motion } from 'motion-v';

defineProps({
  title: {
    type: String,
    required: true
  },
  subtext: {
    type: String
  },
  body: {
    type: String
  },
  color: {
    type: String
  }
});
</script>

<template>
  <section class="hero-section">
    <div class="d-flex flex-column align-center ga-10 pa-5">
      <div class="text-wrapper">
        <motion.h2 
          id="hero_section__title" 
          class="title"
          initial="offscreen"
          whileInView="onscreen"
          :variants="{ offscreen: { opacity: 0, y: 50 }, onscreen: { opacity: 1, y: 0 } }"
          :transition="{ duration: 1, ease: 'easeInOut' }"
        >{{ title }}</motion.h2>
      </div>
      
      <motion.div 
        id="hero_section__body" 
        class="d-flex flex-rows ga-5 position-relative"
        initial="offscreen"
        whileInView="onscreen"
        :variants="{ offscreen: { opacity: 0, y: 50 }, onscreen: { opacity: 1, y: 0 } }"
        :transition="{ duration: 1, ease: 'easeInOut' }"
      >
        <v-icon icon="mdi-creation"></v-icon> 
        <p class="body-text">{{ body }}</p>
      </motion.div>
      
      <motion.span 
        id="hero_section__location" 
        class="location"
        initial="offscreen"
        whileInView="onscreen"
        :variants="{ offscreen: { opacity: 0, y: 50 }, onscreen: { opacity: 1, y: 0 } }"
        :transition="{ duration: 1, ease: 'easeInOut' }"
      >
        <IconFranceFlag /> Based in Paris, France
      </motion.span>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-8);
  margin-top: var(--space-16);
  height: 412px;
  z-index: 1;
  
  .text-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
  }

  .title {
    font-size: 3.75rem;
    font-weight: bold;
    line-height: 1;
    letter-spacing: -0.0083333333em;
    transition: opacity 0.1s;
    color: var(--color-white);

    font-feature-settings: "liga" 1, "calt" 1;
  }

  .body-text {
    font-size: 3rem;
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: normal;
    margin: 0;
    transition: opacity 0.1s;
  }

  .location {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-size: 1rem;

    span {
      white-space: nowrap;
    }
  }
}

@media only screen and (max-width: 980px) {
  .hero-section {
    .title {
      font-size: 2.25em;
      line-height: 1.2;
      font-weight: bold;
      text-align: center;
    }

    .body-text {
      font-size: 1.75em;
      line-height: 1.2;
      text-align: center;
    }

    #hero_section__body {
      i {
        position: absolute;
        font-size: var(--text-xl);
        top: -70px;
        left: -40px;
        z-index: -1;
        opacity: 0.25;
      }
    }
  }
}
</style>