<script setup>
import { useSlots } from 'vue'
const slots = useSlots()

defineProps({
})
</script>

<template>
    <div class="grid-fold">
        <div class="grid-item-a">
            <slot name="item_a"></slot>
        </div>
        <div v-if="slots.item_b" class="grid-item-b">
            <slot name="item_b"></slot>
        </div>

        <div v-if="slots.overlay" class="overlay-card">
            <slot name="overlay"></slot>
        </div>
    </div>
</template>

<style>
.grid-fold {
    display: grid;
    align-items: center;
    grid-template-columns: auto auto;
    gap: var(--space-9);

    padding-top: var(--space-17);
    padding-left: var(--space-12);
    padding-right: var(--space-12);
    padding-bottom: var(--space-12);
}

@media only screen and (max-width: 768px) {
    .grid-fold {
        gap: var(--space-7);
        padding-top: var(--space-12);
        padding-left: var(--space-5);
        padding-right: var(--space-5);
        padding-bottom: var(--space-5);
    }
}

@media only screen and (max-width: 980px) {
    .grid-fold {
        grid-template-columns: 1fr;
    }
}

@media (min-width: 1400px) {
    .grid-fold {
        max-width: 1400px;
    }
}
</style>