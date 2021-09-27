import { createApp } from 'vue'
import App from './App.vue'
import { fabric } from 'fabric'
const app = createApp(App)
app.mount('#app')
app.use(fabric)