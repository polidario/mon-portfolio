<script setup lang="ts">
import { motion } from 'motion-v';
import type { IconListItem } from '~/types/components';

const { data, error } = await useFetch<IconListItem[]>('/api/stacks');
if (error.value) console.error('Error fetching experiences:', error.value);

const items = data.value;
</script>

<template>
    <div class="container list-items__container" v-if="items && items.length">
        <motion.div 
            v-for="item in items" 
            :key="item.id" 
            class="list-item"
            initial="offscreen"
            whileInView="onscreen"
            :variants="{ offscreen: { opacity: 0, y: 50 }, onscreen: { opacity: 1, y: 0 } }"
            :transition="{ duration: 1, ease: 'easeInOut' }"
        >
            <div class="list-item__body">
                <div class="list-item__icon" v-html="item.colored_icon">
                </div>

                <div class="list-item__title">
                    <span class="text-h5 text-white">{{ item.name }}</span>
                    <p>{{ item.description }}</p>
                </div>
                
            </div>
            <div class="list-item__link">
                <a 
                    :href="item.url" 
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="`Visit ${item.name} website on a new browser tab`"
                >
                    <Icon name="mdi-open-in-new" class="list-item__link-icon" />
                </a>
            </div>
        </motion.div>
    </div>
    <div v-else class="list-items__empty">
        <p>No items found</p>
    </div>
</template>