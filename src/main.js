import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/lib/util/colors'

import App from './App.vue'
import router from './router'

import '@mdi/font/css/materialdesignicons.css'
import './css/main.css'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        dark: false,
        variables: {}, // ✅ required to avoid Vuetify crash

        colors: {
          primary: colors.red.darken1
        },
      },
      dark: {
        dark: true,
        variables: {}, // ✅ required to avoid Vuetify crash

        colors: {
          "textPrimary": colors.red.darken1,
          primary: colors.red.base,
        },
      }
    }
  },
    components,
    directives,
  })

const app = createApp(App)

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
