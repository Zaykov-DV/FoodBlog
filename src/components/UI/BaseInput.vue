<template>
  <div class="base-input">
    <label class="base-input__label" v-if="label">{{ label }}</label>
    <input class="base-input__input"
           :class="{'with-icon' : withIcon}"
           :disabled="disabled"
           v-model="model"
           v-bind="$attrs">
    <div class="base-input__icon" :class="{'is-disabled' : disabled}" v-if="withIcon">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const model = defineModel()

defineProps({
  label: {
    type: [String, Boolean],
    default: false
  },
  withIcon: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

</script>

<style lang="scss" scoped>

.base-input {
  position: relative;
  width: 100%;

  &__input {
    width: 100%;
    background-color: #f2f7f6;
    padding: 5px 15px;
    height: 50px;
    border-radius: 4px;
    border: none;
    color: #000;
    outline: none;
    transition: box-shadow 0.3s ease-in-out;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);

    &.with-icon {
      padding: 5px 5px 5px 45px;
    }

    &::placeholder {
      color: rgba(0, 0, 0, 0.5);
    }

    &:hover {
      box-shadow: 0 0 0 1px #00ccff;
    }

    &:focus {
      box-shadow: 0 0 0 2px #00ccff;
    }

    &:disabled {
      box-shadow: 0 0 0 1px #b7b7b7;
    }
  }

  &__icon {
    position: absolute;
    left: 15px;
    top: 16px;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000000;

    &.is-disabled {
      color: #b7b7b7;
    }
  }

  &__label {
    @include P14;
    display: block;
    margin-bottom: 6px;
  }
}

</style>
