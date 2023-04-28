<template>
  <div class="profile">
    <div class="profile__container">
      <h2 class="profile__title">Панель администратора</h2>
      <div class="profile__info">
        <h4 class="profile__subtitle">Добавить админа</h4>
        <div class="profile__input-wrapper">
          <input class="profile__input" placeholder="Введите e-mail пользователя"
                 type="text" id="addAdmins" v-model="adminEmail" />
        </div>
        <span  class="profile__message">{{ functionMsg }}</span>
        <button @click="addAdmin" class="button">Добавить администратора</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import firebase from "firebase/compat/app";
import "firebase/compat/functions";
import {ref} from 'vue'

const adminEmail = ref('')
const functionMsg = ref(null)

const addAdmin = async () => {
  const addAdmin = await firebase.functions().httpsCallable("addAdminRole");
  const result = await addAdmin({ email: adminEmail.value });
  functionMsg.value = result.data.message;
}

</script>