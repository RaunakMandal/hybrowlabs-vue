import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import LottieAnimation from 'lottie-web-vue'

import './assets/base.css'

const app = createApp(App)

app.use(LottieAnimation)

app.use(router)

app.mount('#app')
