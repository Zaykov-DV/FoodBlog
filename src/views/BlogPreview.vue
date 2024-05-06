<template>
  <div class="preview-blog">
    <div class="preview-blog__container">
      <h2 class="preview-blog__title">{{ blogTitle }}</h2>
      <div class="preview-blog__info">
        <div class="preview-blog__item">
          <div class="preview-blog__author">
            <div class="preview-blog__author-avatar"></div>
            <div class="preview-blog__author-info">
              <h4 class="preview-blog__author-name">Best Home Chief</h4>
              <p class="preview-blog__date">Posted on: current date</p>
            </div>
          </div>
        </div>
        <div class="preview-blog__item">
          <SvgIcon class="preview-blog__icon" name="category"/>
          <span>{{ blogCategory() }}</span>
        </div>
        <div class="preview-blog__item" v-if="blogCookingTime">
          <SvgIcon class="preview-blog__icon" name="timer"/>
          <span>{{blogCookingTime}} минут</span>
        </div>
      </div>
      <p class="preview-blog__descr">{{blogDescr}}</p>
      <div class="preview-blog__content" v-html="blogHTML"></div>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import { useBlogsStore } from '@/stores/blogs-store'
import SvgIcon from "../components/UI/SvgIcon";
import {usePostStore} from "../stores/post-store";

const blogsStore = useBlogsStore()
const postStore = usePostStore()

const blogTitle = computed(() => {
  return postStore.blogTitle;
})

const blogDescr = computed(() => {
  return postStore.blogDescr;
})

const blogHTML= computed(() => {
  return postStore.blogHTML;
})

const blogCookingTime= computed(() => {
  return postStore.blogCookingTime;
})

const blogCategory = () => {
  for (let category of blogsStore.categories) {
    if (postStore.selectedCategory === category.id)
      return category.category
  }
}

</script>

<style lang="scss">

.preview-blog {

  &__container {
    display: flex;
    flex-direction: column;
    padding: 40px 80px 80px;
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, .1);
  }

  &__title {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 47px;
    letter-spacing: -0.04em;
    color: #000000;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 40px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
