<template>
  <div class="loading">
   <PizzaLoader />
  </div>
</template>

<style lang="scss">
.loading {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script setup>
import PizzaLoader from "./PizzaLoader.vue";
</script>
