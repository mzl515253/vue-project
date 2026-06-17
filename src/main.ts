import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import PrismDirective from './directive/prism'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const Pinia = createPinia()
app.use(Pinia)
app.use(router)
app.use(ElementPlus)
app.directive('prism', PrismDirective)
app.mount('#app')
