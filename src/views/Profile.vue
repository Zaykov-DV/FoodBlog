<template>
  <div class="profile">
    <Modal v-if="modalActive" :modalMessage="modalMessage" @close-modal="closeModal"/>
    <div class="profile__container">
      <h2 class="profile__title">Настройки аккаунта</h2>
      <div class="profile__info">
        <div class="profile__initials">{{ authUserStore.profileInitials }}</div>
        <div class="profile__admin-badge" v-if="authUserStore.isAdmin">
          <SvgIcon name="user-crown-light"/>
          <span>админ</span>
        </div>
        <div v-else class="profile__admin-badge">
          <SvgIcon name="user-alt-light"/>
          <span>пользователь</span>
        </div>
        <div class="profile__input-wrapper">
          <BaseInput class="profile__input" type="text" id="firstName" v-model="firstName" label="Фамилия"/>
        </div>
        <div class="profile__input-wrapper">
          <BaseInput class="profile__input" type="text" id="lastName" v-model="lastName" label="Имя"/>
        </div>
        <div class="profile__input-wrapper">
          <BaseInput class="profile__input" type="text" id="username" v-model="userName" label="Псевдоним"/>
        </div>
        <div class="profile__input-wrapper">
          <BaseInput class="profile__input" disabled type="text" id="email" v-model="email" label="E-mail"/>
        </div>
        <button @click="updateProfile">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Modal from "../components/UI/Modal";
import { useAuthUserStore } from '@/stores/auth-user'
import {ref, computed} from 'vue'
import SvgIcon from "../components/UI/SvgIcon";
import BaseInput from "../components/UI/BaseInput";

const modalMessage = ref("Changes were saved!")
const modalActive = ref(null)

const authUserStore = useAuthUserStore()

const updateProfile = () => {
  authUserStore.updateUserSettings()
  modalActive.value = !modalActive.value
}
const closeModal = () => {
  modalActive.value = !modalActive.value
}

const firstName = computed({
  get() {
    return authUserStore.profileFirstName;
  },
  set(payload) {
    authUserStore.changeFirstName(payload)
  }
})

const lastName = computed({
  get() {
    return authUserStore.profileLastName;
  },
  set(payload) {
    authUserStore.changeLastName(payload)
  },
})

const userName = computed({
  get() {
    return authUserStore.profileUserName;
  },
  set(payload) {
    authUserStore.changeUserName(payload)
  }
})

const email = computed(() => {
  return authUserStore.profileEmail;
});

</script>
<style lang="scss">

.profile {

  &__container {
    display: flex;
    flex-direction: column;
    padding: 40px 80px 80px;
  }

  &__title {
    @include h2;
    text-align: center;
    margin-bottom: 16px;
  }

  &__initials {
    @include h2;
    position: initial;
    width: 80px;
    height: 80px;
    background-color: #303030;
    color: #fff;
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  &__info {
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(231, 249, 253, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    padding: 32px;
    background-color: #E7F9FD;
    display: flex;
    flex-direction: column;
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
  }

  &__admin-badge {
    display: flex;
    align-self: center;
    color: #fff;
    font-size: 14px;
    padding: 8px 24px;
    border-radius: 8px;
    background-color: #303030;
    margin: 16px 0;
    text-align: center;
    text-transform: capitalize;
  }

  &__icon {
    width: 14px;
    height: auto;
    margin-right: 8px;
  }

  &__input-wrapper {
    margin: 16px 0;
  }
}
</style>
