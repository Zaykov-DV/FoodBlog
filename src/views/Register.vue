<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }">Register</router-link>
      </p>
      <h2>Create Your Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName">
          <SvgIcon name="user-alt-light" class="icon"/>
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName">
          <SvgIcon name="user-alt-light" class="icon"/>
        </div>
        <div class="input">
          <input type="text" placeholder="Username" v-model="userName">
          <SvgIcon name="user-alt-light" class="icon"/>
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email">
          <SvgIcon name="envelope-regular" class="icon"/>
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password">
          <SvgIcon name="lock-alt-solid" class="icon"/>
        </div>
        <div class="error" v-show="error">{{ errorMessage }}</div>
      </div>
      <button @click.prevent="register">Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script setup>

import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'

import db from '../firebase/firebaseInit'
import {useRouter} from 'vue-router'

import { ref } from 'vue'
import SvgIcon from "../components/UI/SvgIcon";

const router = useRouter()
const firstName = ref('')
const lastName = ref('')
const userName = ref('')
const email = ref('')
const password = ref('')
const error = ref(null)
const errorMessage = ref('')

const register = async () => {
  const auth = await getAuth()
  if (firstName.value !== '' && lastName.value !== '' && userName.value !== '' && email.value !== '' && password.value !== '') {
    error.value = false;
    errorMessage.value = ''
    const createUser = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const result = await createUser;
    const dataBase = db.collection('users').doc(result.user.uid)
    await dataBase.set({
      firstName: firstName.value,
      lastName: lastName.value,
      userName: userName.value,
      email: email.value,
    })
    .then(() => {
      router.push({name: 'Home'})
    })

  }
  error.value = true
  errorMessage.value = 'Please fill out all the fields!'
}
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>