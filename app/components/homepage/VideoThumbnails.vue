<script setup lang="ts">
import { motion } from 'motion-v';
const supabase = useSupabaseClient()
const config = useRuntimeConfig()
const url = config.public.apiMediasURL;
const { data, error } = await supabase.storage.from('medias').list()

if (error && error?.message) console.error('Error fetching experiences:', error.message);
</script>

<template>
    <section v-if="data" class="thumbnails">
        <motion.div
            class="ticker"
            :animate="{ x: ['0%', '-50%'] }"
            :transition="{
                duration: 60,
                repeat: Infinity,
                ease: 'linear'
            }"
        >
            <ul class="ticker-content">
                <li v-for="image in data" :key="`f-${image.id}`" class="thumbnails__image">
                    <div>
                        <img :src="`${url}/${image.name}`" :alt="image.name">
                    </div>
                </li>
            </ul>

            <ul class="ticker-content">
                <li v-for="image in data" :key="`s-${image.id}`" class="thumbnails__image">
                    <div>
                        <img :src="`${url}/${image.name}`" :alt="image.name">
                    </div>
                </li>
            </ul>
            
        </motion.div>
        
    </section>
</template>