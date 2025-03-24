<script setup>
import { useSlots } from 'vue'
import { motion } from 'motion-v'
const slots = useSlots()

</script>

<template>
    <div class="grid-fold">
        <motion.div 
            class="grid-item-a"
            initial="offscreen"
            whileInView="onscreen"
            :variants="{ offscreen: { opacity: 0, y: 100 }, onscreen: { opacity: 1, y: 0 } }"
            :transition="{ duration: 1, ease: 'linear' }"
        >
            <slot name="item_a"></slot>
        </motion.div>
        <motion.div 
            v-if="slots.item_b" 
            class="grid-item-b"
            initial="offscreen"
            whileInView="onscreen"
            :variants="{ offscreen: { opacity: 0, y: 0 }, onscreen: { opacity: 1, y: 50 } }"
            :transition="{ duration: 1, ease: 'linear' }"
        >
            <slot name="item_b"></slot>
        </motion.div>

        <div v-if="slots.overlay" class="overlay-card">
            <slot name="overlay"></slot>
        </div>

        <div v-if="slots.top_right_overlay" class="top-right-overlay">
            <slot name="top_right_overlay"></slot>
        </div>
    </div>
</template>

<style>
.grid-fold {
    display: grid;
    align-items: center;
    grid-template-columns: auto auto;
    gap: var(--space-9);

    position: relative;
    z-index: 1;
}

.top-right-overlay {
    position: absolute;
    top: -200px;
    right: 50px;
}

@media only screen and (max-width: 768px) {
    .grid-fold {
        gap: var(--space-5);
        padding-top: var(--space-12);
        padding-left: var(--space-5);
        padding-right: var(--space-5);
        padding-bottom: var(--space-5);
    }

    .top-right-overlay {
        top: -100px;
        right: 0;
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