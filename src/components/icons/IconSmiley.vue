<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const angle = (cx: number, cy: number, ex: number, ey: number) => {
    const dy = ey - cy;
    const dx = ex - cx;
    let theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    return theta;
}


onMounted(() => {
    let eyes = document.querySelectorAll('.eye');

    const eyeCenter = Array.from(eyes).map((eye) => {
        const anchor = eye.getBoundingClientRect();
        return {
            eye,
            centerX: anchor.left + anchor.width / 2,
            centerY: anchor.top + anchor.height / 2,
        }
    });

    const moveHandler = (event: MouseEvent) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        requestAnimationFrame(() => {
            eyeCenter.forEach(({ eye, centerX, centerY }) => {
                const angleDeg = angle(centerX, centerY, mouseX, mouseY);
                eye.style.transform = `rotate(${angleDeg}deg)`;
            })
        })
    }

    document.addEventListener('mousemove', moveHandler);

    onUnmounted(() => {
        document.removeEventListener('mousemove', moveHandler);
    });
})
</script>

<template>
    <div class="smile-emoji">
        <div class="eyes">
            <div class="eye"></div>
            <div class="eye"></div>
        </div>
        <div class="blushes">
            <div class="blush"></div>
            <div class="blush"></div>
        </div>
    </div>
</template>

<style scoped>
.smile-emoji {
    position: relative;
    width: 200px;
    height: 200px;
    background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 300px rgba(246, 211, 101, 0.75);
}

.eyes {
    position: relative;
    top: -20px;
    display: flex;
}

.eyes .eye {
    position: relative;
    width: 50px;
    height: 50px;
    display: block;
    background-color: #fff;
    border-radius: 50%;
    margin: 0 10px;
}

.eyes .eye::before {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: #000;
    border-radius: 50%;
    top: 50%;
    left: 14px;
    transform: translate(-50%, -50%);
}

.blushes {
    position: absolute;
    top: 100px;
    display: flex;
}

.blush {
    position: relative;
    width: 50px;
    height: 20px;
    display: block;
    background-color: #f68765;
    border-radius: 50%;
    margin: 0 10px;
    filter: blur(5px);
}

.smile-emoji::before {
    content: "";
    position: absolute;
    width: 80px;
    height: 40px;
    background-color: #ff5454;
    border-bottom-right-radius: 50%;
    border-bottom-left-radius: 50%;
    top: 120px;
}

.smile-emoji::after {
    content: "";
    position: absolute;
    width: 70px;
    height: 10px;
    background-color: #fff;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    top: 120px;
}
</style>