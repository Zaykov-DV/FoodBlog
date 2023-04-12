<template>
  <div class="calc">
    <div class="calc__container">
      <div class="calc__wrapper">
        <Modal v-if="modalActive" :modal-message="modalMessage" v-on:close-modal="closeModal"/>
        <form class="calc__form">
          <label for="#recipeBloom" class="calc__label">
            Сила желатина в рецепте
          </label>
          <input id="#recipeBloom" type="number" placeholder="0" v-model="recipeBloom">
          <label for="#recipeWeight" class="calc__label">
            Сколько грамм по рецепту?
          </label>
          <input id="#recipeWeight" type="number" placeholder="0" v-model="recipeWeight">
          <label for="#currentBloom" class="calc__label">
            Сила имеющегося желатина
          </label>
          <input id="#currentBloom" type="number" placeholder="0" v-model="currentBloom">
        </form>

        <p v-if="currentWeight !== 0">Нужно взять <strong>{{ currentWeight }}</strong> грамм желатина силой
          {{ currentBloom }} блум </p>

        <button @click="calcCurrentWeight()">Рассчитать</button>
      </div>

      <div class="calc__wrapper">
        <form class="calc__form">
          <label for="#recipeDiameter" class="calc__label">
            Диаметр формы в рецепте:
          </label>
          <input id="#recipeDiameter" type="number" placeholder="0" v-model="recipeDiameter">
          <label for="#recipeDiameter" class="calc__label">
            Пересчет на форму:
          </label>
          <input id="#ownDiameter" type="number" placeholder="0" v-model="ownDiameter">
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

const recipeBloom = ref(0)
const recipeWeight = ref(0)
const currentBloom = ref(0)
const currentWeight = ref(0)
const modalActive = ref(false)
const modalMessage = ref('Заполните поля')
const recipeDiameter = ref(0)
const ownDiameter = ref(0)
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
  console.log(ownDiameter.value ** 2)
  console.log(recipeDiameter.value ** 2)
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
    max-width: 1440px;
    padding: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__wrapper {
    min-width: 400px;
  }

  &__label {
    display: flex;
    margin-bottom: 2px;
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
</style>