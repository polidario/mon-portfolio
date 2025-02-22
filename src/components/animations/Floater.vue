<template>
    <div class="floater">
        <slot></slot>
    </div>
</template>

<style scoped>
.floater {
    animation: float 6s infinite;
}

@keyframes float {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-20px);
    }
    100% {
        transform: translateY(0);
    }
}
</style>