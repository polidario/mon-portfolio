<script setup>
import { onMounted } from 'vue';

defineProps({
  icons: {
    type: Array,
    required: true
  },
  subtext: {
    type: String
  },
  direction: {
    type: String
  }
})

onMounted(() => {
    if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        animationInit();
    }

    function animationInit() {
        document.querySelectorAll('.scroller').forEach((scroller) => {
            scroller.setAttribute("data-animated", true);

            const scrollerInner = scroller.querySelector('.scroller-inner');
            const scrollerContent = Array.from(scrollerInner.children);
            scrollerContent.forEach(item => {
                const duplicatedItem = item.cloneNode(true)
                duplicatedItem.setAttribute('aria-hidden', true)
                scrollerInner.appendChild(duplicatedItem)
            });
            
        })
    }
})
</script>

<template>
    <div class="scroller">
        <div class="scroller-inner">
            <v-sheet 
                v-for="{ id, icon } in icons" 
                :key="id"
                class="scroller-item px-5 py-2"
                rounded
            >
                <v-icon :icon="icon" size="50"></v-icon>
            </v-sheet>
        </div>
        
    </div>
</template>

<style>
.scroller {
    max-width: 512px;
    margin: 0 auto;
}

.scroller-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding-block: 1.75rem;
    flex-wrap: wrap;
}

.scroller-inner .scroller-item {
    background: none;
    opacity: 0.5;
}

.scroller-inner .scroller-item:hover {
    scale: 1.2;
    transition: all 1s ease;
    opacity: 1;
}

.scroller[data-animated="true"] {
    overflow: hidden;
    -webkit-mask: linear-gradient(90deg, transparent, white 10%, white 90%, transparent);
    mask: linear-gradient(90deg, transparent, white 10%, white 90%, transparent);
}

.scroller[data-animated="true"] .scroller-inner {
    width: fit-content;
    flex-wrap: nowrap;
    animation: scroller 40s linear infinite;
}

@media only screen and (max-width: 960px) {
  .scroller {
    max-width: 100%;
  }
}

@keyframes scroller {
    to {
        transform: translate(calc(-50% - 0.5rem));
    }
}
</style>