import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const test = 123
console.log(test)
app.use(createPinia())
app.use(router)

app.mount('#app')
