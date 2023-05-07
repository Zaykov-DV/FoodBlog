<template>
  <div class="base-input">
    <label class="base-input__label" v-if="label">{{ label }}</label>
    <input class="base-input__input"
           :class="{'with-icon' : withIcon}"
           :value="modelValue"
           :disabled="disabled"
           @input="$emit('update:modelValue', $event.target.value)"
           v-bind="$attrs">
    <div class="base-input__icon" :class="{'is-disabled' : disabled}" v-if="withIcon">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  label: {
    type: [String, Boolean],
    default: false
  },
  modelValue: {
    type: String,
    default: ''
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
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);

    &.with-icon {
      padding: 5px 5px 5px 45px;
    }

    &::placeholder {
      color: rgba(0, 0, 0, 0.5);
    }

    &:hover {
      box-shadow: 0px 0px 0px 1px #00ccff;
    }

    &:focus {
      box-shadow: 0px 0px 0px 2px #00ccff;
    }

    &:disabled {
      box-shadow: 0px 0px 0px 1px #b7b7b7;
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
    display: block;
    font-size: 14px;
    margin-bottom: 6px;
  }
}

</style>