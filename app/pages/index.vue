<script setup lang="ts">
const { meta } = useAppConfig()

useHead({
  title: meta.title,
  meta: [
    { name: "description", content: meta.description },
    { name: "keywords", content: meta.keywords },
    { name: "og:site_name", content: meta.og.site_name },
    { name: "og:title", content: meta.og.title },
    { name: "og:description", content: meta.og.description },
    { name: "og:image", content: meta.og.image },
    { name: "og:url", content: meta.og.url },
    { name: "og:type", content: meta.og.type },
    { name: "twitter:title", content: meta.og.title },
    { name: "twitter:description", content: meta.og.description },
    { name: "twitter:image", content: meta.og.image },
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

        <HomepageTimelineVertical :items="data ?? []" />

        <HomepageIconList />
    </div>
</template>