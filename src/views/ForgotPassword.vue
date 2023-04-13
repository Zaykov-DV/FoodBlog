<template>
  <div class="reset-password">
    <Modal v-if="modalActive" :modal-message="modalMessage" v-on:close-modal="closeModal"/>
    <Loading v-if="loading" />
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Back to
          <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
        </p>
        <h2>Reset Password</h2>
        <p class="login-register">
          Enter your email to reset password
        </p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email">
            <SvgIcon name="envelope-regular" class="icon"/>
          </div>
        </div>
        <button @click.prevent="resetPassword">Reset</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script setup>
import Modal from "../components/UI/Modal";
import Loading from "../components/Loading";


import { getAuth } from 'firebase/auth'

import {ref} from 'vue'
import SvgIcon from "../components/UI/SvgIcon";

const email = ref(null)
const modalActive = ref(null)
const modalMessage = ref('')
const loading = ref(null)

const closeModal = () => {
  modalActive.value = !modalActive.value;
  email.value = '';
}

const resetPassword = async () => {
  loading.value = true
  const auth = await getAuth()
  await auth.sendPasswordResetEmail(auth, email.value)
      .then(() => {
        modalMessage.value = 'If your account exists, you will receive a email';
        loading.value = false;
        modalActive.value = true
      })
      .catch((err) => {
        modalMessage.value = err.message;
        loading.value = false;
        modalActive.value = true
      })
}
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;

  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }

      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>