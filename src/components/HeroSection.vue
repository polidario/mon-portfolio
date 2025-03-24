<script setup>
import { onMounted } from 'vue';
import { animate, inView } from 'motion';

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
})

onMounted(() => {
  const title = document.querySelector('#hero_section__title');
  const body = document.querySelector('#hero_section__body');
  const locationSection = document.querySelector('#hero_section__location');

  inView('.hero-section', () => {
    animate(title, {
      opacity: [0, 1],
      translateY: [20, 0],
    }, {
      duration: 1,
      delay: 0.25,
      easing: 'ease-in-out',
    });

    animate(body, {
      opacity: [0, 1],
      translateY: [20, 0],
    }, {
      duration: 1,
      delay: 0.5,
      easing: 'ease-in-out',
    });

    animate(locationSection, {
      opacity: [0, 1],
      translateY: [20, 0],
    }, {
      duration: 1,
      delay: 0.75,
      easing: 'ease-in-out',
    });
  });
});

</script>

<template>
  <div class="hero-section d-flex flex-column align-center justify-center ga-10 mt-16">
    <div class="d-flex flex-column align-center ga-10 pa-5">
      <div class="text-wrapper">
        <h2 id="hero_section__title" class="title">{{ title }}</h2>
      </div>
      
      <div id="hero_section__body" class="d-flex flex-rows ga-5 position-relative">
        <v-icon icon="mdi-creation"></v-icon> 
        <p class="body-text">{{ body }}</p>
      </div>
      
      <span id="hero_section__location" class="location">Based in Paris, France</span>
    </div>
    
    <div id="hero_section__buttons" class="d-flex flex-column ga-3">
    </div>
  </div>
</template>

<style>
.hero-section {
  height: 412px;
  z-index: 1;
}

.hero-section .text-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.hero-section .title {
  font-size: 3.75rem;
  font-weight: bold;
  line-height: 1;
  letter-spacing: -0.0083333333em;
  transition: opacity 0.1s;
  color: var(--color-white);
}


.hero-section .body-text {
  font-size: 3rem;
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: normal;

  transition: opacity 0.1s;
}

@media only screen and (max-width: 980px) {
  .hero-section .title {
    font-size: 2.25em;
    font-weight: bold;
    text-align: center;
  }

  .hero-section #hero_section__body i {
    position: absolute;
    font-size: var(--text-xl);
    top: -70px;
    left: -40px;
    z-index: -1;
    opacity: 0.25;
  }

  .hero-section .body-text {
    font-size: 1.75em;
    font-weight: bold;
    text-align: center;
  }
}
</style>