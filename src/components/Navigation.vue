<template>
  <header class="navigation">
    <nav class="navigation__container">
      <router-link class="navigation__title-link" :to="{ name: 'Home' }">
        <h1 class="navigation__title">FoodBlog</h1>
      </router-link>
      <ul class="navigation__links" v-show="!mobile">
        <router-link class="navigation__link" :to="{ name: 'Home' }">Домашная</router-link>
        <router-link class="navigation__link" :to="{ name: 'Blogs' }">Рецепты</router-link>
        <router-link class="navigation__link" :to="{ name: 'BloomCalc' }">Полезности</router-link>
        <router-link class="navigation__link" :to="{ name: 'Quiz' }">Квиз</router-link>
        <router-link v-if="!user" class="navigation__link" :to="{ name: 'Login' }">Логин/Регистрация</router-link>
      </ul>
      <div v-if="user" class="navigation__profile-wrapper">
        <router-link v-if="user" class="navigation__link" :to="{ name: 'CreatePost' }">Добавить пост</router-link>
        <div class="navigation__profile" @click="toggleProfileMenu" ref="profile">
          <span>{{store.state.profileInitials}}</span>
        </div>
        <div v-show="profileMenu" class="navigation__profile-menu">
          <div class="navigation__profile-info-wrapper">
            <div class="navigation__profile-initials">
              <span>{{store.state.profileInitials}}</span>
            </div>
            <div class="navigation__profile-info">
              <p class="navigation__text navigation__text_m">{{ store.state.profileFirstName }}
                {{ store.state.profileLastName }}</p>
              <p class="navigation__text">{{ store.state.profileUserName }}</p>
              <p class="navigation__text">{{ store.state.profileEmail }}</p>
            </div>
          </div>
          <div class="navigation__options">
            <router-link class="navigation__option" :to="{name: 'Profile'}">
              <SvgIcon class="navigation__icon" name="user-alt-light"/>
              <p class="navigation__text">Профиль</p>
            </router-link>
            <router-link class="navigation__option" :to="{name: 'Admin'}">
              <SvgIcon class="navigation__icon" name="user-crown-light"/>
              <p class="navigation__text">Админ</p>
            </router-link>
            <div @click="signOut" class="navigation__option">
              <SvgIcon class="navigation__icon" name="sign-out-alt-regular"/>
              <p class="navigation__text">Выйти</p>
            </div>
          </div>
        </div>
      </div>
      <SvgIcon @click="toggleMobileNav" name="bars-regular" class="navigation__menu-icon" v-show="mobile"/>
    </nav>

    <transition name="mobile-nav">
      <ul class="navigation__mobile-nav" v-show="mobileNav">
        <li @click="toggleMobileNav" class="link">
          <router-link :to="{ name: 'Home' }">Домашная</router-link>
        </li>
        <li @click="toggleMobileNav" class="link">
          <router-link class="navigation__link" :to="{ name: 'Blogs' }">Рецепты</router-link>
        </li>
        <li @click="toggleMobileNav" class="link">
          <router-link class="navigation__link" :to="{ name: 'BloomCalc' }">Полезности</router-link>
        </li>
        <li @click="toggleMobileNav" class="link">
          <router-link class="navigation__link" :to="{ name: 'Quiz' }">Квиз</router-link>
        </li>
        <li v-if="user" @click="toggleMobileNav" class="link">
          <router-link v-if="user" class="navigation__link" :to="{ name: 'CreatePost' }">Добавить пост</router-link>
        </li>
        <li v-if="!user" @click="toggleMobileNav" class="link">
          <router-link v-if="!user" class="navigation__link" :to="{ name: 'Login' }">Логин/Регистрация</router-link>
        </li>
      </ul>
    </transition>
  </header>
</template>

<script setup>
import SvgIcon from './UI/SvgIcon'

import {getAuth} from "firebase/auth";

import {onMounted, ref, computed} from "vue";

import {useStore} from 'vuex'

const store = useStore()

const mobile = ref(null)
const mobileNav = ref(null)
const windowWidth = ref(null)
const profileMenu = ref(null)

const profile = ref(null)

const checkScreen = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value < 1024) return mobile.value = true;
  mobile.value = false;
  mobileNav.value = false;
}

const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value
}

const toggleProfileMenu = (e) => {
  if (e.target === profile.value) profileMenu.value = !profileMenu.value
}

const signOut = async () => {
  const auth = await getAuth()
  await auth.signOut();
  window.location.reload()
}

const user = computed(() => {
  return store.state.user
})

onMounted(() => {
  window.addEventListener('resize', checkScreen)
  checkScreen()
  console.log(store.state)
})

</script>

<style lang="scss" scoped>

.navigation {
  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40px 80px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 40px;
  }

  &__title-link {
    border-bottom: none;
  }

  &__title {
    font-family: 'Lobster Two', cursive;
    font-size: 36px;
    font-weight: 400;
    line-height: 30px;
  }

  &__content {
    display: flex;
  }

  &__links {
    display: flex;
    gap: 60px;
  }

  &__profile-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    z-index: 2;
  }

  &__profile {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #fff;
    background-color: #303030;
    margin-left: 20px;

    span {
      pointer-events: none;
    }

  }

  &__profile-menu {
    position: absolute;
    top: 60px;
    right: 0;
    width: 250px;
    background-color: #303030;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  &__profile-info-wrapper {
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #fff;
  }


  &__profile-initials {
    position: initial;
    width: 40px;
    height: 40px;
    background-color: #fff;
    color: #303030;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  &__profile-info {
    flex: 1;
    margin-left: 24px;
  }

  &__text {
    color: #fff;
    font-size: 14px;

    &_m {
      font-size: 16px;
    }
  }

  &__icon {
    fill: #fff;
    color: #fff;
    margin-right: 12px;
  }

  &__options {
    display: flex;
    flex-direction: column;
    padding: 15px;
    gap: 12px;
  }

  &__option {
    display: flex;
    align-items: center;
  }

  &__mobile-nav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #303030;

    .link {
      padding: 15px 0;
      color: #fff;
    }
  }
}

@media (max-width: 768px) {
  .navigation__container {
    padding: 20px;
  }
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 1s ease;
}
.mobile-nav-enter {
  transform: translateX(-250px);
}
.mobile-nav-enter-to {
  transform: translateX(0);
}
.mobile-nav-leave-to {
  transform: translateX(-250px);
}
</style>