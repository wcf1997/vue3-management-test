import '@unocss/reset/eric-meyer.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerPlugins } from './plugins/index'


const app = createApp(App)
app.use(router)
registerPlugins(app)
app.mount('#app')
