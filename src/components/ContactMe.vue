<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

</script>

<template>
    <div id="contactMe" class="my-16">
        <h2 class="text-lg-h2 text-white text-md-h4 text-sm-h5 text-center">Let's get in touch</h2>

        <div class="text-container text-sm-h6 text-md-h5 mx-auto py-8 text-center">
            <p :class="theme.global.current.value.dark && 'text-glow'">If you have any exciting projects in mind that you'd like me to be part of, feel free to reach out. Let's make cool stuff together! 😊</p>
        </div>
    </div>
</template>

<style>
.text-container {
    width: 50%;
    padding-left: 20px;
    padding-right: 20px;
}

@media only screen and (max-width: 960px) {
  .text-container {
    width: 100%;
  }
}

@media (prefers-reduced-motion: no-preference) {
    #contactMe {
        scale: .75;
        opacity: 0;
        animation: fade-in linear forwards;
        animation-timeline: view();
        animation-range: entry;
    }

    @keyframes fade-in {
        to { scale: 1; opacity: 1; }
    }
}

.v-overlay--active .v-overlay__scrim { display: none; }
.v-overlay--active {
    backdrop-filter: blur(2px);
    background: rgb(0 0 0 / 0.8);
}

@media (prefers-color-scheme: dark) {
    .v-overlay--active {
        background: rgb(0 0 0 / 0.4);
    }
}
</style>