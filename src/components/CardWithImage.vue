<script setup lang="ts">
import { PropType } from 'vue';
import { BadgeType } from '@/types/Components';

import BadgeWithIcon from './BadgeWithIcon.vue';

defineProps({
    title: String,
    summary: String,
    image: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },
    link_text: {
        type: String,
        default: 'Read more'
    },
    link: String,
    category: {
        type: String,
        default: 'Uncategorized'
    },
    category_type: {
        type: String as PropType<BadgeType['type']>,
        default: 'info'
    }
})
</script>

<template>
    <div class="card">
        <div class="card-image">
            <img :src="image" alt="Card image">
        </div>
        <div class="card-text">
            <BadgeWithIcon :text="category" :type="category_type" />
        
            <div>
                <h2>{{ title }}</h2>
                <p>{{ summary }}</p>
            </div>

            <div v-if="link" class="link">
                <a :href="link" target="_blank">{{ link_text }}</a>
                <v-icon icon="mdi-open-in-new" size="sm"/>
            </div>
            
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--space-5);

    width: 100%;
    max-width: 992px;

    padding: var(--space-5);
    border-radius: 1%;
    background: rgb(35,28,48);
    background: -moz-linear-gradient(318deg, rgb(32, 29, 37) 0%, rgb(57, 57, 57) 100%);
    background: -webkit-linear-gradient(318deg, rgba(32, 29, 37) 0%, rgba(57, 57, 57) 100%);
    background: linear-gradient(318deg, rgba(32, 29, 37) 0%, rgba(57, 57, 57) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#231c30",endColorstr="#4f4f4f",GradientType=1);
    border: 2px solid var(--color-gray);
    
    transition: 1s ease-in-out;

    .card-text {
        width: 100%;
        color: var(--color-gray-400);

        padding-left: var(--space-4);
        padding-bottom: var(--space-4);

        h2 {
            color: var(--color-white);
            font-size: var(--text-h4);
            font-weight: bold;
            line-height: 3rem;
        }

        .link {
            display: inline-flex;
            align-items: center;
            gap: var(--space-2);
            margin-top: var(--space-5);

            a {
                color: var(--color-primary);
                text-decoration: none;
                font-weight: bold;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }

    .card-image {
        width: 100%;
        img {
            width: 100%;
            aspect-ratio: 1/1;
            object-fit: cover;
            border-radius: 2%;
            filter: grayscale(100%);
            transition: .25s ease-in-out;

            &:hover {
                filter: grayscale(0%);
            }
        }

    }
}

.card:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>