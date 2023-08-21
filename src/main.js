import { createApp } from 'vue'
import App from "./App.vue";
import router from "./router";
import firebase from "firebase/compat/app";
import 'firebase/auth'
import { QuillEditor } from '@vueup/vue-quill'
import { createPinia } from 'pinia'
import './assets/styles/main.scss'

const pinia = createPinia()

firebase.auth().onAuthStateChanged(() => {
    createApp(App).use(QuillEditor).use(pinia).use(router).mount('#app')
})