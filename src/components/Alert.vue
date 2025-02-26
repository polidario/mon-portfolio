<script setup lang="ts">
defineProps({
    title: String,
    message: String,
    type: {
        type: String,
        default: 'info'
    }
})
</script>

<template>
    <div class="alert" :class="type">
        <h2>{{ title }}</h2>
        <p>{{ message }}</p>
    </div>
</template>

<style scoped lang="scss">
.alert {
    padding: var(--space-5);
    border-radius: 5px;
    margin-bottom: var(--space-5);
    font-size: var(--text-p);
    text-align: center;

    h2 {
        font-size: var(--text-h5);
        margin-bottom: var(--space-3);
        font-weight: bold;
    }

    &.info {
        background-color: var(--color-info);
        color: var(--color-white);
        border: 1px solid var(--color-info-dark);
    }

    &.warning {
        background-color: var(--color-warning);
        color: var(--color-white);
        border: 1px solid var(--color-warning-dark);
    }

    &.error {
        background-color: var(--color-error);
        color: var(--color-white);
        border: 1px solid var(--color-error-dark);
    }

    &.success {
        background-color: var(--color-success);
        color: var(--color-white);
        border: 1px solid var(--color-success-dark);
    }
}
</style>