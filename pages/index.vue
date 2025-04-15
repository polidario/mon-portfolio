<template>
    <div class="homepage d-flex flex-column align-center justify-center ga-16">
        <div :style="{ maxWidth: '1080px', zIndex: 1 }" id="imageComparison">
            <HomepageImageComparison />
        </div>

        <HomepageParallaxImages />

        <HomepageHeroSection />
    </div>
    
</template>