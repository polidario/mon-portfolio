<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

const skillsItems = [
  {
    title: "Software Engineering",
    children: [
      { title: "Full-Stack Development", icon: "mdi-application-braces"},
      { title: "Frontend Development", icon: "mdi-language-javascript"},
      { title: "Shopify Development", icon: "mdi-cart"},
      { title: "Unity Game Development", icon: "mdi-gamepad-variant"}
    ]
  },
  {
    title: "Video Production",
    children: [
      { title: "Filming", icon: "mdi-camera"},
      { title: "Editing", icon: "mdi-movie-edit"},
      { title: "Sound Mixing", icon: "mdi-music"}
    ]
  },
]

</script>

<template>
  <div id="aboutMe" class="my-16">
    <v-sheet :class="theme.global.current.value.dark ? 'row row-animated my-16 mx-auto' : 'row my-16 mx-auto'">
      <v-sheet class="column ma-2 pa-10">
        <div class="text-subtitle-1 ">
          <p class="mb-5">Hi there! My name is Bernard Polidario, a Software Engineer with a serious passion for creating high-quality user experiences through Frontend Development.</p>
          <p class="mb-5">Coding has been woven into the fabric of my life since childhood, and the very first programming language I learned is ActionScript2. Around 2008, when Facebook games like Farm Ville, Pet Society, and Ninja Saga were a thing, I really wanted to also build my own facebook game but I don't have any financial capacity to publish my work but I learned a lot and I enjoyed what I did.</p>
          <p class="mb-5">Fast forward to 2012, I started my first YouTube channel where I tried to teach C++ with my broken english. Then, I learned how to create 3D games using Unity. I believe learning game development is such a hardwork because you not only learn how to code but you also learn how to animate using Blender, record sounds using Audacity, and work on other parts of the game.</p>

          <p>That being said, I like learning a range of cool things: From producing videos, crafting tutorials, and developing courses to creating music and songs, I embrace diverse creative pursuits. I take pleasure in sharing my knowledge and creations with a vibrant online community that I've had the privilege to build.
          Let's connect and explore the exciting intersection of technology, creativity, and meaningful user experiences!</p>
        </div>
      </v-sheet>
  
      <v-sheet :class="theme.global.current.value.dark ? 'bg-none column ma-2 pa-10' : 'column ma-2 pa-10'">
        <div v-for="(skill, i) in skillsItems" :key="i">
          <v-list lines="one" style="background: none;">
            <v-list-subheader class="font-weight-bold text-h6">{{ skill.title }}</v-list-subheader>
            <v-list-item
              v-for="(item, j) in skill.children"
              :key="j"
              :title="item.title"
              :prepend-icon="item.icon"
            >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            </v-list-item>
          </v-list>
        </div>
          
      </v-sheet>
    </v-sheet>
  </div>
</template>

<style>
#aboutMe {
  scroll-margin-top: 100px;
}

.row {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 75%;
  align-items: start;
  border-radius: 16px;
}

.row-animated {
  -webkit-box-shadow:0px 0px 145px 0px rgba(110,175,255,0.25);
  -moz-box-shadow: 0px 0px 145px 0px rgba(110,175,255,0.25);
  box-shadow: 0px 0px 145px 0px rgba(110,175,255,0.25);
}

.row-animated::before {
  content: "";
  background: radial-gradient(farthest-corner at top, #7c98ac 0%, #4c6978 12.25%, #323336 31.25%, #212121 50%) top right/200% 200%;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  overflow: hidden;
  animation: gradient 15s infinite alternate;
  border-radius: 16px;
  mix-blend-mode: overlay;
}

.column {
  background: none;
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
}

@media only screen and (max-width: 960px) {
  .row {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 0;
  }
}

@media (prefers-reduced-motion: no-preference) {
    #aboutMe {
        scale: .75;
        opacity: 0;
        animation: fade-in linear forwards;
        animation-timeline: view();
        animation-range: entry;
    }

    @keyframes fade-in {
        to { scale: 1; opacity: 1; }
    }
}

@keyframes gradient {
	to {
    background-position:top left;
  }
}
</style>