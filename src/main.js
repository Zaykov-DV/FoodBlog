import { createApp } from 'vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/compat/app";
import 'firebase/auth'
import { QuillEditor } from '@vueup/vue-quill'

import './assets/styles/main.scss'

firebase.auth().onAuthStateChanged(() => {
    createApp(App).use(QuillEditor).use(router).use(store).mount('#app')
})