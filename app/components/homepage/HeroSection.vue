<script setup lang="ts">
const { data, error } = await useFetch<WebsiteResponse>('/api/site');
if (error.value) console.error('Error fetching website:', error.value);

const website = data.value || {} as WebsiteResponse;
</script>

<template>
    <UPageHero
        :ui="{
            headline: 'flex items-center justify-center',
            title: 'text-shadow-md max-w-lg mx-auto',
            links: 'mt-4 flex-col justify-center items-center'
        }"
    >
        <template #headline>
            <Motion
                :initial="{
                    scale: 1.1,
                    opacity: 0,
                    filter: 'blur(20px)'
                }"
                :animate="{
                    scale: 1,
                    opacity: 1,
                    filter: 'blur(0px)'
                }"
                :transition="{
                    duration: 0.6,
                    delay: 0.1
                }"
            >
                <UColorModeAvatar
                    class="size-18 ring ring-default ring-offset-3 ring-offset-(--ui-bg)"
                    :light="website.profile_photo_url"
                    :dark="website.profile_photo_url"
                />
            </Motion>
        </template>

        <template #title>
            <Motion
                :initial="{
                    scale: 1.1,
                    opacity: 0,
                    filter: 'blur(20px)'
                }"
                :animate="{
                    scale: 1,
                    opacity: 1,
                    filter: 'blur(0px)'
                }"
                :transition="{
                    duration: 0.6,
                    delay: 0.1
                }"
            >
                Hi, I'm {{ website.name }}
            </Motion>
        </template>

        <template #description>
            <Motion
                :initial="{
                    scale: 1.1,
                    opacity: 0,
                    filter: 'blur(20px)'
                }"
                :animate="{
                    scale: 1,
                    opacity: 1,
                    filter: 'blur(0px)'
                }"
                :transition="{
                    duration: 0.6,
                    delay: 0.3
                }"
            >
                <p class="text-base">{{ website.description }}</p>
                <p class="text-sm">Based in Paris, France</p>
            </Motion>
        </template>
    </UPageHero>
</template>