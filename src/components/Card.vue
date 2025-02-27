<script setup lang="ts">
import Badge from './Badge.vue';

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
    }
})
</script>

<template>
    <div class="card">
        <div class="card-text">
            <Badge :text="category" type="info" />
        
            <div>
                <h2>{{ title }}</h2>
                <p>{{ summary }}</p>
            </div>

            <div v-if="link" class="link">
                <a :href="link" target="_blank">{{ link_text }}</a>
                <v-icon icon="mdi-open-in-new" size="sm"/>
            </div>
            
        </div>

        <div class="card-image">
            <img :src="image" alt="Card image">
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
    gap: var(--space-5);

    width: 100%;
    max-width: 992px;

    padding: var(--space-5);
    border-radius: 1%;
    background-color: var(--color-white);
    
    transition: 0.2s ease-in-out;

    .card-text {
        width: 50%;
        color: var(--color-black);

        padding-left: var(--space-8);
        padding-bottom: var(--space-8);

        h2 {
            font-size: var(--text-h2);
            font-weight: bold;
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
        width: 50%;
        img {
            width: 100%;
            aspect-ratio: 9/12;
            object-fit: cover;
            border-radius: 2%;
        }
    }
}

.card:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transform: scale(0.98);
}
</style>