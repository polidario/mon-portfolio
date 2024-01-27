<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

const contactList = [
{
        title: "LinkedIn",
        icon: "mdi-linkedin",
        url: "https://linkedin.com/in/polidario"
    },
    {
        title: "Email",
        icon: "mdi-email",
        url: "mailto:bernard@weeklyhow.com"
    },
    {
        title: "GitHub",
        icon: "mdi-github",
        url: "https://github.com/polidario"
    },
]

</script>

<template>
    <div id="contactMe" class="my-16">
        <div class="d-my-5">
            <h2 class="text-lg-h2 text-md-h4 text-sm-h5 text-center">Let's Get In Touch</h2>
        </div>

        <v-divider class="my-5"></v-divider>

        <div class="text-container text-sm-h6 text-md-h5 mx-auto my-16 py-16 text-center">
            <p :class="theme.global.current.value.dark && 'text-glow'">If you have any exciting projects in mind that you'd like me to be part of, feel free to reach out. Let's make cool stuff together! 😊</p>
        </div>

        <div class="d-flex align-center justify-center my-4 mx-auto">
            

            <v-dialog width="700">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" size="x-large" color="primary" class="rounded-pill" text="Send me a message here"></v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                    <v-card text="" rounded="lg" variant="flat">
                        <div class="pa-10">
                            <v-item-group
                                    v-model="model"
                                    class="d-flex justify-space-around px-6 pt-2 pb-6"
                                >
                                <v-item
                                    v-for="(contact, i) in contactList"
                                    :key="i"
                                >
                                    <template v-slot:default="{}">
                                        <v-btn
                                            :icon="contact.icon"
                                            :active="model != null && model + 1 >= n"
                                            border
                                            height="70"
                                            variant="text"
                                            width="70"
                                            :href="contact.url"
                                            target="_blank"
                                        ></v-btn>
                                    </template>
                                </v-item>
                            </v-item-group>
                        </div>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn
                                text="Close"
                                @click="isActive.value = false"
                            ></v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </div>
    </div>
</template>

<style>
.text-container {
    width: 50%;
    padding-left: 20px;
    padding-right: 20px;
}

.text-glow {
    text-shadow: rgb(110, 175, 255) 0px 0px 100px;
}

@media only screen and (max-width: 960px) {
  .text-container {
    width: 100%;
  }
}

@media (prefers-reduced-motion: no-preference) {
    #contactMe {
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
</style>