<script setup lang="ts">
import { onMounted } from 'vue';
import { animate, scroll } from 'motion'

onMounted(() => {
    const colA = document.querySelector(".col-a .item")
    const colB = document.querySelector(".col-b")
    const colC = document.querySelector(".col-c")
    const colD = document.querySelector(".col-d .item")

    if(!colA || !colB || !colC || !colD) return;

    scroll(animate(colA, { y: [-100, 120] }, { ease: "easeIn" }), {
        target: colA,
    })
    scroll(animate(colB, { y: [-50, 100] }, { ease: "easeIn" }), {
        target: colB,
    })
    scroll(animate(colC, { y: [-50, 100] }, { ease: "easeIn" }), {
        target: colC,
    })
    scroll(animate(colD, { y: [-100, 120] }, { ease: "easeIn" }), {
        target: colD,
    })
})
</script>

<template>
    <div class="container-fluid">
        <div class="wrapper-a">
            <div class="col-a">
                <div class="item">
                    <img src="/images/reminisce-ai-app.png" alt="Reminisce AI homepage" width="100%"/>
                </div>
            </div>
            <div class="col-b">
                <div class="item">
                    <img src="/images/bernard-polidario-music-artist-homepage.png" alt="Reminisce AI homepage" width="100%"/>
                    <img src="/images/weeklyhow-homepage.png" alt="Reminisce AI homepage" width="100%"/>
                </div>
                <div class="item"></div>
            </div>
        </div>
        
        <div class="wrapper-b">
            <div class="col-c">
                <div class="item">
                    <img src="/images/shrek-homepage-mobile.webp" alt="Shrek" width="100%"/>
                </div>
                <div class="item"></div>
            </div>
            <div class="col-d">
                <div class="item">
                    <img src="/images/youtube-thumbnail-a.webp" alt="My Goals For 2025 Thumbnail" width="100%"/>
                </div>
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
    height: 100px;

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