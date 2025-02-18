<script setup>
import { useDisplay } from 'vuetify';
const { mobile } = useDisplay()

function handleGoTo(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div v-show="!mobile">
    <v-btn @click="handleGoTo('myProjects')" text="Projects"></v-btn>
    <v-btn @click="handleGoTo('aboutMe')" text="About"></v-btn>
    <v-btn @click="handleGoTo('contactMe')" text="Contact"></v-btn>
  </div>
</template>