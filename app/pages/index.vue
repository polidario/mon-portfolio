<script setup lang="ts">
import config from '#shared/config/index.seo'
definePageMeta({
    layout: 'homepage'
});

useHead({
  title: config.title,
  meta: [
    { name: "description", content: config.description },
    { name: "keywords", content: config.keywords },
    { name: "og:site_name", content: config.og.site_name },
    { name: "og:title", content: config.og.title },
    { name: "og:description", content: config.og.description },
    { name: "og:image", content: config.og.image },
    { name: "og:url", content: config.og.url },
    { name: "og:type", content: config.og.type },
    { name: "twitter:title", content: config.og.title },
    { name: "twitter:description", content: config.og.description },
    { name: "twitter:image", content: config.og.image },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});

const { data, error } = await useFetch<TimelineItem[]>('/api/experiences');
if (error.value) console.error('Error fetching experiences:', error.value);


</script>
<template>
    <div class="homepage d-flex flex-column align-center justify-center ga-16">
        
        <HomepageHeroSection />

        <!-- <div :style="{ maxWidth: '1080px', zIndex: 1 }" id="imageComparison">
            <HomepageImageComparison />
        </div> -->
        <!-- 
        <HomepageParallaxImages /> -->

        <UButton color="primary">Hello world</UButton>

        <HomepageTimelineVertical :items="data || []" />

        <HomepageIconList />
    </div>
</template>