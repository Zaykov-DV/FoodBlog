<template>
  <div class="profile">
    <div class="profile__container">
      <h2 class="profile__title">Панель администратора</h2>
      <div class="profile__info">
        <h4 class="profile__subtitle">Добавить админа</h4>
        <div class="profile__input-wrapper">
          <BaseInput placeholder="Введите e-mail пользователя"
                 type="text" v-model="adminEmail"/>
        </div>
        <span class="profile__message">{{ functionMsg }}</span>
        <button @click="addAdmin" class="button">Добавить администратора</button>
      </div>
    </div>
    <Modal v-if="modalActive" v-on:close-modal="handlePreview" :modal-title="modalTitle">
      {{modalMessage}}
    </Modal>
  </div>
</template>

<script setup>
import "firebase/compat/functions";
import {ref} from 'vue'
import db from "../firebase/firebaseInit";
import Modal from "../components/UI/Modal";
import BaseInput from "../components/UI/BaseInput";

const adminEmail = ref('')
const functionMsg = ref(null)

const id = ref(null)

const modalActive = ref(false)

const handlePreview = () => {
  modalActive.value = !modalActive.value
}

const modalMessage = ref('')
const modalTitle = ref('')

const addAdmin = async () => {
  db.collection('users')
      .where('email', '==', `${adminEmail.value}`)
      .get()
      .then(docs => {
        docs.forEach(doc => {
          id.value = doc.id
        })
      })
      .then(() => {
        db.collection('users').doc(id.value).update({
          isAdmin: true
        })
      })
      .then(() => {
        modalTitle.value = 'Успешно!'
        modalMessage.value = `Пользователь с е-мейлом ${adminEmail.value} теперь администратор!`
        modalActive.value = true
      })
      .catch((error) => {
        console.log(error)
        modalTitle.value = 'Ошибка!'
        modalMessage.value = 'Проверьте введеный e-mail'
        modalActive.value = true
      })
}

</script>