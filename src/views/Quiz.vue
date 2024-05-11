<template>
  <section class="quiz">
    <div class="quiz__wrapper" v-if="!quizCompleted">
      <div class="quiz__info">
        <p class="quiz__question">{{ getCurrentQuestion.question }}</p>
        <p class="quiz__score">Очки: {{ score }} / {{ questions.length }}</p>
      </div>

      <div class="quiz__options">
        <label :class="`quiz__option quiz__option_${
						getCurrentQuestion.selected == index
							? index === getCurrentQuestion.answer
								? 'correct'
								: 'wrong'
							: ''
					} ${
						getCurrentQuestion.selected != null &&
						index !== getCurrentQuestion.selected
							? 'disabled'
							: ''
					}`"
               v-for="(option, index) in getCurrentQuestion.options" :key="index">
          <input class="quiz__input" @change="setAnswer"
                 type="radio" :name="getCurrentQuestion.index"
                 :value="index" v-model="getCurrentQuestion.selected" :disabled="getCurrentQuestion.selected">
          <span>{{ option }}</span>
        </label>
      </div>

      <button class="quiz__button" @click="nextQuestion" :disabled="getCurrentQuestion.selected === null">
        {{
          getCurrentQuestion.index === questions.length - 1 ? 'Закончить квиз' : getCurrentQuestion.selected === null ? 'Выбрать' : 'Следующий вопрос'
        }}
      </button>
    </div>
    <div v-else>
      <h2>Вы закончили квиз</h2>
      <p>Вас счет {{ score }} / {{ questions.length }}</p>
    </div>
  </section>
</template>

<script setup>
import {ref, computed} from 'vue'

const questions = ref([
  {
    question: 'Знаменитые американские булочки с корицей и глазурью',
    answer: 0,
    options: [
      'синнабон',
      'профитроли',
      'панеттоне',
      'тирамису'
    ],
    selected: null
  },
  {
    question: 'Как звучит слоган знаменитого печенья Орео?',
    answer: 1,
    options: [
      'Покрути, кусай, грызи',
      'Поверни, лизни, макни',
      'Не верь, не бойся, не проси',
    ],
    selected: null
  },
  {
    question: 'Вспомните любимый десерт Гарри Поттера?',
    answer: 2,
    options: [
      'Пудинг',
      'Яблочный пай',
      'Пирог с патокой'
    ],
    selected: null
  },
  {
    question: 'Какой ингредиент обязательно входит в состав марципана?',
    answer: 0,
    options: [
      'Миндаль',
      'Какао',
      'Кокосовая стружка'
    ],
    selected: null
  },
  {
    question: 'Что из этого не является видом мороженого?',
    answer: 2,
    options: [
      'Фалуде',
      'Джелато',
      'Брецель'
    ],
    selected: null
  },
  {
    question: 'В честь кого назван десерт "Павлова" - торт-безе, начиненный фруктами?',
    answer: 1,
    options: [
      'Софья Павлова, актриса театра и кино',
      'Анна Павлова, балерина',
      'Каролина Павлова, поэтесса'
    ],
    selected: null
  },
  {
    question: 'Какой сыр составляет основу десерта тирамису?',
    answer: 0,
    options: [
      'Маскарпоне',
      'Рикотта',
      'Филадельфия',
      'Пармезан',
    ],
    selected: null
  },
  {
    question: 'Почему торт «Наполеон» так называется?',
    answer: 2,
    options: [
      'В оригинальной версии этот торт готовился в форме треугольника, напоминающего головной убор Наполеона.',
      'Возможно, торт изобретён в Неаполе под названием Napolitano, а современное название — искажение.',
      'По этому поводу существует множество версий, и все они примерно одинаково достоверны.',
    ],
    selected: null
  },


])

const quizCompleted = ref(false)
const currentQuestion = ref(0)

const score = computed(() => {
  let value = 0
  questions.value.map(q => {
    if (q.selected !== null && q.answer == q.selected) {
      value++
    }
  })
  return value
})

const getCurrentQuestion = computed(() => {
  let question = questions.value[currentQuestion.value]
  question.index = currentQuestion.value
  return question
})

const setAnswer = event => {
  questions.value[currentQuestion.value].selected = event.target.value
  event.target.value = null
}

const nextQuestion = () => {
  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++
  } else {
    quizCompleted.value = true
  }
}

</script>

<style lang="scss" scoped>
.quiz {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  height: 100vh;

  &__wrapper {
    padding: 1rem;
    width: 100%;
    max-width: 640px;
    background-color: #f9f9f9;
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  &__question {
    @include P18-medium;
    color: #8F8F8F;
    max-width: 450px;
  }

  &__score {
    color: #FFF;
    @include P18-medium;
  }

  &__options {
    margin-bottom: 1rem;
  }

  &__option {
    padding: 1rem;
    display: block;
    background-color: #cbc9c9;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover {
      background-color: #ffccf0;
    }

    &_correct {
      background-color: #2cce7d;
    }

    &_wrong {
      background-color: #ff5a5f;
    }

    &:last-of-type {
      margin-bottom: 0;
    }

    &.disabled {
      opacity: 0.5;
    }
  }

  &__input {
    display: none;
  }

  &__button {
    @include P18-bold;
    appearance: none;
    outline: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem 1rem;
    background-color: #2cce7d;
    color: #2d213f;
    text-transform: uppercase;
    border-radius: 0.5rem;

    &:disabled {
      opacity: 0.5;
    }
  }
}
</style>
