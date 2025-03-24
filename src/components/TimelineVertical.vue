<script setup lang="ts">
import { defineProps, PropType } from 'vue';
import type { TimelineItem } from '@/types/Components';


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
            <div v-for="item in items" :key="item.id" class="content">
                <div class="group">
                    <div v-if="item.subtitle" class="subtitle">{{ item.subtitle }}</div>
                    <div class="title-container">
                        <div class="title">{{ item.title }}</div>
                        <div class="date">{{ item.date }}</div>
                    </div>
                    <div class="description">{{ item.description }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.timeline-vertical {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    overflow: hidden;

    .wrapper {
        width: 100%;
        max-width: 50rem;
        margin: 0 auto;

        .content {
            display: flex;
            flex-direction: column;
            align-items: start;

            .group {
                position: relative;
                padding-left: 2.5rem;
                padding-top: 1.5rem;
                padding-bottom: 1.5rem;

                margin: 0;

                .subtitle {
                    font-size: 1rem;
                    font-weight: 500;
                    color: var(--color-primary);
                }

                .title-container {
                    display: flex;
                    align-items: start;
                    flex-direction: column;
                    margin-bottom: var(--space-2);

                    .title {
                        font-size: 1.25rem;
                        font-weight: 700;
                        color: var(--color-white);
                    }

                    .date {
                        font-size: 0.875rem;
                        font-weight: 500;
                        color: var(--color-gray-400);
                    }

                    &:before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 0.15rem;
                        height: 100%;
                        background-color: var(--color-gray-400);
                    }

                    &:after {
                        content: '';
                        position: absolute;
                        top: 2rem;
                        left: -.5rem;
                        width: 1.25rem;
                        height: 1.25rem;
                        background-color: var(--color-primary);
                        border-radius: 50%;
                        border: 0.15rem solid var(--color-gray-400);
                    }
                }
            }
        }
    }
    
}
</style>