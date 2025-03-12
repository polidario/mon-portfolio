<script lang="ts">
import { Component, defineComponent, PropType } from 'vue';
import { animate, stagger, inView } from 'motion';

interface IconListItem {
    id: number;
    name: string;
    description?: string;
    url?: string;
    icon?: string;
    colored_icon?: string;
}

export default defineComponent({
    props: {
        items: {
            type: Array as PropType<IconListItem[]>,
            required: true,
        },
    },
    mounted() {
        console.log(this.items);
        this.$el.querySelectorAll('.list-item').forEach((item: HTMLElement) => {
            inView(item, () => {
                animate(item, { opacity: 1, y: [100, 0] }, { delay: stagger(1, { ease: [.32, .23, .4, .9]}) });
            });
        });
    },
});
</script>

<template>
    <div  class="list-items__container">
        <div v-for="item in items" :key="item.id" class="list-item">
            <div class="list-item__body">
                <div :style="{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '25%',
                }" v-html="item.colored_icon">
                </div>

                <div class="list-item__title">
                    <span class="text-h5">{{ item.name }}</span>
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
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 1fr);
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