<template>
  <div class="app" v-if="store.state.postLoaded">
    <Navigation />
    <main>
      <router-view/>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import 'firebase/auth'

import {onMounted} from 'vue'
import { useStore } from 'vuex'

import {getAuth} from 'firebase/auth'

const store = useStore()

onMounted(async () => {
  const auth = await getAuth()
  auth.onAuthStateChanged((user) => {
    store.commit('updateUser', user);
    if (user) store.dispatch('getCurrentUser', user)
  })
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
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>