<template>
  <transition name="modal">
    <div :class="`modal__wrapper modal__wrapper_${modalSize}`" @click="emit('close-modal')">
      <div class="modal__content" @click.stop="">
        <!-- header -->
        <div class="modal__header">
          <h4 class="modal__title"> {{ modalTitle }} </h4>
          <span class="modal__button-close" @click="emit('close-modal')">×</span>
        </div>
        <!-- body -->
        <div class="modal__body">
          <p> {{ modalMessage }} </p>
          <slot />
          <button @click="closeModal">Закрыть</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import {defineProps, defineEmits, onMounted} from "vue";

defineProps({
  modalSize: {
    type: String,
    default: 'm'
  },
  modalTitle: {
    type: String,
    default: ''
  },
  modalMessage: {
    type: String,
    default: ''
  }}
)

const emit = defineEmits(['close-modal'])

const closeModal = () => {
  emit("close-modal")
}

onMounted(() => {
  document.body.addEventListener('keyup', e => {
    if (e.keyCode === 27) emit('close-modal')
  })
})
</script>

<style lang="scss" scoped>
//animation
.modal-enter, .modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-content,
.modal-leave-active .modal-content {
  transform: scale(1.2);
}

.modal {
  &__wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    transition: opacity .2s ease;
    right: 0;
    z-index: 998;
    background-color: rgba(00,00,00,.48);
  }

  &__content {
    position: relative;
    max-width: 600px;
    padding: 20px 18px;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    transition: all .2s ease;
    border-radius: 8px;
    z-index: 999;
    overflow: hidden;
    @media screen and (min-width: 900px) {
      min-width: 500px;
    }
  }

  &__header {
    display: flex;
    align-self: center;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
  }

  &__body {
    text-align: center;
  }

  &__button-close {
    font-size: 34px;
    position: absolute;
    right: 8px;
    top: 0;
    cursor: pointer;
  }
}

</style>
