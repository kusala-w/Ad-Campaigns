import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/app.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import VueResource from 'vue-resource'
import axios from 'axios'

const app = createApp(App)
app.use(router, VueResource, axios)
app.mount('#app')
