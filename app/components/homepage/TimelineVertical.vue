<script setup lang="ts">
import { motion } from 'motion-v'

defineProps({
    items: {
        type: Array as PropType<TimelineItem[]>,
        required: true
    }
});

</script>

<template>
    <div class="timeline-vertical container">
        <div class="wrapper">
            <motion.div 
                v-if="items"
                v-for="item in items" 
                :key="item.id" 
                class="content" 
                id="timeline_content"
                initial="offscreen"
                whileInView="onscreen"
                :variants="{ offscreen: { opacity: 0, filter: 'blur(12px)' }, onscreen: { opacity: 1, filter: 'blur(0)' } }"
                :transition="{ duration: 1, ease: 'easeInOut' }"
            >
                <div class="group">
                    <a v-if="item.subtitle && item.subtitle" :href="item.url">
                        <div class="subtitle">{{ item.subtitle }}</div>
                    </a>
                    <div v-else-if="item.subtitle" class="subtitle">{{ item.subtitle }}</div>
                    <div class="title-container">
                        <div class="title">{{ item.title }}</div>
                        <div class="date">{{ item.date }}</div>
                    </div>
                    <div class="description">{{ item.description }}</div>
                </div>
            </motion.div>
            <div v-else>
                There are no items in the timeline
            </div>
        </div>
    </div>
</template>