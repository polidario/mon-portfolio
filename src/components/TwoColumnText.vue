<script setup>

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
        <div class="d-my-5">
            <h2 class="text-lg-h2 text-md-h4 text-sm-h5 text-center">Get to know me.</h2>
        </div>

        <v-sheet class="row my-16 mx-auto">
            <v-sheet class="column ma-2 pa-10">
                <div class="text-subtitle-1 ">
                    <p class="mb-5">Hi there! My name is Bernard Polidario, a Software Engineer with a serious passion for creating high-quality user experiences through Frontend Development.</p>
                    <p class="mb-5">Coding has been woven into the fabric of my life since childhood, and the very first programming language I learned is ActionScript2. Around 2008, when Facebook games like Farm Ville, Pet Society, and Ninja Saga were a thing, I really wanted to also build my own facebook game but I don't have any financial capacity to publish my work but I learned a lot and I enjoyed what I did.</p>
                    <p class="mb-5">Fast forward to 2012, I started my first YouTube channel where I tried to teach C++ with my broken english. Then, I learned how to create 3D games using Unity. I believe learning game development is such a hardwork because you not only learn how to code but you also learn how to animate using Blender, record sounds using Audacity, and work on other parts of the game.</p>

                    <p>That being said, I like learning a range of cool things: From producing videos, crafting tutorials, and developing courses to creating music and songs, I embrace diverse creative pursuits. I take pleasure in sharing my knowledge and creations with a vibrant online community that I've had the privilege to build.
                    Let's connect and explore the exciting intersection of technology, creativity, and meaningful user experiences!</p>
                </div>
            </v-sheet>
        
            <v-sheet class="column ma-2 pa-10">
                <div v-for="(skill, i) in skillsItems" :key="i">
                    <v-list lines="one">
                        <v-list-subheader class="font-weight-bold text-h6">{{ skill.title }}</v-list-subheader>
                        <v-list-item
                            v-for="item in skill.children"
                            :key="item"
                            :title="item.title"
                            :prepend-icon="mdi-check"
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
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 75%;
  align-items: start;
}

.column {
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
  }
}
</style>