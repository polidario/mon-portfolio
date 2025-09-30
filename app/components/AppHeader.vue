<script setup lang="ts">
const { data: links, error } = await useFetch('/api/links');
if (error.value) console.error('Error fetching links:', error.value);

const linklist : AppLinksResponse = links.value || {
  links: [],
  social_links: []
};

const isToggled = ref(false);
const navRef = ref<HTMLElement | null>(null);

let resizeTimer: number | null = null;
const handleResize = () => {
  if (resizeTimer) return;
  
  resizeTimer = window.setTimeout(() => {
    if (window.innerWidth > 768 && isToggled.value) {
      isToggled.value = false;
      enableScroll();
    }
    resizeTimer = null;
  }, 100);
};

const handleEscKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isToggled.value) {
    toggleNav();
  }
};

const toggleNav = () => {
  if (!navRef.value) return;
  
  isToggled.value = !isToggled.value;
  
  if (isToggled.value) {
    disableScroll();
  } else {
    enableScroll();
  }
};

const disableScroll = () => {
  document.body.style.overflow = 'hidden';
};

const enableScroll = () => {
  document.body.style.overflow = 'auto';
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  window.addEventListener('keydown', handleEscKey);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('keydown', handleEscKey);
  if (resizeTimer) clearTimeout(resizeTimer);
});
</script>

<template>
    <header class="header" role="banner">
        <nav ref="navRef" :aria-expanded="isToggled" class="nav-container">
            <div class="nav-logo-section">
                <RouterLink to="/" aria-label="Bernard Polidario's Homepage">
                    <span>BP</span>
                </RouterLink>
            </div>
            <div class="nav-mobile-section" :class="{ 'nav-mobile-active': isToggled }">
                <div class="nav-links nav-mobile-close">
                    <button role="button" v-on:click="toggleNav" aria-label="Close Navigation">
                        <Icon size="3em" name="mdi-close" aria-label="Close Navigation" />
                    </button>
                </div>
                <div class="nav-links nav-texts">
                    <RouterLink 
                        v-for="item in linklist.links" 
                        :key="item.path" 
                        :to="item.path" 
                        @click="toggleNav"
                    >
                        {{ item.label }}
                    </RouterLink>
                </div>
                <div v-if="$device.isMobileOrTablet" class="nav-links nav-icons">
                    <a 
                        v-for="link in linklist.social_links" 
                        :key="link.url" 
                        :href="link.url" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        :aria-label="`Open ${link.label}`"
                    >
                        <Icon :name="link.icon" :aria-label="link.label" />
                    </a>
                </div>
            </div>
            <div class="action-button-section">
                <a href="/cvs/bernard-polidario-resume.pdf" 
                    target="_blank" 
                    aria-label="Get Bernard Polidario's CV"
                >GET MY CV</a>
            </div>
            <button role="button" type="button" class="nav-toggle-button" aria-label="Toggle Navigation" v-on:click="toggleNav">
                <Icon name="mdi-menu" aria-label="Menu" />
            </button>
        </nav>
    </header>
</template>