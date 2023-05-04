<template>
  <div class="app" v-if="blogsStore.postLoaded">
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

import {getAuth} from 'firebase/auth'

import { useAuthUserStore } from '@/stores/auth-user'
const authUserStore = useAuthUserStore()

import { useBlogsStore } from '@/stores/blogs-store'
const blogsStore = useBlogsStore()

onMounted(async () => {
  const auth = await getAuth()
  auth.onAuthStateChanged((user) => {
    authUserStore.updateUser(user)
    if (user) authUserStore.getCurrentUser(user)
  })
  await blogsStore.getPost()
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