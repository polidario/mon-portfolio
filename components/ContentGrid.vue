<template>
  <div class="page page-content">
    <section v-for="section in content" :key="section.id" class="">
        <div class="sub-text" v-if="section.__typename === 'ComponentSectionsHeadline'">
          <h2>{{ section.title }}</h2>
          <p>{{ section.subtitle }}</p>
        </div>
    </section>
  </div>
</template>

<script setup>
defineProps({
  content: Object,
  title: String
})
</script>

<style scoped>
.hero {
  text-align: center;
  width: 650px;
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem 0 8rem 0;
}
.sub-text {
  padding: 0 0 3rem 0;
}
.hero-subtitle p {
  margin: 0;
  padding: 0;
}
.hero-subtitle {
  font-size: 1em;
  font-weight: 400;
  line-height: 1.68;
  padding: 0;
  margin: 0;
  opacity: 0.6;
}
.subtitle {
  font-size: 1.5em;
  font-weight: 500;
  line-height: 1.68;
  padding: 0;
  margin: 0;
  opacity: 0.6;
}
.project {
  grid-column: auto / span 2;
  text-align: center;
}
@media (min-width: 920px) {
  .project {
    grid-column: auto / span 1;
  }
  .project:nth-child(3n + 1) {
    grid-column: auto / span 2;
  }
}
</style>