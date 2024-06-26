<template>
  <div class="post">
    <div class="post__container">
      <div class="post__block">
        <h2 class="post__title">{{ post.blogTitle }}</h2>
        <p class="post__descr" v-if="post.blogDescr">{{post.blogDescr}}</p>
        <div class="post__labels">
          <div class="post__label" v-if="post.blogCookingTime">
            <SvgIcon class="post__label-icon" name="timer"/>
            <span>{{post.blogCookingTime}} минут</span>
          </div>
          <div class="post__label">
            <SvgIcon class="post__label-icon" name="category"/>
            <span>{{ blogCategory() }}</span>
          </div>
        </div>
        <div class="post__footer">
          <div class="post__author">
            <div class="post__author-avatar">
              <div class="post__author-avatar-img" v-if="!post.blogAuthor"></div>
              <h5 v-else>{{ authorInitials() }}</h5>
            </div>
            <div class="post__author-info">
              <h4 class="post__author-name" v-if="!post.blogAuthor">Best Home Chief</h4>
              <h4 class="post__author-name" v-else>{{ post.blogAuthor }}</h4>
              <p class="post__date">{{ new Date(post.blogDate).toLocaleString("ru-RU", { year: 'numeric', month: 'long', day: 'numeric'}) }}</p>
            </div>
          </div>
          <router-link class="post__link" :to="{name: 'ViewBlog', params: { blogid: post.blogID }}">
            View The Post
            <SvgIcon name="arrow-right-light" class="post__link-icon"/>
          </router-link>
        </div>
      </div>
      <div class="post__block">
        <div class="post__image" :style="{ backgroundImage: `url('` + post.blogCoverPhoto + `')` }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from "./UI/SvgIcon";
import { useBlogsStore } from '@/stores/blogs-store'

const props = defineProps(['post'])

const blogsStore = useBlogsStore()

const blogCategory = () => {
  for (let category of blogsStore.categories) {
    if (props.post.selectedCategory === category.id)
      return category.category
  }
}

const authorInitials = () => {
  return props.post.blogAuthor.split(/\s+/).map((name) => name.substring(0,1).toUpperCase()).join('')
}

</script>

<style lang="scss" scoped>

.post {
  width: 100%;

  &__container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    background: #E7FAFE;
    border-radius: 30px;
    align-items: center;
  }

  &__title {
    @include h1;
    color: #000000;
    margin-bottom: 24px;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__descr {
    @include P16;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 24px;

    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__block {
    &:first-child {
      padding: 50px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }

    &:last-child {
      height: 100%;
    }
  }

  &__labels {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__label {
    @include P14-medium;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 30px;
    min-width: 140px;
    letter-spacing: -0.02em;
    color: rgba(0, 0, 0, 0.6);
    gap: 10px;

    span {
      white-space: nowrap;
    }
  }

  &__footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 100px;
  }

  &__author {
    display: flex;
  }

  &__author-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
    overflow: hidden;
    background-color: #000000;
    color: #ffffff;
  }

  &__author-avatar-img {
    width: 50px;
    height: 50px;
    background: url("../assets/images/sticker.png") no-repeat center/cover;
  }

  &__author-info {
    display: flex;
    flex-direction: column;
  }

  &__author-name {
    @include P16-bold;
    letter-spacing: -0.02em;
    color: #000000;
  }

  &__date {
    @include P14-medium;
    letter-spacing: -0.02em;
    color: rgba(0, 0, 0, 0.6);
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 35px;
    background-color: #000000;
    color: #fff;
    fill: #fff;
    border-radius: 16px;
  }

  &__link-icon {
    margin-left: 10px;
    width: 18px;
    height: 18px;
  }

  &__image {
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
  }
}

@media (max-width: 1280px) {
  .post {
    &__title {
      @include h1;
    }

    &__blog {
      padding: 40px;
      height: 100%;
      align-items: flex-start;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__footer {
      flex-direction: column;
      align-items: flex-start;
      margin-top: 40px;
    }

    &__author {
      margin-bottom: 20px;
    }
  }
}

@media (max-width: 768px) {
  .post {
    &__container {
      display: flex;
      flex-direction: column;
      max-height: 100%;
    }

    &__block:first-child {
      padding: 25px;
      width: 100%;
    }

    &__block:last-child {
      height: 280px;
      width: 100%;
    }

    &__title {
      @include h2;
      text-align: left;
    }

    &__image {
      border-top-right-radius: 0;
      border-bottom-left-radius: 30px;
      min-height: 280px;
    }
  }
}

@media (max-width: 540px) {
  .post {

    &__container {
      min-height: auto;
    }

    &__block {
      min-height: 100%;
    }

    &__label {
      @include P10;
      padding: 8px 12px;
      min-width: auto;
      gap: 5px;
    }

    &__label-icon {
      width: 18px;
      height: 18px;
    }

    &__link {
      @include P14;
      padding: 10px 16px;
      line-height: 0;
    }

    &__link-icon {
      width: 15px;
      height: 15px;
    }

    &__descr {
      line-height: 20px;
      -webkit-line-clamp: 2;
      margin-bottom: 10px;
    }

    &__block:first-child {
      padding: 20px;
      height: 282px;
    }

    &__block:last-child {
      height: 200px;
      width: 100%;
    }

    &__image {
      min-height: 200px;
    }

    &__title {
      @include h3;
      margin-bottom: 10px;
    }

    &__footer {
      margin-top: 15px;
    }

    &__author {
      margin-bottom: 15px;
    }

    &__author-avatar {
      min-width: 35px;
      width: 35px;
      height: 35px;
    }

    &__author-avatar-img {
      width: 35px;
      height: 35px;
    }

    &__author-name {
      @include P14;
    }

    &__date {
      @include P14;
    }
  }
}
</style>
