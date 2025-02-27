<script setup lang="ts">
import { PropType } from 'vue';
interface BadgeType {
    type: 'info' | 'error' | 'success' | 'warning';
}

defineProps({
    text: String,
    type: {
        type: String as PropType<BadgeType['type']>,
        default: 'info'
    }
})
</script>

<template>
    <div :class="['badge', type]">
        <span>{{ text }}</span>
    </div>
</template>

<style scoped lang="scss">
.badge {
    display: inline-block;
    padding: var(--space-2) var(--space-4);
    border-radius: 999px;
    font-size: var(--text-small);
    font-weight: bold;
    text-transform: uppercase;
    color: var(--color-white);

    &.info {
        background-color: var(--color-info);
    }

    &.error {
        background-color: var(--color-error);
    }

    &.success {
        background-color: var(--color-success);
    }

    &.warning {
        background-color: var(--color-warning);
    }
}
</style>