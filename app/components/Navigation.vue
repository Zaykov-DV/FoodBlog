<template>
  <header class="navigation">
    <nav class="navigation__container">
      <NuxtLink class="navigation__title-link" to="/">
        <h1 class="navigation__title">FoodBlog</h1>
      </NuxtLink>
      <ul class="navigation__links" v-show="!mobile">
        <NuxtLink class="navigation__link" to="/">Домашная</NuxtLink>
        <NuxtLink class="navigation__link" to="/blogs">Рецепты</NuxtLink>
        <NuxtLink class="navigation__link" to="/bloom-calc">Полезности</NuxtLink>
        <NuxtLink class="navigation__link" to="/quiz">Квиз</NuxtLink>
        <NuxtLink v-if="!user" class="navigation__link" to="/login">Логин/Регистрация</NuxtLink>
      </ul>
      <div v-if="user" class="navigation__profile-wrapper">
        <NuxtLink v-if="authUserStore.isAdmin && !mobile" class="navigation__link" to="/create-post">Добавить пост</NuxtLink>
        <div class="navigation__profile" @click="toggleProfileMenu" ref="profile">
          <span>{{authUserStore.profileInitials}}</span>
        </div>
        <div v-show="profileMenu" class="navigation__profile-menu">
          <div class="navigation__profile-info-wrapper">
            <div class="navigation__profile-initials">
              <span>{{authUserStore.profileInitials}}</span>
            </div>
            <div class="navigation__profile-info">
              <p class="navigation__text navigation__text_m">{{ authUserStore.profileFirstName }}
                {{ authUserStore.profileLastName }}</p>
              <p class="navigation__text">{{ authUserStore.profileUserName }}</p>
              <p class="navigation__text">{{ authUserStore.profileEmail }}</p>
            </div>
          </div>
          <div class="navigation__options">
            <NuxtLink class="navigation__option" to="/profile">
              <SvgIcon class="navigation__icon" name="user-alt-light"/>
              <p class="navigation__text">Профиль</p>
            </NuxtLink>
            <NuxtLink v-if="authUserStore.isAdmin" class="navigation__option" to="/admin">
              <SvgIcon class="navigation__icon" name="user-crown-light"/>
              <p class="navigation__text">Админ</p>
            </NuxtLink>
            <div @click="signOut" class="navigation__option">
              <SvgIcon class="navigation__icon" name="sign-out-alt-regular"/>
              <p class="navigation__text">Выйти</p>
            </div>
          </div>
        </div>
      </div>
      <SvgIcon @click="toggleMobileNav" name="bars-regular" class="navigation__menu-icon" v-show="mobile"/>
    </nav>

    <transition name="mobile-nav" mode="out-in">
      <ul class="navigation__mobile-nav" v-show="mobileNav">
        <li @click="toggleMobileNav" class="link">
          <NuxtLink to="/">Домашная</NuxtLink>
        </li>
        <li @click="toggleMobileNav" class="link">
          <NuxtLink class="navigation__link" to="/blogs">Рецепты</NuxtLink>
        </li>
        <li @click="toggleMobileNav" class="link">
          <NuxtLink class="navigation__link" to="/bloom-calc">Полезности</NuxtLink>
        </li>
        <li @click="toggleMobileNav" class="link">
          <NuxtLink class="navigation__link" to="/quiz">Квиз</NuxtLink>
        </li>
        <li v-if="user" @click="toggleMobileNav" class="link">
          <NuxtLink v-if="authUserStore.isAdmin" class="navigation__link" to="/create-post">Добавить пост</NuxtLink>
        </li>
        <li v-if="!user" @click="toggleMobileNav" class="link">
          <NuxtLink v-if="!user" class="navigation__link" to="/login">Логин/Регистрация</NuxtLink>
        </li>
      </ul>
    </transition>
  </header>
</template>

<script setup>
import SvgIcon from './UI/SvgIcon'
import {getAuth} from "firebase/auth";
import {onMounted, ref, computed} from "vue";
import { useAuthUserStore } from '@/stores/auth-user'

const mobile = ref(null)
const mobileNav = ref(null)
const windowWidth = ref(null)
const profileMenu = ref(null)

const profile = ref(null)
const authUserStore = useAuthUserStore()

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
  return authUserStore.user
})

onMounted(() => {
  window.addEventListener('resize', checkScreen)
  checkScreen()
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
   @include P36-Lobster;
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
    @include P14;
    color: #fff;

    &_m {
      @include P16;
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
    width: 50%;
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

@media (max-width: 540px) {
  .navigation__container {
    margin-bottom: 0;
  }
}

// animation
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
