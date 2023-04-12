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
          <user class="icon"/>
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName">
          <user class="icon"/>
        </div>
        <div class="input">
          <input type="text" placeholder="Username" v-model="userName">
          <user class="icon"/>
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email">
          <email class="icon"/>
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password">
          <password class="icon"/>
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
//svg
import email from "@/assets/Icons/envelope-regular.svg";
import password from "@/assets/Icons/lock-alt-solid.svg";
import user from "@/assets/Icons/user-alt-light.svg";

import firebase from "firebase/app";
import 'firebase/auth'
import db from '../firebase/firebaseInit'
import {useRouter} from 'vue-router'

const router = useRouter()
const firstName = ref('')
const lastName = ref('')
const userName = ref('')
const email = ref('')
const password = ref('')
const error = ref(null)
const errorMessage = ref('')

const register = async () => {
  if (firstName.value !== '' && lastName.value !== '' && userName.value !== '' && email.value !== '' && password.value !== '') {
    error.value = false;
    errorMessage.value = ''
    const firebaseAuth = await firebase.auth();
    const createUser = await firebaseAuth.createUserWithEmailAndPassword(email.value, password.value)
    const result = await createUser;
    const dataBase = db.collection('users').doc(result.user.uid)
    await dataBase.set({
      firstName: firstName.value,
      lastName: lastName.value,
      userName: userName.value,
      email: email.value,
    });
    router.push({name: 'Home'})
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