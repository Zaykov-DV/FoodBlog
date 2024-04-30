<template>
  <div class="auth">
    <div class="auth__wrapper">
      <Modal v-if="modalActive" :modal-message="modalMessage" @close-modal="closeModal"/>
      <Loading v-if="loading"/>
        <form class="auth__form">
          <p class="auth__forgot-password">
            Назад к
            <router-link class="auth__link" :to="{ name: 'Login' }">логину</router-link>
          </p>
          <h2 class="auth__title">Сбросить пароль</h2>
          <p class="auth__text">
            Введите свой email, чтобы сбросить пароль
          </p>
          <div class="auth__inputs">
            <div class="auth__input-wrapper">
              <BaseInput class="auth__input" type="text" placeholder="Password" v-model.trim="email" withIcon>
                <SvgIcon class="auth__icon" name="lock-alt-solid"/>
              </BaseInput>
            </div>
          </div>
          <button @click.prevent="resetPassword">Сбросить</button>
        </form>
        <div class="auth__background">
          <img src="../assets/images/chief.png" alt="chief">
        </div>
      </div>
    </div>
</template>

<script setup>
import Modal from "../components/UI/Modal";
import Loading from "../components/UI/Loading";
import BaseInput from "../components/UI/BaseInput";

import {getAuth, sendPasswordResetEmail} from 'firebase/auth'

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
  await sendPasswordResetEmail(auth, email.value)
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
