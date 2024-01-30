<script setup>
import { useDisplay } from 'vuetify';
const { mobile } = useDisplay()

function handleGoTo(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div v-show="!mobile">
    <v-btn text="Home"></v-btn>
    <v-btn @click="handleGoTo('aboutMe')" text="About me"></v-btn>
    <v-btn @click="handleGoTo('myProjects')" text="My projects"></v-btn>
    <v-btn @click="handleGoTo('contactMe')" text="Contact me"></v-btn>
  </div>
</template>