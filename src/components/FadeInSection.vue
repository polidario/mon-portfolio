<template>
    <div
      :class="['fade-in-section', { 'is-visible': isVisible, 'is-hidden': !isVisible }]"
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
  
      onMounted(() => {
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            // Update visibility based on intersection
            isVisible.value = entry.isIntersecting;
          });
        });
  
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
.fade-in-section {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 1.3s ease-out, transform 0.9s ease-out;

    margin-top: 5em;
}
  
.fade-in-section.is-visible {
    opacity: 1;
    transform: translateY(0);
}
  
.fade-in-section.is-hidden {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 1.3s ease-out, transform 0.9s ease-out;
}
</style>