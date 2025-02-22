<script setup lang="ts">

defineProps({
    width: {
        type: String,
        default: '24',
    },
    height: {
        type: String,
        default: '24',
    },
    color: {
        type: String,
        default: '#000',
    }
})
</script>

<template>
    <svg class="heart" :width="width" :height="height" :fill="color" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="_x32_" viewBox="-100 -100 512 512" xml:space="preserve">
        <g>
            <path class="st0" d="M380.63,32.196C302.639,33.698,264.47,88.893,256,139.075c-8.47-50.182-46.638-105.378-124.63-106.879   C59.462,30.814,0,86.128,0,187.076c0,129.588,146.582,189.45,246.817,286.25c3.489,3.371,2.668,3.284,2.668,3.284   c1.647,2.031,4.014,3.208,6.504,3.208v0.011c0,0,0.006,0,0.011,0c0,0,0.006,0,0.011,0v-0.011c2.489,0,4.856-1.177,6.503-3.208   c0,0-0.821,0.086,2.669-3.284C365.418,376.526,512,316.664,512,187.076C512,86.128,452.538,30.814,380.63,32.196z"/>
        </g>
    </svg>
</template>

<style scoped>
/** remove svg background */
.heart {
    background: none;
    position: fixed;
    top: -100px;
}

.heart path {
    animation: fill 1s infinite alternate;
    fill: #f44336;
    transition: fill 0.3s;
    filter: drop-shadow(0px 0px 105px rgba(250,68,68,0.9));
    scale: 0.25;
}

@keyframes fill {
    0% {
        fill:rgb(250,68,68);
    }
    50% {
        fill: rgb(251, 94, 94);
    }
    100% {
        fill: rgba(250,68,68);
    }
}

</style>