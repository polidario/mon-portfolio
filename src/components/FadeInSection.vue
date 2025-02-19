<template>
    <div
      :class="['section', { 'is-visible': isVisible, 'is-hidden': !isVisible }]"
      ref="domRef"
    >
      <slot></slot>
    </div>
  </template>
  
<script>
import { ref, onMounted, onUnmounted } from 'vue';
  
export default {
    name: 'FadeInSection',
    setup() {
        const isVisible = ref(false);
        const domRef = ref(null);

        const options = {
            rootMargin: '0px 0px -25% 0px',
            threshold: 0.25
        }
        
        onMounted(() => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    isVisible.value = entry.isIntersecting;
                });
            }, options);

            if (domRef.value) {
                observer.observe(domRef.value);
            }

            onUnmounted(() => {
                if (domRef.value) {
                    observer.unobserve(domRef.value);
                }
            });
        });
        
        return {
            isVisible,
            domRef,
        };
    },
};
</script>
  
<style scoped>
.section {
    opacity: 0;
    scale: 0.85;
    transition: opacity 1.3s ease-out, scale 0.9s ease-in-out;
    width: 100%;
    max-width: 1080px;

    margin-top: var(--space-16);
    margin-bottom: var(--space-16);
}
  
.section.is-visible {
    opacity: 1;
    scale: 1;
}
  
.section.is-hidden {
    opacity: 0;
    scale: 0.85;
    transition: opacity 1.3s ease-out, scale 0.9s ease-in-out;
}
</style>