<template>
  <div class="bloom-calc">
    <div class="bloom-calc__container">
      <form class="bloom-calc__form">
      <label for="#recipeBloom" class="bloom-calc__label">
        Сила желатина в рецепте
      </label>
      <input id="#recipeBloom" type="number" placeholder="0" v-model="recipeBloom">
      <br>
      <label for="#recipeWeight" class="bloom-calc__label">
        Сколько грамм по рецепту?
      </label>
      <input id="#recipeWeight" type="number" placeholder="0" v-model="recipeWeight">

      <br>
      <label for="#currentBloom" class="bloom-calc__label">
        Сила имеющегося желатина
      </label>
      <input id="#currentBloom" type="number" placeholder="0" v-model="currentBloom">
      </form>

      <p v-if="currentWeight !== null">Нужно взять <strong>{{currentWeight}}</strong> грамм желатина силой {{currentBloom}} блум </p>

      <button @click="calcCurrentWeight()">Рассчитать</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BloomCalc",
  data() {
    return {
      recipeBloom: null,
      recipeWeight: null,
      currentBloom: null,
      currentWeight: null
    }
  },
  methods: {
    calcCurrentWeight() {
      let koef = this.recipeWeight / this.currentBloom;
      if (isNaN(koef)) {
        alert('Заполните поля')
      } else {
        return this.currentWeight = (this.recipeBloom * koef).toFixed(1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.bloom-calc {

  &__container {
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__form {
    width: 15%;
  }

  &__label {
    display: flex;
    margin-bottom: 2px;
  }
}

@media screen and (max-width: 768px) {
  .bloom-calc__form {
    width: 100%;
  }
}
</style>