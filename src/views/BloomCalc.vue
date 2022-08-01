<template>
  <div class="calc">
    <div class="calc__container">
      <div class="calc__wrapper">
        <Modal v-if="modalActive" :modal-message="modalMessage" v-on:close-modal="closeModal" />
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

        <p v-if="currentWeight !== null">Нужно взять <strong>{{currentWeight}}</strong> грамм желатина силой {{currentBloom}} блум </p>

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
        <p v-if="koefIngredients !== null">Коэффициент для рассчета ингридиентов <strong>{{koefIngredients}}</strong></p>
        <button @click="calcIngredients()">Рассчитать</button>

      </div>

    </div>
  </div>
</template>

<script>

import Modal from "../components/UI/Modal";

export default {
  name: "BloomCalc",
  components: { Modal },
  data() {
    return {
      recipeBloom: null,
      recipeWeight: null,
      currentBloom: null,
      currentWeight: null,
      modalActive: false,
      modalMessage: 'Заполните поля',
      recipeDiameter: null,
      ownDiameter: null,
      koefIngredients: null
    }
  },
  methods: {
    closeModal() {
      this.modalActive = !this.modalActive;
    },
    calcCurrentWeight() {
      let koef = this.recipeWeight / this.currentBloom;
      if (isNaN(koef)) {
        this.modalActive = true
      } else {
        return this.currentWeight = (this.recipeBloom * koef).toFixed(1)
      }
    },
    calcIngredients() {
      let koef = (this.ownDiameter **2) / (this.recipeDiameter **2)
      console.log(this.ownDiameter **2)
      console.log(this.recipeDiameter **2)
      if (isNaN(koef)) {
        this.modalActive = true
      } else {
        return this.koefIngredients = koef.toFixed(2)
      }
    }
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
    }
  }
}
</style>