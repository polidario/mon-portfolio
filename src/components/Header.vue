<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Header',
    methods: {
        toggleNav() {
            const nav = document.querySelector('nav');
            if(!nav) return;

            this.isToggled = !this.isToggled;
            nav.setAttribute('aria-expanded', this.isToggled.toString());

            if(this.isToggled) {
                this.disableScroll();
            } else {
                this.enableScroll();
            }
        },
        disableScroll() {
            document.body.style.overflow = 'hidden';
        },
        enableScroll() {
            document.body.style.overflow = 'auto';
        },
    },
    data() {
        return {
            isToggled: false,
        }
    },
});
</script>

<template>
    <header class="header">
        <nav aria-expanded="false">
            <div class="nav-logo-section" id="nav-logo-section">
                <span>BP</span>
            </div>
            <div class="nav-mobile-section">
                <div class="nav-links nav-mobile-close">
                    <button v-on:click="toggleNav">
                        <v-icon icon="mdi-close"></v-icon>
                    </button>
                </div>
                <div class="nav-links nav-texts">
                    <a href="#myProjects">WORK</a>
                    <a href="#aboutMe">ABOUT</a>
                </div>
                <div class="nav-links nav-icons">
                    <a href="https://www.linkedin.com/in/polidario/" target="_blank" rel="noopener noreferrer">
                        <v-icon icon="mdi-linkedin"></v-icon>
                    </a>
                    <a href="https://youtube.com/@weeklyhow" target="_blank" rel="noopener noreferrer">
                        <v-icon icon="mdi-youtube"></v-icon>
                    </a>
                    <a href="https://instagram.com/weeklyhow" target="_blank" rel="noopener noreferrer">
                        <v-icon icon="mdi-instagram"></v-icon>
                    </a>
                </div>
            </div>
            <div class="action-button-section">
                <a href="#">GET MY CV</a>
            </div>
            <button type="button" class="nav-toggle-button" aria-label="Toggle Navigation" v-on:click="toggleNav">
                <v-icon icon="mdi-menu"></v-icon>
            </button>
        </nav>
    </header>
</template>

<style scoped>
nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

nav .nav-mobile-section {
    display: flex;
    flex-basis: calc(100% * (2 / 3));
}

nav .nav-links {
    display: flex;
    gap: var(--space-4);
    align-items: center;
    justify-content: center;
}

nav .nav-mobile-close {
    display: none;
    flex-basis: 25%;
}

nav .nav-texts, 
nav .nav-icons {
    flex-basis: 50%;
    gap: var(--space-13);
}

nav .nav-logo-section {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--space-4);
    padding: var(--space-8);
    flex-basis: calc(100% / 3);
}

nav .nav-logo-section span {
    font-size: 1.25rem;
    font-weight: bold;
}

nav .action-button-section {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 3rem;
    flex-basis: calc(100% / 3);
}

nav .action-button-section,
nav .nav-mobile-section {
    flex-grow: 1;
}

nav .nav-toggle-button {
    color: var(--link-color);
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

@media (max-width: 768px) {
    nav {
        justify-content: space-between;
    }

    nav[aria-expanded="true"] > .nav-mobile-section {
        display: flex;
        gap: var(--space-4);
        transform: translateX(0);
    }

    nav .nav-links {
        font-size: var(--text-h4);
    }

    .nav-mobile-section {
        background-color: var(--color-gray);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transform: translateX(100%);
        transition: transform 1s ease-in-out;
        flex-direction: column;
        
        z-index: 100;
    }

    nav .action-button-section {
        display: none;
    }

    nav .nav-toggle-button {
        display: flex;
    }

    nav .nav-mobile-close {
        display: flex;
    }

    nav .nav-texts, nav .nav-icons {
        gap: var(--space-7);
    }
}
</style>