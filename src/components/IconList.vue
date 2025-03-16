<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { animate, stagger, inView } from 'motion';
import type { IconListItem } from '@/types/Components';


export default defineComponent({
    props: {
        items: {
            type: Array as PropType<IconListItem[]>,
            required: true,
        },
    },
    mounted() {
        this.$el.querySelectorAll('.list-item').forEach((item: HTMLElement) => {
            inView(item, () => {
                animate(item, { opacity: 1, y: [100, 0] }, { delay: stagger(1, { ease: [.32, .23, .4, .9]}) });
            });
        });
    },
});
</script>

<template>
    <div class="list-items__container" v-if="items.length">
        <div v-for="item in items" :key="item.id" class="list-item">
            <div class="list-item__body">
                <div class="list-item__icon" v-html="item.colored_icon">
                </div>

                <div class="list-item__title">
                    <span class="text-h5 text-white">{{ item.name }}</span>
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
    <div v-else class="list-items__empty">
        <p>No items found</p>
    </div>
</template>

<style scoped>
.list-items__container {
    display: grid;
    gap: var(--space-5);
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 1fr);
    width: 100%;
    max-width: 100%;
    padding: 0 1rem;
    box-sizing: border-box;
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
    width: 100%;
    box-sizing: border-box;
}

.list-item__body {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: var(--space-5);
    flex: 1;
    min-width: 0;
}

.list-item__icon {
    width: 4rem;
    height: 4rem;
    border-radius: 25%;
    flex-shrink: 0;
}

.list-item__title {
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.list-item__title span {
    font-size: 1.75rem;
    font-weight: 600;
    word-break: break-word;
}

.list-item__title p {
    font-size: 1.25rem;
    font-weight: 400;
    word-break: break-word;
}

.list-item__link {
    flex-shrink: 0;
}

.list-items__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-5);
    padding: var(--space-5);
    border-radius: 1rem;
}

.list-items__empty p {
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--color-gray-400)
}

@media only screen and (max-width: 768px) {
    .list-items__container {
        grid-template-columns: 1fr;
        padding: 0 1rem;
        margin: 0 auto;
    }

    .list-item__title span {
        font-size: 1.25rem;
    }

    .list-item__title p {
        font-size: 1rem;
    }

    .list-item {
        padding: var(--space-4);
        gap: var(--space-3);
    }

    .list-item__body {
        gap: var(--space-7);
    }

    .list-item__icon {
        width: 3rem;
        height: 3rem;
    }
}
</style>