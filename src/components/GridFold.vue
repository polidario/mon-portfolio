<script setup>
import { onMounted, useSlots } from 'vue'
import { animate, scroll } from 'motion'
const slots = useSlots()

// document.querySelectorAll(".grid-fold ").forEach((section) => {
//     const header = section.querySelector("h2")
//     scroll(animate(header, { y: [-400, 400] }, { ease: "linear" }), {
//         target: header,
//     })
// })

onMounted(() => {
    const gridItemA = document.querySelector(".grid-item-a")
    const gridItemB = document.querySelector(".grid-item-b")
    const topRightOverlay = document.querySelector(".top-right-overlay")
    scroll(animate(gridItemA, { y: [-100, 100] }, { ease: "linear" }), {
        target: gridItemA,
    })
    scroll(animate(gridItemB, { y: [-50, 50] }, { ease: "linear" }), {
        target: gridItemB,
    })
    scroll(animate(topRightOverlay, { y: [200, -70] }, { ease: "linear" }), {
        target: topRightOverlay,
    })
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