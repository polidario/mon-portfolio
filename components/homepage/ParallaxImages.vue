<script setup>
import { motion } from 'motion-v';
</script>

<template>
    <div class="container-fluid parallax-images">
        <div class="wrapper-a">
            <div class="col-a">
                <motion.div class="item" initial="offscreen" whileInView="onscreen" :variants="{ offscreen: { opacity: 0, y: 120 }, onscreen: { opacity: 1, y: -100 } }" :transition="{ duration: 1.25, ease: 'easeIn', delay: 0.75 }">
                    <img src="@/assets/images/reminisce-ai-app.webp" alt="Reminisce AI homepage" width="250" />
                </motion.div>
            </div>
            <motion.div class="col-b" initial="offscreen" whileInView="onscreen" :variants="{ offscreen: { opacity: 0, y: 100 }, onscreen: { opacity: 1, y: -50 } }" :transition="{ duration: 1, ease: 'easeIn', delay: 0.5 }">
                <div class="item">
                    <img src="@/assets/images/bernard-polidario-music-artist-homepage.webp" alt="Bernard Polidario's artist homepage" width="250"/>
                    <img src="@/assets/images/weeklyhow-homepage.webp" alt="WeeklyHow homepage screenshot" width="250"/>
                </div>
                <div class="item"></div>
            </motion.div>
        </div>
        
        <div class="wrapper-b">
            <motion.div class="col-c" initial="offscreen" whileInView="onscreen" :variants="{ offscreen: { opacity: 0, y: 100 }, onscreen: { opacity: 1, y: -50 } }" :transition="{ duration: 1, ease: 'easeIn', delay: 0.5 }">
                <div class="item">
                    <img src="@/assets/images/liftmate-app-preview.webp" alt="Shrek Shopify theme homepage screenshot" width="250"/>
                </div>
                <div class="item"></div>
            </motion.div>
            <div class="col-d">
                <motion.div class="item" initial="offscreen" whileInView="onscreen" :variants="{ offscreen: { opacity: 0, y: 120 }, onscreen: { opacity: 1, y: -100 } }" :transition="{ duration: 1.25, ease: 'easeIn', delay: 0.75 }">
                    <img src="@/assets/images/weeklyhow-live-coding-session-theme-dev.webp" alt="My Goals For 2025 Thumbnail" width="250"/>
                </motion.div>
            </div>
        </div>
        
    </div>
</template>