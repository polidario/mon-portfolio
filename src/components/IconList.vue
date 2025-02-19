<script lang="ts">
import { Component, defineComponent, PropType } from 'vue';

interface IconListItem {
    title: string;
    description?: string;
    url?: string;
    icon: Component;
}

export default defineComponent({
    props: {
        items: {
            type: Array as PropType<IconListItem[]>,
            required: true,
        },
    },
});
</script>

<template>
    <div  class="list-items__container">
        <div v-for="item in items" :key="item.title" class="list-item">
            <div class="list-item__body">
                <div :style="{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '25%',
                }">
                    <component :is="item.icon" />
                </div>

                <div class="list-item__title">
                    <span class="text-h5">{{ item.title }}</span>
                    <p>{{ item.description }}</p>
                </div>
                
            </div>
            <div class="list-item__link">
                <a :href="item.url" target="_blank" rel="noopener noreferrer">
                    <v-icon icon="mdi-open-in-new" />
                </a>
            </div>
        </div>
    </div>
    
</template>

<style scoped>
.list-items__container {
    display: grid;
    gap: var(--space-5);
    grid-template-rows: auto;
}

.list-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-5);
    padding: var(--space-5);

    border-radius: 1rem;
    background-color: var(--color-gray);
}

.list-item__body {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: var(--space-5);

    font-size: 1.5rem;
    font-weight: 500;
}

.list-item__title {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.list-item__title span {
    font-size: 1.75rem;
    font-weight: 600;
}

.list-item__title p {
    font-size: 1.25rem;
    font-weight: 400;
}
</style>