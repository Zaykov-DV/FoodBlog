<template>
  <router-link class="blog-recent" :to="{name: 'ViewBlog', params: { blogid: props.post.blogID }}">
    <div class="blog-recent__item">
      <div class="blog-recent__item-image" :style="{ backgroundImage: `url('` + post.blogCoverPhoto + `')` }"></div>
      <h4 class="blog-recent__item-title">{{ post.blogTitle }}</h4>
      <div class="blog-recent__labels">
        <div class="blog-recent__label" v-if="post.blogCookingTime">
          <SvgIcon class="blog-recent__label-icon" name="timer"/>
          <span class="blog-recent__label-text">{{ post.blogCookingTime }} минут</span>
        </div>
        <div class="blog-recent__label">
          <SvgIcon class="blog-recent__label-icon" name="category"/>
          <span class="blog-recent__label-text">{{ blogCategory() }}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import SvgIcon from "./UI/SvgIcon";
import {defineProps} from "vue";
import {useBlogsStore} from '@/stores/blogs-store'

const blogsStore = useBlogsStore()

const props = defineProps(['post'])

const blogCategory = () => {
  for (let category of blogsStore.categories) {
    if (props.post.selectedCategory === category.id)
      return category.category
  }
}
</script>

<style lang="scss" scoped>

.blog-recent {

  &__item {
    display: flex;
    flex-direction: column;
    max-width: 290px;
  }

  &__item-image {
    width: 290px;
    height: 200px;
    border-radius: 20px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin-bottom: 16px;
  }

  &__item-title {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
    letter-spacing: -0.04em;
    color: #000000;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__labels {
    display: flex;
    align-items: center;
    gap: 25px;
    margin-top: 24px;
  }

  &__label {
    display: flex;
    align-items: center;
  }

  &__label-icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }

  &__label-text {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.02em;
    color: rgba(0, 0, 0, 0.6);
  }
}

@media (max-width: 1025px) {
  .blog-recent {
    &__item-image {
      width: 275px;
    }
  }
}

@media (max-width: 540px) {
  .blog-recent {

    &__item {
      width: 100%;
      min-width: 100%;
    }

    &__item-image {
      width: 100%;
    }
  }
}
</style>
