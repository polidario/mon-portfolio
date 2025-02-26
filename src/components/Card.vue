<script setup lang="ts">

defineProps({
    title: String,
    summary: String,
    image: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },
    link: String
})
</script>

<template>
    <div class="card">
        <div class="card-text">
            <h2>{{ title }}</h2>
            <p>{{ summary }}</p>
            <a :href="link">Read more</a>
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

    width: 100%;
    max-width: 992px;

    padding: var(--space-5);
    border-radius: 1%;
    background-color: var(--color-white);

    .card-text {
        color: var(--color-black);

        h2 {
            font-size: var(--text-h2);
            font-weight: bold;
        }
    }

    .card-image {
        img {
            width: 420px;
            height: 640px;
            object-fit: cover;
            border-radius: 2%;
        }
    }
}
</style>