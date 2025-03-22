<script>
import { ResizeSensor } from 'css-element-queries';

import { animate, scroll } from 'motion';
import { useTheme } from 'vuetify'

export default {
    setup() {
        const theme = useTheme();
        return { theme }; 
    },
    mounted() {
        const backgroundImages = document.getElementById('backgroundImages');
        const floatingImages = backgroundImages.querySelectorAll('.floating-image');

        floatingImages.forEach(image => {
            animate(image, {
                opacity: [0, 1],
                translateY: [100, 0],
            }, {
                duration: 1,
            });

            scroll(animate(image, {
                opacity: [0, 1],
                translateY: [100, 0],
            }, {
                duration: 1,
            }), {
                target: image,
            });
        });

        animate('#image_comparison', {
            opacity: [0, 1],
            translateY: [100, 0],
        }, {
            duration: 0.5,
            delay: 0.5,
            easing: 'ease-in-out',
        })
        // eslint-disable-next-line
        new ResizeSensor(this.$refs.containerRef, () => {
            this.getAndSetImageWidth();
        });
    
        const containerElement = this.$refs.containerRef;
    
        // for mobile
        containerElement.addEventListener('touchstart', this.startSliding);
        window.addEventListener('touchend', this.finishSliding);
    
        // for desktop
        if (this.hover) {
            containerElement.addEventListener('mouseenter', this.startSliding);
            containerElement.addEventListener('mouseleave', this.finishSliding);
        } else {
            containerElement.addEventListener('mousedown', this.startSliding);
            window.addEventListener('mouseup', this.finishSliding);
        }
    },
    beforeUnmount() {
        this.finishSliding();
        window.removeEventListener('mouseup', this.finishSliding);
        window.removeEventListener('touchend', this.finishSliding);
    },
    props: {
        leftImage: {
            type: String,
            default: '',
        },
        leftImageAlt: {
            type: String,
            default: null,
        },
        leftLabel: {
            type: String,
            default: '',
        },
        rightImage: {
            type: String,
            default: '',
        },
        rightImageAlt: {
            type: String,
            default: null,
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
            default: 0.5,
        },
    },
    methods: {
        getAndSetImageWidth() {
            this.imageWidth = this.$refs.rightImageRef.getBoundingClientRect().width;
            this.rightLabelWidth = this.$refs.rightLabelRef.getBoundingClientRect().width;
        },
        startSliding(e) {
            if (!('touches' in e)) {
                e.preventDefault();
            }

            if (e.target.classList.contains('handle')) {
                this.isSliding = true;
                this.updateSliderPosition(e);
            }

            window.addEventListener('mousemove', this.updateSliderPosition);
            window.addEventListener('touchmove', this.updateSliderPosition);
        },
        finishSliding() {
            this.isSliding = false;
            window.removeEventListener('mousemove', this.updateSliderPosition);
            window.removeEventListener('touchmove', this.updateSliderPosition);
        },
        updateSliderPosition(event) {
            if (!this.isSliding) return;
            
            const e = event || window.event;
    
            const cursorXfromViewport = e.touches ? e.touches[0].pageX : e.pageX;
            const cursorXfromWindow = cursorXfromViewport - window.pageXOffset;
    
            const imagePosition = this.$refs.rightImageRef.getBoundingClientRect();
            let pos = cursorXfromWindow - imagePosition.left;
    
            const minPos = 0 + this.sliderLineWidth / 2;
            const maxPos = this.imageWidth - this.sliderLineWidth / 2;
    
            if (pos < minPos) pos = minPos;
            if (pos > maxPos) pos = maxPos;
    
            this.positionPct = pos / this.imageWidth;
        },
    },
    data() {
        return {
            // slider position percentage(0 to 1)
            positionPct: this.sliderPositionPercentage || 0.5,
            imageWidth: 0,
            isSliding: false,
        };
    },
    computed: {
    // eslint-disable
    leftImageStyle() {
        return {
            clip: `rect(auto, ${this.imageWidth * this.positionPct}px, auto, auto)`,
        };
    },
    rightLabelStyle() {
        const cutLeft = Math.max(
        0,
        this.rightLabelWidth + this.imageWidth * (this.positionPct - 1),
        );
        return {
        clip: `rect(auto, auto, auto, ${cutLeft}px)`,
        };
    },
    sliderStyle() {
        return {
            left: this.imageWidth * this.positionPct - this.handleSize / 2 + 'px',
            width: `${this.handleSize}px`,
        };
    },
    sliderLineStyle() {
        return { width: `${this.sliderLineWidth}px` };
    },
    sliderHandleStyle() {
        return {
        border: `${this.sliderLineWidth}px solid white`,
        height: `${this.handleSize}px`,
        width: `${this.handleSize}px`,
        };
    },
    sliderLeftArrowStyle() {
        return {
        border: `inset ${this.handleSize * 0.15}px rgba(0,0,0,0)`,
        borderRight: `${this.handleSize * 0.15}px solid white`,
        marginLeft: `-${this.handleSize * 0.25}px`, // for IE11
        marginRight: `${this.handleSize * 0.25}px`,
        };
    },
    sliderRightArrowStyle() {
        return {
        border: `inset ${this.handleSize * 0.15}px rgba(0,0,0,0)`,
        borderLeft: `${this.handleSize * 0.15}px solid white`,
        marginRight: `-${this.handleSize * 0.25}px`, // for IE11
        };
    },
    },
};
</script>

<template>
    <div class="position-relative">
        <div id="image_comparison" class="mb-8 position-relative z-2">
            <div :class="theme.global.current.value.dark ? 'image-container image-container-glow' : 'image-container'" ref="containerRef">
                <img
                    :alt="leftImageAlt"
                    src="@/assets/weeklyhow.webp"
                    :style="leftImageStyle"
                    class="left-image"
                    ref="leftImageRef"
                    alt="A video compilation of my weekly how-to videos"
                />
                
                <div :style="leftImageStyle" class="left-label">
                </div>
            
                <div class="right-image">
                    <img :alt="rightImageAlt" src="@/assets/portfolio-banner.webp" ref="rightImageRef" alt="Bernard Polidario's open for work banner" />
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
            <div class="floating-image" style="left: -5%; top: 20%;">
                <img src="@/assets/youtube-thumbnail-f.webp" alt="My Biggest Ragrets Thumbnail" />
            </div>
            <div class="floating-image" style="left: -13%; top: 50%;">
                <img src="@/assets/youtube-thumbnail-e.webp" alt="How To Add Custom Metafields Thumbnail" />
            </div>
            <div class="floating-image" style="left: 15%; bottom: -15%;">
                <img src="@/assets/youtube-thumbnail-d.webp" alt="Shopify App Development with ChatGPT Thumbnail" />
            </div>
            <div class="floating-image" style="left: 41%; bottom: -25%;">
                <img src="@/assets/youtube-thumbnail-c.webp" alt="Vibe Coding for Shopify App Developers Thumbnail" />
            </div>
            <div class="floating-image" style="left: 71%; bottom: -12%;">
                <img src="@/assets/youtube-thumbnail-g.webp" alt="Why Programmers Quit Thumbnail" />
            </div>
            <div class="floating-image" style="right: -13%; top: 35%;">
                <img src="@/assets/youtube-thumbnail-b.webp" alt="My Goals For 2025 Thumbnail" />
            </div>
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
        filter: blur(2px) brightness(0.7);
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