<script setup>
import { ref, onMounted } from 'vue';

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

const domRef = ref(null);

const rate = 0.95;

onMounted(() => {
  const title = document.querySelector('#hero_section__title');
  const body = document.querySelector('#hero_section__body');
  const linkedinButton = document.querySelector('#hero_section__linkedin_button');
  const actionButtons = document.querySelector('#hero_section__buttons');

  document.addEventListener('scroll', () => {
    const titleRect = title.getBoundingClientRect();
    const bodyRect = body.getBoundingClientRect();
    const linkedinButtonRect = linkedinButton.getBoundingClientRect();
    const buttonsRect = actionButtons.getBoundingClientRect();
    
    // Calculate the distance of the elements from the center of the screen
    const viewportCenter = window.innerHeight / 2;
    const titleOpacity = 1 - Math.min(Math.abs(viewportCenter - titleRect.top) / (viewportCenter * rate), 1);
    const bodyOpacity = 1 - Math.min(Math.abs(viewportCenter - bodyRect.top) / (viewportCenter * rate), 1);
    const linkedInButtonGlow = 1 - Math.min(Math.abs(viewportCenter - linkedinButtonRect.top) / (viewportCenter * rate), 1);
    const actionButtonsOpacity = 1 - Math.min(Math.abs(viewportCenter - buttonsRect.top) / (viewportCenter * rate), 1);
    
    // Apply opacity based on the scroll position
    title.style.opacity = titleOpacity;
    body.style.opacity = bodyOpacity;
    linkedinButton.style.boxShadow = `0 0 ${linkedInButtonGlow * 50}px rgba(0, 120, 200, ${linkedInButtonGlow})`;
    actionButtons.style.opacity = actionButtonsOpacity;
  });
});

</script>

<template>
  <div ref="domRef" class="hero-section d-flex flex-column align-center justify-center ga-10 mt-16">
    <div class="d-flex flex-column ga-10 pa-5">
      <div class="text-wrapper">
        <h2 id="hero_section__title" class="title">{{ title }}</h2>
      </div>
      
      <div id="hero_section__body" class="d-flex flex-rows ga-5 position-relative">
        <v-icon icon="mdi-creation"></v-icon> 
        <p class="body-text">{{ body }}</p>
      </div>
    </div>
    
    <div id="hero_section__buttons" class="d-flex flex-column ga-3">
      <v-btn 
        id="hero_section__linkedin_button"
        color="primary" 
        class="rounded-pill font-weight-bold text-capitalize px-10" 
        href="https://linkedin.com/in/polidario" 
        target="_blank"
        prepend-icon="mdi-linkedin"
        size="x-large"
        variant="flat"
      >
        Let's connect!
      </v-btn>
    </div>
    
  </div>
</template>

<style>
.hero-section {
  height: 412px;
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