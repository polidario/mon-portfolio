<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { onMounted } from 'vue';

import CardWithImage from '@/components/CardWithImage.vue';
import FadeInSection from '@/components/FadeInSection.vue';

onMounted(() => {
  useHead({
    meta: [
      {
        name: 'description',
        content: 'A collection of projects that I have worked on and companies I have worked with.'
      },
      {
        name: 'keywords',
        content: 'projects, work, portfolio, bernard polidario'
      }
    ]
  });
});

</script>

<template>
  <div class="container work-grid">
    <FadeInSection :useMargin="false">
      <CardWithImage
        title="WeeklyHow"
        summary="A brand that I made to help people learn Shopify development"
        image="/images/weeklyhow-homepage.webp"
        link="https://weeklyhow.com/"
        link_text="Visit site"
        category="Brand"
      />
    </FadeInSection>
    
    <FadeInSection :useMargin="false">
      <CardWithImage
        title="Shopify Theme Project"
        summary="A theme project developed during our live-coding sessions on WeeklyHow. (Password: weeklyhow)"
        image="/images/weeklyhow-live-coding-session-theme-dev.webp"
        link="https://weeklyhow-live-coding-session.myshopify.com/"
        link_text="Visit store"
        category="Shopify"
        category_type="error"
      />
    </FadeInSection>

    <FadeInSection :useMargin="false">
      <CardWithImage
        title="Charli3"
        summary="Website built using Squarespace for promoting my music"
        image="/images/bernard-polidario-music-artist-homepage.webp"
        link="https://bernardpolidario.com/"
        link_text="Visit site"
        category="Artist"
        category_type="warning"
      />
    </FadeInSection>

    <FadeInSection :useMargin="false">
      <CardWithImage
        title="Reminisce AI"
        summary="A chat bot AI project that I made just for fun"
        image="/images/reminisce-ai-app.webp"
        link="https://github.com/polidario/Reminisce-AI"
        link_text="View on GitHub"
        category="AI"
        category_type="error"
      />
    </FadeInSection>

  </div>
</template>
  
<style scoped>
.work-grid {
  min-height: 100vh;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(512px, 1fr));
  gap: var(--space-5);

  padding: var(--space-5);
  margin: 0 auto;

  justify-content: center;
  align-items: start;

}

@media only screen and (max-width: 768px) {
  .work-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

</style>
  