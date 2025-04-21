<script setup lang="ts">
import type { IconListItem, TimelineItem } from '~/types/components';

definePageMeta({
    layout: 'homepage'
});

const { data, error } = await useFetch<TimelineItem[]>('/api/experiences');
if (error.value) console.error('Error fetching experiences:', error.value);


</script>
<template>
    <div class="homepage d-flex flex-column align-center justify-center ga-16">
        <div :style="{ maxWidth: '1080px', zIndex: 1 }" id="imageComparison">
            <HomepageImageComparison />
        </div>

        <HomepageParallaxImages />

        <HomepageHeroSection />
        <HomepageTimelineVertical :items="data || []" />

        <HomepageIconList />
    </div>
</template>