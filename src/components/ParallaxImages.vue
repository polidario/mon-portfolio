<script setup lang="ts">
import { motion } from 'motion-v';
import { useDisplay } from 'vuetify';
const { mobile } = useDisplay();
</script>

<template>
    <div v-if="!mobile" class="container-fluid">
        <div class="wrapper-a">
            <div class="col-a">
                <motion.div class="item" initial="offscreen" whileInView="onscreen" :variants="{ offscreen: { opacity: 0, y: 120 }, onscreen: { opacity: 1, y: -100 } }" :transition="{ duration: 1.25, ease: 'easeIn', delay: 0.75 }">
                    <img src="/images/reminisce-ai-app.webp" alt="Reminisce AI homepage" width="100%"/>
                </motion.div>
            </div>
            <motion.div class="col-b" initial="offscreen" whileInView="onscreen" :variants="{ offscreen: { opacity: 0, y: 100 }, onscreen: { opacity: 1, y: -50 } }" :transition="{ duration: 1, ease: 'easeIn', delay: 0.5 }">
                <div class="item">
                    <img src="/images/bernard-polidario-music-artist-homepage.webp" alt="Bernard Polidario's artist homepage" width="100%"/>
                    <img src="/images/weeklyhow-homepage.webp" alt="WeeklyHow homepage screenshot" width="100%"/>
                </div>
                <div class="item"></div>
            </motion.div>
        </div>
        
        <div class="wrapper-b">
            <motion.div class="col-c" initial="offscreen" whileInView="onscreen" :variants="{ offscreen: { opacity: 0, y: 100 }, onscreen: { opacity: 1, y: -50 } }" :transition="{ duration: 1, ease: 'easeIn', delay: 0.5 }">
                <div class="item">
                    <img src="@/assets/liftmate-app-preview.webp" alt="Shrek Shopify theme homepage screenshot" width="100%"/>
                </div>
                <div class="item"></div>
            </motion.div>
            <div class="col-d">
                <motion.div class="item" initial="offscreen" whileInView="onscreen" :variants="{ offscreen: { opacity: 0, y: 120 }, onscreen: { opacity: 1, y: -100 } }" :transition="{ duration: 1.25, ease: 'easeIn', delay: 0.75 }">
                    <img src="@/assets/weeklyhow-live-coding-session-theme-dev.webp" alt="My Goals For 2025 Thumbnail" width="100%"/>
                </motion.div>
            </div>
        </div>
        
    </div>
</template>

<style scoped lang="scss">
.container-fluid {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 0;
    z-index: 2;

    position: relative;

    .wrapper-a, .wrapper-b {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100px;

        .col-a, .col-b, .col-c, .col-d {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-7);
        }

        .col-a, .col-d {
            filter: blur(2px);
        }
    }

    .item {
        width: 250px;
        height: 250px;
        margin: 5px;

        img {
            border-radius: 16px;
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
        }
    }
}
</style>