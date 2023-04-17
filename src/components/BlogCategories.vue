<template>
  <div class="blog-categories">
    <div class="blog-categories__container">
      <div class="blog-categories__header">
        <h2 class="blog-categories__title">Categories</h2>
        <router-link class="blog-categories__btn" :to="{ name: 'Blogs' }">View all categories</router-link>
      </div>
      <div class="blog-categories__items">
        <div v-for="blogCategory in blogCategories" :key="blogCategory.id"
             class="blog-categories__item"
             :class="`blog-categories__item_${blogCategory.image}`">
          <img class="blog-categories__item-img"
               :src="require(`../assets/images/categories/${blogCategory.image}.png`)" :alt="blogCategory.image">
          <h4 class="blog-categories__item-title">{{ blogCategory.category }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {computed} from "vue";
import {useStore} from "vuex";

const store = useStore()

const blogCategories = computed(() => {
  return store.getters.getBlogCategories;
});

</script>

<style lang="scss" scoped>

.blog-categories {

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 130px;
  }

  &__title {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 48px;
    line-height: 58px;
    letter-spacing: -0.04em;
    color: #000000;
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 60px;
    background: #E7FAFE;
    border-radius: 16px;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.02em;
    color: #000000;
  }

  &__items {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    align-items: center;
    gap: 40px;
  }

  &__item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    max-width: 180px;
    min-width: 180px;
    height: 152px;
    border-radius: 30px;
    padding-bottom: 30px;

    &_breakfast {
      background: linear-gradient(180deg, rgba(112, 130, 70, 0) 0%, rgba(112, 130, 70, 0.1) 100%);
    }

    &_salad {
      background: linear-gradient(180deg, rgba(108, 198, 63, 0) 0%, rgba(108, 198, 63, 0.1) 100%);
    }

    &_meat {
      background: linear-gradient(180deg, rgba(204, 38, 27, 0) 0%, rgba(204, 38, 27, 0.1) 100%);
    }

    &_tort {
      background: linear-gradient(180deg, rgba(240, 158, 0, 0) 0%, rgba(240, 158, 0, 0.1) 100%);
    }

    &_lunch {
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.05) 100%);
    }

    &_chocolate {
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.05) 100%);
    }
  }

  &__item-img {
    position: relative;
    width: 100px;
    height: 100px;
    bottom: 30px;
  }

  &__item-title {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #000000;
  }
}

@media (max-width: 1280px) {
  .blog-categories__items {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(1, 1fr);
    margin: 0 auto;
  }
}

@media (min-width: 1439px) {
  .blog-categories__items {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(1, 1fr);
  }
}

</style>