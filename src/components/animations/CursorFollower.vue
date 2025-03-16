<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const cursor = ref<HTMLElement | null>(null);
const maxDistance = 50;

let originalPosition = { x: 0, y: 0 };
let cursorPosition = { x: 0, y: 0 };
let animationFrameId: number | null = null;

onMounted(() => {
    defaultPosition()

    originalPosition.x = window.innerWidth / 2;
    originalPosition.y = window.innerHeight / 2;

    document.addEventListener('mousemove', onMouseMove);

    onUnmounted(() => {
        document.removeEventListener('mousemove', onMouseMove);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
    });
});

const defaultPosition = () => {
    if (!cursor.value) return;
    cursor.value.style.transform = `translate(${originalPosition.x}px, ${originalPosition.y}px)`;
}

const onMouseMove = (event: MouseEvent) => {
    if (!cursor.value) return;

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const distanceX = mouseX - originalPosition.x;
    const distanceY = mouseY - originalPosition.y;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance > maxDistance) {
        const angle = Math.atan2(distanceY, distanceX);
        cursorPosition.x = originalPosition.x + (Math.cos(angle) * maxDistance);
        cursorPosition.y = originalPosition.y + (Math.sin(angle) * maxDistance);
    } else {
        const smoother = 0.1;
        cursorPosition.x += (mouseX - cursorPosition.x) * smoother;
        cursorPosition.y += (mouseY - cursorPosition.y) * smoother;
    }

    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(() => {
            if (cursor.value) {
                const translateX = cursorPosition.x - originalPosition.x;
                const translateY = cursorPosition.y - originalPosition.y;
                cursor.value.style.transform = `translate(${translateX}px, ${translateY}px)`;
            }
            animationFrameId = null;
        });
    }
};
</script>

<template>
    <div ref="cursor" class="cursor-follower">
        <div class="cursor-follower__inner">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.cursor-follower {
    transition: transform 0.1s ease-out;
}
</style>