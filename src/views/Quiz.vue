<template>
  <main class="app">
    <section class="quiz" v-if="!quizCompleted">
      <div class="quiz-info">
        <p class="question">{{ getCurrentQuestion.question }}</p>
        <p class="score">Score {{score}} / {{questions.length}}</p>
      </div>

      <div class="options">
        <label :class="`option ${
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
          <input @change="setAnswer"
                 type="radio" :name="getCurrentQuestion.index"
                 :value="index" v-model="getCurrentQuestion.selected" :disabled="getCurrentQuestion.selected">
          <span>{{option}}</span>
        </label>
      </div>

      <button @click="nextQuestion" :disabled="getCurrentQuestion.selected === null">
        {{getCurrentQuestion.index === questions.length - 1 ? 'Finish' : getCurrentQuestion.selected === null ? 'Select an option' : 'Next question'}}
      </button>
    </section>
    <section v-else>
      <h2>You have finished the quiz</h2>
      <p>Your score is {{score}} / {{questions.length}}</p>
    </section>
  </main>
</template>

<script>
export default {
  name: "Quiz",
  data() {
    return {
      questions: [
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
      ],
      quizCompleted: false,
      currentQuestion: 0
    }
  },
  methods: {
    setAnswer(event){
      this.questions[this.currentQuestion].selected.value = event.target
      event.target = null
    },
    nextQuestion() {
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++
      } else {
        this.quizCompleted = true
      }
    }
  },
  computed: {
    score() {
      let value = 0
      this.questions.map(q => {
        if (q.selected !== null && q.answer == q.selected) {
          value++
        }
      })
      return value
    },

    getCurrentQuestion(){
      let question = this.questions[this.currentQuestion]
      question.index = this.currentQuestion
      return question
    }
  }
}
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  height: 100vh;
}
.quiz {
  padding: 1rem;
  width: 100%;
  max-width: 640px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ccc;
}
.quiz-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.quiz-info .question {
  color: #8F8F8F;
  font-size: 1.25rem;
  max-width: 450px;
}
.quiz-info.score {
  color: #FFF;
  font-size: 1.25rem;
}
.options {
  margin-bottom: 1rem;
}
.option {
  padding: 1rem;
  display: block;
  background-color: #cbc9c9;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}
.option:hover {
  background-color: #ffccf0;
}
.option.correct {
  background-color: #2cce7d;
}
.option.wrong {
  background-color: #ff5a5f;
}
.option:last-of-type {
  margin-bottom: 0;
}
.option.disabled {
  opacity: 0.5;
}
.option input {
  display: none;
}
button {
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: #2cce7d;
  color: #2d213f;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.2rem;
  border-radius: 0.5rem;
}
button:disabled {
  opacity: 0.5;
}
h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}
p {
  color: #8F8F8F;
  font-size: 1.5rem;
  text-align: center;
}
</style>