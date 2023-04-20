<template>
  <div class="profile">
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal"/>
    <div class="profile__container">
      <h2 class="profile__title">Настройки аккаунта</h2>
      <div class="profile__info">
        <div class="profile__initials">{{ store.state.profileInitials }}</div>
        <div class="profile__admin-badge">
          <SvgIcon name="user-crown-light"/>
          <span>админ</span>
        </div>
        <div class="profile__input-wrapper">
          <label class="profile__label" for="firstName">Фамилия:</label>
          <input class="profile__input" type="text" id="firstName" v-model="firstName"/>
        </div>
        <div class="profile__input-wrapper">
          <label class="profile__label" for="lastName">Имя:</label>
          <input class="profile__input" type="text" id="lastName" v-model="lastName"/>
        </div>
        <div class="profile__input-wrapper">
          <label class="profile__label" for="username">Псевдоним:</label>
          <input class="profile__input" type="text" id="username" v-model="userName"/>
        </div>
        <div class="profile__input-wrapper">
          <label class="profile__label" for="email">E-mail:</label>
          <input class="profile__input" disabled type="text" id="email" v-model="email"/>
        </div>
        <button @click="updateProfile">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Modal from "../components/UI/Modal";

import {ref, computed} from 'vue'
import {useStore} from 'vuex'
import SvgIcon from "../components/UI/SvgIcon";

const store = useStore()

const modalMessage = ref("Changes were saved!")
const modalActive = ref(null)

const updateProfile = () => {
  store.dispatch("updateUserSettings");
  modalActive.value = !modalActive.value
}
const closeModal = () => {
  modalActive.value = !modalActive.value
}

const firstName = computed({
  get() {
    return store.state.profileFirstName;
  },
  set(payload) {
    store.commit("changeFirstName", payload);
  }
})

const lastName = computed({
  get() {
    return store.state.profileLastName;
  },
  set(payload) {
    store.commit("changeLastName", payload);
  },
})

const userName = computed({
  get() {
    return store.state.profileUserName;
  },
  set(payload) {
    store.commit("changeUserName", payload);
  }
})

const email = computed(() => {
  return store.state.profileEmail;
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
    text-align: center;
    margin-bottom: 16px;
    font-weight: 400;
    font-size: 24px;
  }

  &__initials {
    position: initial;
    width: 80px;
    height: 80px;
    font-size: 32px;
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

  &__input {
    width: 100%;
    border: none;
    background-color: #f2f7f6;
    padding: 8px;
    height: 50px;
    @media (min-width: 900px) {
    }

    &:focus {
      outline: none;
    }
  }

  &__label {
    font-size: 14px;
    display: block;
    padding-bottom: 6px;
  }
}
</style>