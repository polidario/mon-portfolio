<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { ResizeSensor } from 'css-element-queries';
import { motion, useAnimate } from 'motion-v';
import { useTheme } from 'vuetify';

const [scope, animate] = useAnimate();

const theme = useTheme();

const props = defineProps({
    leftImage: {
        type: String,
        default: '',
    },
    leftLabel: {
        type: String,
        default: '',
    },
    rightImage: {
        type: String,
        default: '',
    },
    rightLabel: {
        type: String,
        default: '',
    },
    hover: {
        type: Boolean,
        default: false,
    },
    handleSize: {
        type: Number,
        default: 40,
    },
    sliderLineWidth: {
        type: Number,
        default: 2,
    },
    sliderPositionPercentage: {
        type: Number,
        default: 0.35,
    },
});

const containerRef = ref(null);
const leftImageRef = ref(null);
const rightImageRef = ref(null);
const rightLabelRef = ref(null);

const positionPct = ref(props.sliderPositionPercentage || 0.5);
const imageWidth = ref(0);
const rightLabelWidth = ref(0);
const isSliding = ref(false);

const getAndSetImageWidth = () => {
    imageWidth.value = rightImageRef.value.getBoundingClientRect().width;
    rightLabelWidth.value = rightLabelRef.value.getBoundingClientRect().width;
};

const startSliding = (e) => {
    if (!('touches' in e)) {
        e.preventDefault();
    }

    if (e.target.classList.contains('handle')) {
        isSliding.value = true;
        updateSliderPosition(e);
    }

    window.addEventListener('mousemove', updateSliderPosition);
    window.addEventListener('touchmove', updateSliderPosition);
};

const finishSliding = () => {
    isSliding.value = false;
    window.removeEventListener('mousemove', updateSliderPosition);
    window.removeEventListener('touchmove', updateSliderPosition);
};

const updateSliderPosition = (event) => {
    if (!isSliding.value) return;
    
    const e = event || window.event;
    const cursorXfromViewport = e.touches ? e.touches[0].pageX : e.pageX;
    const cursorXfromWindow = cursorXfromViewport - window.pageXOffset;

    const imagePosition = rightImageRef.value.getBoundingClientRect();
    let pos = cursorXfromWindow - imagePosition.left;

    const minPos = 0 + props.sliderLineWidth / 2;
    const maxPos = imageWidth.value - props.sliderLineWidth / 2;

    if (pos < minPos) pos = minPos;
    if (pos > maxPos) pos = maxPos;

    positionPct.value = pos / imageWidth.value;
};

const leftImageStyle = computed(() => ({
    clip: `rect(auto, ${imageWidth.value * positionPct.value}px, auto, auto)`,
}));

const rightLabelStyle = computed(() => {
    const cutLeft = Math.max(
        0,
        rightLabelWidth.value + imageWidth.value * (positionPct.value - 1),
    );
    return {
        clip: `rect(auto, auto, auto, ${cutLeft}px)`,
    };
});

const sliderStyle = computed(() => ({
    left: imageWidth.value * positionPct.value - props.handleSize / 2 + 'px',
    width: `${props.handleSize}px`,
}));

const sliderLineStyle = computed(() => ({ 
    width: `${props.sliderLineWidth}px` 
}));

const sliderHandleStyle = computed(() => ({
    border: `${props.sliderLineWidth}px solid white`,
    height: `${props.handleSize}px`,
    width: `${props.handleSize}px`,
}));

const sliderLeftArrowStyle = computed(() => ({
    border: `inset ${props.handleSize * 0.15}px rgba(0,0,0,0)`,
    borderRight: `${props.handleSize * 0.15}px solid white`,
    marginLeft: `-${props.handleSize * 0.25}px`,
    marginRight: `${props.handleSize * 0.25}px`,
}));

const sliderRightArrowStyle = computed(() => ({
    border: `inset ${props.handleSize * 0.15}px rgba(0,0,0,0)`,
    borderLeft: `${props.handleSize * 0.15}px solid white`,
    marginRight: `-${props.handleSize * 0.25}px`,
}));

onMounted(() => {
    const backgroundImages = document.getElementById('backgroundImages');
    const floatingImages = backgroundImages.querySelectorAll('.floating-image');

    floatingImages.forEach((image) => {
        animate(image, {
            opacity: [0, 1],
            translateY: [100, 0],
        }, {
            duration: 1,
            delay: Math.floor(Math.random() * 2) + 1,
        });
    });

    animate('#image_comparison', {
        opacity: [0, 1],
        translateY: [100, 0],
    }, {
        duration: 1,
        easing: 'ease-in-out',
    });

    new ResizeSensor(containerRef.value, () => {
        getAndSetImageWidth();
    });

    const containerElement = containerRef.value;

    // for mobile
    containerElement.addEventListener('touchstart', startSliding);
    window.addEventListener('touchend', finishSliding);

    // for desktop
    if (props.hover) {
        containerElement.addEventListener('mouseenter', startSliding);
        containerElement.addEventListener('mouseleave', finishSliding);
    } else {
        containerElement.addEventListener('mousedown', startSliding);
        window.addEventListener('mouseup', finishSliding);
    }
});

onBeforeUnmount(() => {
    finishSliding();
    window.removeEventListener('mouseup', finishSliding);
    window.removeEventListener('touchend', finishSliding);
});
</script>

<template>
    <div ref="scope" class="position-relative">
        <div id="image_comparison" class="mb-8 position-relative z-2">
            <div :class="theme.global.current.value.dark ? 'image-container image-container-glow' : 'image-container'" ref="containerRef">
                <img
                    src="@/assets/weeklyhow.webp"
                    :style="leftImageStyle"
                    class="left-image"
                    ref="leftImageRef"
                    alt="A video compilation of my weekly how-to videos"
                />
                
                <div :style="leftImageStyle" class="left-label">
                </div>
            
                <div class="right-image">
                    <img src="@/assets/portfolio-banner.webp" ref="rightImageRef" alt="Bernard Polidario's open for work banner" />
                </div>

                <div :style="rightLabelStyle" ref="rightLabelRef" class="right-label">{{rightLabel}}</div>
            
                <div :style="sliderStyle" class="vci-slider">
                    <div :style="sliderLineStyle" class="line"></div>
                    <div :style="sliderHandleStyle" class="handle">
                    <div :style="sliderLeftArrowStyle" class="left-arrow"></div>
                    <div :style="sliderRightArrowStyle" class="right-arrow"></div>
                    </div>
                    <div :style="sliderLineStyle" class="line"></div>
                </div>
            </div>
        </div>

        <div id="backgroundImages" class="background-images">
            <motion.div class="floating-image" style="left: -5%; top: 20%;">
                <img src="@/assets/youtube-thumbnail-f.webp" alt="My Biggest Ragrets Thumbnail" />
            </motion.div>
            <motion.div class="floating-image" style="left: -13%; top: 50%;">
                <img src="@/assets/youtube-thumbnail-e.webp" alt="How To Add Custom Metafields Thumbnail" />
            </motion.div>
            <motion.div class="floating-image" style="left: 15%; bottom: -15%;">
                <img src="@/assets/youtube-thumbnail-d.webp" alt="Shopify App Development with ChatGPT Thumbnail" />
            </motion.div>
            <motion.div class="floating-image" style="left: 41%; bottom: -25%;">
                <img src="@/assets/youtube-thumbnail-c.webp" alt="Vibe Coding for Shopify App Developers Thumbnail" />
            </motion.div>
            <motion.div class="floating-image" style="left: 71%; bottom: -12%;">
                <img src="@/assets/youtube-thumbnail-g.webp" alt="Why Programmers Quit Thumbnail" />
            </motion.div>
            <motion.div class="floating-image" style="right: -13%; top: 35%;">
                <img src="@/assets/youtube-thumbnail-b.webp" alt="My Goals For 2025 Thumbnail" />
            </motion.div>
        </div>
    </div>
</template>
  
<style scoped lang="scss">
.background-images {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
}

.floating-image {
    position: absolute;
    width: 200px;
    height: 120px;
    transform: perspective(1000px) rotateX(10deg);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
        filter: blur(3px) brightness(0.7) grayscale(.45);
        transition: all 0.3s ease;
    }
}

.z-2 {
    z-index: 2;
}

.image-container-glow {
    -webkit-box-shadow:0px 0px 145px 0px rgba(110,175,255,0.25);
    -moz-box-shadow: 0px 0px 145px 0px rgba(110,175,255,0.25);
    box-shadow: 0px 0px 145px 0px rgba(110,175,255,0.25);
}

.image-container {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    overflow: hidden;
    aspect-ratio: 16/9;
    border-radius: var(--space-4);
}
  
.left-image {
    display: block;
    height: 100%; // fit to the height of under image
    object-fit: cover; // protrudes is hidden
    aspect-ratio: 16/9;
    position: absolute;
    top: 0;
    width: 100%;
}
  
.left-label {
    position: absolute;
    top: 0px;
    left: 0px;
    padding: 10px;
}
  
.right-image {
    display: block;
    height: auto; // Respect the aspect ratio
    width: 100%;
    aspect-ratio: 16/9;
}

.right-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
  
.right-label {
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 10px;
}
  
.vci-slider {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    position: absolute;
    top: 0;
  
    .line {
        background: white;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
            0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        flex: 0 1 auto;
        height: 100%;
    }
  
    .handle {
        align-items: center;
        border-radius: 100%;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
            0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        box-sizing: border-box;
        display: flex;
        flex: 1 0 auto;
        justify-content: center;
        cursor: ew-resize;
        background-color: #171717;
    }
  
    .left-arrow {
        height: '0px';
        width: '0px';
    }
  
    .right-arrow {
        height: '0px';
        width: '0px';
    }
}

@media screen and (max-width: 768px) {
    .image-container {
        border-radius: 0;
        aspect-ratio: 4/5;
    }

    .left-image {
        aspect-ratio: 4/5;
    }

    .right-image {
        aspect-ratio: 4/5;
        width: 100%;
        height: auto;
    }

    .right-image img {
        object-position: right;
    }
}
</style>