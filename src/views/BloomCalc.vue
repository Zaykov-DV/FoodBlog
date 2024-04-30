<template>
  <div class="calc">
    <div class="calc__container">
      <div class="calc__wrapper">
        <Modal v-if="modalActive" :modal-message="modalMessage" @close-modal="closeModal"/>
        <h4 class="calc__title">Калькулятор расчета желатина</h4>
        <form class="calc__form">
          <BaseInput type="number" placeholder="0" v-model="recipeBloom" label="Сила желатина в рецепте"/>
          <BaseInput type="number" placeholder="0" v-model="recipeWeight" label="Сколько грамм по рецепту?"/>
          <BaseInput type="number" placeholder="0" v-model="currentBloom" label="Сила имеющегося желатина"/>
        </form>

        <p v-if="currentWeight !== 0">Нужно взять <strong>{{ currentWeight }}</strong> грамм желатина силой
          {{ currentBloom }} блум </p>

        <button @click="calcCurrentWeight()">Рассчитать</button>
      </div>

      <div class="calc__wrapper">
        <h4 class="calc__title">Пересчет на другую форму</h4>
        <form class="calc__form">
          <BaseInput type="number" placeholder="0" v-model="recipeDiameter" label="Диаметр формы в рецепте:"/>
          <BaseInput type="number" placeholder="0" v-model="ownDiameter" label="Пересчет на форму:" />
        </form>
        <p v-if="koefIngredients !== null">Коэффициент для рассчета ингридиентов <strong>{{ koefIngredients }}</strong>
        </p>
        <button @click="calcIngredients()">Рассчитать</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Modal from "@/components/UI/Modal";

import {ref} from 'vue'
import BaseInput from "../components/UI/BaseInput";

const recipeBloom = ref(null)
const recipeWeight = ref(null)
const currentBloom = ref(null)
const currentWeight = ref(null)
const modalActive = ref(false)
const modalMessage = ref('Заполните поля')
const recipeDiameter = ref(null)
const ownDiameter = ref(null)
const koefIngredients = ref(0)


const closeModal = () => {
  modalActive.value = !modalActive.value;
}

const calcCurrentWeight = () => {
  let koef = recipeWeight.value / currentBloom.value
  if (isNaN(koef)) {
    modalActive.value = true
  } else {
    return currentWeight.value = (recipeBloom.value * koef).toFixed(1)
  }
}

const calcIngredients = () => {
  let koef = (ownDiameter.value ** 2) / (recipeDiameter.value ** 2)
  if (isNaN(koef)) {
    modalActive.value = true
  } else {
    return koefIngredients.value = koef.toFixed(2)
  }
}

</script>

<style lang="scss" scoped>

.calc {

  &__container {
    padding-bottom: 80px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  &__wrapper {
    min-width: 400px;
    background: #E7F9FD;
    border-radius: 60px;
    padding: 40px;
    box-shadow: 0 4px 6px -1px rgba(231, 249, 253, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  &__title {
    margin-bottom: 20px;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.04em;
    color: #000000;

  }
}

@media screen and (max-width: 768px) {
  .calc {
    &__form {
      width: 100%;
    }

    &__wrapper {
      min-width: 300px;
      margin-bottom: 40px;
    }

    &__container {
      flex-direction: column;
    }
  }
}

@media (max-width: 540px) {
  .calc__container {
    padding: 20px 20px 40px;
  }
}
</style>
