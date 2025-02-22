<template>
    <div class="zoom-in-and-out">
        <div class="zoom-in-and-out__inner">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.zoom-in-and-out__inner {
    animation: zoom-in-and-out 2s infinite;
}

@keyframes zoom-in-and-out {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}
</style>