<template>
  <div class="auth">
    <div class="auth__wrapper">
      <form class="auth__form">
        <!--      <p class="login-register">-->
        <!--        Don't have an account?-->
        <!--        <router-link class="router-link" :to="{ name: 'Register' }">Register</router-link>-->
        <!--      </p>-->
        <h2 class="auth__title">Вход в FoodBlogs</h2>
        <div class="auth__inputs">
          <div class="auth__input-wrapper">
            <BaseInput class="auth__input" type="text" placeholder="Email" v-model.trim="email" withIcon>
              <SvgIcon class="auth__icon" name="envelope-regular"/>
            </BaseInput>
          </div>
          <div class="auth__input-wrapper">
            <BaseInput class="auth__input" type="password" placeholder="Password" v-model.trim="password" withIcon>
              <SvgIcon class="auth__icon" name="lock-alt-solid"/>
            </BaseInput>
          </div>
          <div class="auth__error">{{ errorMessage }}</div>
        </div>
        <router-link class="auth__forgot-password" :to="{ name: 'ForgotPassword' }">Забыли пароль?</router-link>
        <button @click.prevent="signIn">Войти</button>
      </form>
      <div class="auth__background">
        <img src="../assets/images/chief.png" alt="chief">
      </div>
    </div>
  </div>
</template>

<script setup>
import {signInWithEmailAndPassword, getAuth} from 'firebase/auth'
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import SvgIcon from "../components/UI/SvgIcon";
import BaseInput from "../components/UI/BaseInput";

const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref(null)
const errorMessage = ref('')

const signIn = () => {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        router.push({name: 'Home'});
        error.value = false;
        errorMessage.value = ''
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage.value = 'Некорректный е-мейл';
            break;
          case 'auth/user-not-found':
            errorMessage.value = 'Аккаунт с таким е-мейлом не найден';
            break;
          case 'auth/wrong-password':
            errorMessage.value = 'Неправильный пароль';
            break;
          default:
            errorMessage.value = 'Е-мейл или пароль неверный';
            break;
        }
      })
}
</script>

<style lang="scss">

.auth {
  height: 100%;
  display: flex;
  flex: 1;

  &__wrapper {
    display: flex;
    width: 100%;
    margin: 40px 80px 80px;
  }

  &__register {
    margin-bottom: 20px;
  }

  &__register-link {
    color: #00b1ff;
  }

  &__form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    @media (min-width: 900px) {
      padding: 0 50px;
    }
  }

  &__title {
    text-align: center;
    font-size: 32px;
    line-height: 40px;
    color: #303030;
    margin-bottom: 40px;
    @media (min-width: 900px) {
      font-size: 40px;
    }
  }

  &__inputs {
    width: 100%;
    max-width: 350px;
  }

  &__input-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
  }

  &__forgot-password {
    text-decoration: none;
    color: #000;
    cursor: pointer;
    font-size: 14px;
    margin: 30px 0 15px;
    border-bottom: 1px solid transparent;
    transition: 0.5s ease all;

    &:hover {
      border-color: #303030;
    }
  }

  &__icon-password {
    position: absolute;
    right: 12px;
    top: 12px;
  }

  &__text {
    margin-bottom: 10px;
  }

  &__error {
    height: 20px;
    color: #e87171;
  }
}


@media (max-width: 540px) {
  .auth {
    &__wrapper {
      padding: 20px 20px 40px;
      margin: 0;
      flex-direction: column;
    }

    &__form {
      margin-bottom: 20px;
    }
  }
}
</style>