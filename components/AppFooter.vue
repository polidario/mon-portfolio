<script setup lang="ts">
const { data: links, error } = await useFetch('/api/links');
if (error.value) console.error('Error fetching links:', error.value);

const linklist : AppLinksResponse = links.value || {
  links: [],
  social_links: []
};

const copyright_year = new Date().getFullYear();

</script>

<template>
    <footer class="footer">
        <div class="wrapper">
            <div class="upper-footer-section">
                <div class="footer-content-logo">
                    <RouterLink to="/">
                        <span>BP</span>
                    </RouterLink>

                    <p class="quote">“The only way to do great work is to love what you do.”</p>
                    <span class="quote__name">- Steve Jobs</span>
                </div>

                <nav class="footer-content-nav">
                    <RouterLink 
                        v-for="item in linklist.links" 
                        :key="item.path" 
                        :to="item.path" 
                    >
                        {{ item.label }}
                    </RouterLink>
                    <a href="mailto:bernard@weeklyhow.com" aria-label="Contact Bernard Polidario through his email address">Contact</a>
                </nav>
            </div>
            <div class="lower-footer-section">
                <div class="footer-content-text">
                    <p>© {{ copyright_year }} Bernard Polidario.</p>
                </div>

                <nav class="footer-content-social">
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
                </nav>
            </div>
        </div>
        <div class="footer-overlay" style="
                background-color: transparent;
                backdrop-filter: blur(4px);
                mask-image: linear-gradient(rgba(0, 0, 0, 0) 20%, rgb(0, 0, 0) 80%);
                opacity: 1;
                background-repeat: repeat;
                background-image: radial-gradient(rgb(26, 26, 26) 10%, transparent 20%), radial-gradient(rgb(26, 26, 26) 10%, transparent 20%);
                background-position: 0px 0px, 8px 8px;
                background-size: 16px 16px;
        "></div>
    </footer>
</template>