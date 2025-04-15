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
                        <Icon name="mdi-close" aria-label="Close Navigation" />
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
                <div class="nav-links nav-icons">
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

<style scoped lang="scss">
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #0d0914;
    z-index: 100;
    width: 100%;

    padding-right: calc(100vw - 100%); 
}

.nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .nav-mobile-section {
        display: flex;
        flex-basis: calc(100% * (2 / 3));
    }

    .nav-links {
        display: flex;
        gap: var(--space-4);
        align-items: center;
        justify-content: center;
    }

    .nav-mobile-close {
        display: none;
        flex-basis: 25%;
    }

    .nav-texts, .nav-icons {
        flex-basis: 50%;
        gap: var(--space-13);
    }

    .nav-logo-section {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: var(--space-4);
        padding: var(--space-8);
        flex-basis: calc(100% / 3);
    }

    .action-button-section {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 3rem;
        flex-basis: calc(100% / 3);
    }

    .action-button-section, .nav-mobile-section {
        flex-grow: 1;
    }

    .nav-toggle-button {
        color: var(--link-color);
        background: none;
        display: none;
        padding: var(--space-6) var(--space-8);
        align-items: center;
        justify-content: center;
        border: none;
        outline: none;
        position: relative;
        height: 100%;

        font-size: 1.25rem;
    }
}

@media (max-width: 768px) {
    .nav-container {
        justify-content: space-between;

        .nav-links {
            font-size: var(--text-h4);
        }

        .nav-mobile-section {
            background-color: var(--background-color);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            transform: translateX(100%);
            transition: transform 1s ease-in-out;
            flex-direction: column;
            animation: fadeIn 1s;
            
            z-index: 100;
            backface-visibility: hidden;
        }

        .action-button-section {
            display: none;
        }

        .nav-toggle-button {
            display: flex;
        }

        .nav-mobile-close {
            display: flex;
        }

        .nav-texts, .nav-icons {
            gap: var(--space-7);
        }
    }

    .nav-container[aria-expanded="true"] > .nav-mobile-section {
        display: flex;
        gap: var(--space-4);
        transform: translateX(0);
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        99% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
}
</style>