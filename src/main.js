import { createApp } from 'vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import 'firebase/auth'
import { QuillEditor } from '@vueup/vue-quill'

// Vue.config.productionTip = false;

import './assets/styles/main.scss'


firebase.auth().onAuthStateChanged(() => {
  createApp(App).component('QuillEditor', QuillEditor).use(router).use(store).mount('#app')
})