<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
    },
})
</script>

<template>
    <div class="list-item">
        <div class="list-item__body">
            <div :style="{
                width: '4rem',
                height: '4rem',
                borderRadius: '25%',
            }">
                <slot name="icon"></slot>
            </div>

            <div class="list-item__title">
                <span class="text-h5">{{ title }}</span>
                <p>{{ description }}</p>
            </div>
            
        </div>
        <div class="list-item__link"></div>
    </div>
</template>

<style scoped>
.list-item {
    display: flex;
    flex-direction: row;
    align-items: start;
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