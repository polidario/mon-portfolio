<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
})

</script>

<template>
    <div class="d-my-5">
        <h2 class="text-lg-h2 text-md-h4 text-sm-h5 text-center">{{ title }}</h2>
    </div>
</template>