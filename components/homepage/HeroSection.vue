<script setup lang="ts">
import { motion } from 'motion-v';

const { data, error } = await useFetch<WebsiteResponse>('/api/site');
if (error.value) console.error('Error fetching website:', error.value);

const website = data.value || {} as WebsiteResponse;
</script>

<template>
    <section class="hero-section">
        <div class="hero-section__wrapper">
            <div class="text-wrapper">
                <motion.h2 
                    id="hero_section__title" 
                    class="title"
                    initial="offscreen"
                    whileInView="onscreen"
                    :variants="{ offscreen: { opacity: 0, y: 50 }, onscreen: { opacity: 1, y: 0 } }"
                    :transition="{ duration: 1, ease: 'easeInOut' }"
                >Hi, I'm {{ website.name }}</motion.h2>
            </div>
            
            <motion.div 
                id="hero_section__body" 
                class="body-text__wrapper"
                initial="offscreen"
                whileInView="onscreen"
                :variants="{ offscreen: { opacity: 0, y: 50 }, onscreen: { opacity: 1, y: 0 } }"
                :transition="{ duration: 1, ease: 'easeInOut' }"
            >
                <p class="body-text">{{ website.description }}</p>
            </motion.div>
            
            <motion.span 
                id="hero_section__location" 
                class="location"
                initial="offscreen"
                whileInView="onscreen"
                :variants="{ offscreen: { opacity: 0, y: 50 }, onscreen: { opacity: 1, y: 0 } }"
                :transition="{ duration: 1, ease: 'easeInOut' }"
            >
                Based in Paris, France
            </motion.span>
        </div>
    </section>
</template>