<template>
  <div class="view-blog" v-if="currentBlog">
    <div class="view-blog__container">
      <h2 class="view-blog__title">{{ currentBlog[0].blogTitle }}</h2>
      <div class="view-blog__info">
        <div class="view-blog__item">
          <div class="view-blog__author">
            <div class="view-blog__author-avatar"></div>
            <div class="view-blog__author-info">
              <h4 class="view-blog__author-name">Best Home Chief</h4>
              <p class="view-blog__date">Posted on:
                {{ new Date(currentBlog[0].blogDate).toLocaleString("en-us", {dateStyle: "long"}) }}</p>
            </div>
          </div>
        </div>
        <div class="view-blog__item">
          <SvgIcon class="view-blog__icon" name="category"/>
          <span>{{ postCategory }}</span>
        </div>
        <div class="view-blog__item">
          <SvgIcon class="view-blog__icon" name="timer"/>
          <!-- @TODO добавить время готовки  -->
          <span>30 minutes</span>
        </div>
      </div>
      <p class="view-blog__descr">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet animi dolor dolore dolores facere fugit harum illo incidunt libero maxime natus, nemo, nihil quis sapiente sunt temporibus ullam vel velit voluptatem? Consequuntur iure quod sequi voluptate voluptates? Ex, molestiae.</p>
      <div class="view-blog__content" v-html="currentBlog[0].blogHTML"></div>
    </div>
  </div>
</template>

<script setup>

import { onMounted, ref} from "vue";
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import SvgIcon from "../components/UI/SvgIcon";

const store = useStore()
const route = useRoute()

const currentBlog = ref(null);
const postCategory = ref('')
// const props = defineProps(['post'])

const blogCategory = () => {
  for (let category of store.state.categories) {
    if (currentBlog.value[0].categoryID === category.id)
      return postCategory.value = category.category
  }
}

onMounted(async () => {
  currentBlog.value = await store.state.blogPosts.filter((post) => {
    return post.blogID === route.params.blogid;
  });
  blogCategory()
})
</script>

<style lang="scss">
.view-blog {

  &__container {
    display: flex;
    flex-direction: column;
    padding: 40px 80px 80px;
  }

  &__title {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 47px;
    letter-spacing: -0.04em;
    color: #000000;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 40px;
  }

  &__info {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 0 30px;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    height: 50px;

    &:first-child {
      padding-left: 0;
      border-left: none;
    }
  }

  &__icon {
    margin-right: 10px;
  }

  &__author {
    display: flex;
  }

  &__author-avatar {
    min-width: 50px;
    height: 50px;
    border-radius: 50%;
    background: url("../assets/images/sticker.png") no-repeat center/cover;
    margin-right: 15px;
  }

  &__author-info {
    display: flex;
    flex-direction: column;
  }

  &__author-name {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.02em;
    color: #000000;
  }

  &__date {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.02em;
    color: rgba(0, 0, 0, 0.6);
  }

  &__descr {
    margin-bottom: 60px;
  }
}
</style>
