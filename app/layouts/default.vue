<script setup lang="ts">
</script>

<template>
    <div>
        <UContainer class="sm:border-x border-default pt-10">
            <AppHeader />
            <slot />
        </UContainer>
        
        <AppFooter />
  </div>
</template>