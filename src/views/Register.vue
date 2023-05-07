<template>
  <div class="auth">
    <div class="auth__wrapper">
      <form class="auth__form" @submit.prevent="submitForm">
      <p class="auth__register">
        Уже есть аккаунт?
        <router-link class="router-link" :to="{ name: 'Login' }">Зайти</router-link>
      </p>
      <h2 class="auth__title">Зарегестировать аккаунт</h2>
        <div class="auth__inputs">
          <div class="auth__input-wrapper">
            <BaseInput class="auth__input" type="text" placeholder="Имя" v-model="firstName" withIcon>
              <SvgIcon class="auth__icon" name="user-alt-light"/>
            </BaseInput>
          </div>
          <div class="auth__input-wrapper">
            <BaseInput class="auth__input" type="text" placeholder="Фамилия" v-model="lastName" withIcon>
              <SvgIcon class="auth__icon" name="user-alt-light"/>
            </BaseInput>
          </div>
          <div class="auth__input-wrapper">
            <BaseInput class="auth__input" type="text" placeholder="Псевдоним" v-model="formData.userName" withIcon>
              <SvgIcon class="auth__icon" name="user-alt-light"/>
            </BaseInput>
            <span class="auth__error" v-for="error in v$.userName.$errors" :key="error.$uid">{{ error.$message }}</span>
          </div>
          <div class="auth__input-wrapper">
            <BaseInput class="auth__input" type="text" placeholder="Е-мейл" v-model="formData.email" withIcon>
              <SvgIcon class="auth__icon" name="envelope-regular"/>
            </BaseInput>
            <span class="auth__error" v-for="error in v$.email.$errors" :key="error.$uid">{{ error.$message }}</span>
          </div>
          <div class="auth__input-wrapper">
            <BaseInput v-if="showPassword" type="text" class="input" v-model="formData.password" withIcon>
              <SvgIcon class="auth__icon" name="lock-alt-solid" />
            </BaseInput>
            <BaseInput v-else type="password" placeholder="Password" v-model="formData.password" withIcon>
              <SvgIcon class="auth__icon" name="lock-alt-solid" />
            </BaseInput>
            <div class="auth__icon-password" @click="toggleShow">
              <SvgIcon v-if="showPassword" name="eye-on"></SvgIcon>
            </div>
            <div class="auth__icon-password" @click="toggleShow">
              <SvgIcon v-if="!showPassword" name="eye-off"></SvgIcon>
            </div>
            <span class="auth__error" v-for="error in v$.password.$errors" :key="error.$uid">{{ error.$message }}</span>
          </div>
          <div class="auth__input-wrapper">
            <BaseInput type="password" placeholder="Confirm password" v-model="formData.confirmPassword" withIcon>
              <SvgIcon class="auth__icon" name="lock-alt-solid" />
            </BaseInput>
            <span class="auth__error" v-for="error in v$.confirmPassword.$errors" :key="error.$uid">
              {{error.$message }}
            </span>
          </div>
          <div class="auth__error">{{ errorMessage }}</div>
        </div>
        <button @click="register">Зарегистрироваться</button>
      </form>
      <div class="auth__background">
        <img src="../assets/images/chief.png" alt="chief">
      </div>
    </div>
    <Loading v-if="loading"/>
  </div>
</template>

<script setup>
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import db from '../firebase/firebaseInit'
import {useRouter} from 'vue-router'
import {reactive, ref, computed} from 'vue'
import Loading from "../components/UI/Loading";
import SvgIcon from "../components/UI/SvgIcon";
import BaseInput from "../components/UI/BaseInput";
import useVuelidate from '@vuelidate/core'
import {minLength, required, sameAs, email, helpers} from '@vuelidate/validators'


const router = useRouter()
const firstName = ref('')
const lastName = ref('')
const errorMessage = ref('')
const showPassword = ref(false)
const loading = ref(false)

const formData = reactive({
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const rules = computed(() => {
  return {
    userName: {required, minLength: minLength(4)},
    email: {required, email},
    password: {required, minLength: helpers.withMessage('password must contain 6 symbols', minLength(6))},
    confirmPassword: {required, sameAs: sameAs(formData.password)},
  }
})

const v$ = useVuelidate(rules, formData)

const submitForm = async () => {
  loading.value = true
  const result = await v$.value.$validate()
  if (result) {
    await register()
        .then(() => {
          loading.value = false
        })
  } else {
    loading.value = false
    // errorMessage.value = 'error, form not submitted'
  }
}

const toggleShow = () => {
  showPassword.value = !showPassword.value;
}

const register = async () => {
  const auth = await getAuth()
  const createUser = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
  const result = await createUser;
  const dataBase = db.collection('users').doc(result.user.uid)
  await dataBase.set({
    firstName: firstName.value,
    lastName: lastName.value,
    userName: formData.userName,
    email: formData.email,
    isAdmin: false
  })
      .then(() => {
        console.log('Successfully registered')
        router.push({name: 'Home'})
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage.value = 'Invalid email';
            break;
          case 'auth/user-not-found':
            errorMessage.value = 'No account with that email was found';
            break;
          case 'auth/wrong-password':
            errorMessage.value = 'Incorrect password';
            break;
          case 'auth/email-already-in-use)':
            errorMessage.value = 'email-already-in-use';
            break;
          default:
            errorMessage.value = 'Email or password was incorrect';
            break;
        }
      })
}
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>