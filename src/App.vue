<template>
  <div class="app" v-if="store.state.postLoaded">
    <Navigation v-if="!navigation.value"/>
    <main>
      <router-view/>
    </main>
    <Footer v-if="!navigation.value"/>
  </div>
</template>

<script setup>
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import 'firebase/auth'

import {onMounted, ref, watchEffect} from 'vue'
import { useRoute } from "vue-router";
import { useStore } from 'vuex'

import {getAuth} from 'firebase/auth'

const route = useRoute()
const store = useStore()

const navigation = ref(null)

const checkRoute = () => {
  route.name === 'Login' || route.name === 'Register' || route.name === 'ForgotPassword'
      ? navigation.value = true
      : navigation.value = false
}

watchEffect(() => {
  checkRoute()
})

onMounted(async () => {
  const auth = await getAuth()
  auth.onAuthStateChanged((user) => {
    store.commit('updateUser', user);
    if (user) store.dispatch('getCurrentUser', user)
  })
  checkRoute();
  store.dispatch('getPost')
})

</script>

<style>

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1440px;
  margin: 0 auto;
}

main {
  flex: 1;
}
</style>