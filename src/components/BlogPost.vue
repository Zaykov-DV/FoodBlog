<template>
  <!-- @TODO слайдер -->
  <div class="post">
    <div class="post__container">
      <div class="post__block">
        <h2 class="post__title">{{ post.blogTitle }}</h2>
        <p class="post__descr">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, adipisci
          alias autem distinctio nesciunt non perferendis quis quisquam velit voluptates!</p>
        <div class="post__labels">
          <div class="post__label">
            <SvgIcon name="timer"/>
            <!-- @TODO добавить время готовки  -->
            <span>30 minutes</span>
          </div>
          <div class="post__label">
            <SvgIcon name="category"/>
            <span>{{ postCategory }}</span>
          </div>
        </div>
        <div class="post__footer">
          <div class="post__author">
            <div class="post__author-avatar"></div>
            <div class="post__author-info">
              <h4 class="post__author-name">Best Home Chief</h4>
              <p>{{ new Date(post.blogDate).toLocaleString("en-us", {dateStyle: "long"}) }}</p>
            </div>
          </div>
          <router-link class="post__link" :to="{name: 'ViewBlog', params: { blogid: post.blogID }}">
            View The Post
            <SvgIcon name="arrow-right-light" class="arrow"/>
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
import {ref, defineProps, onMounted} from "vue";
import {useStore} from "vuex";
import SvgIcon from "./UI/SvgIcon";

const store = useStore()
const props = defineProps(['post'])

const postCategory = ref('')

const blogCategory = () => {
  for (let category of store.state.categories) {
    if (props.post.categoryID === category.id)
      return postCategory.value = category.category
  }
}

onMounted(() => {
  blogCategory()
})

</script>

<style lang="scss" scoped>

.post {

  &__container {
    display: grid;
    grid-template-columns: repeat(1, 50%);
    background: #E7FAFE;
    border-radius: 30px;
    align-items: center;
    min-height: 640px;
  }

  &__title {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 64px;
    line-height: 77px;
    letter-spacing: -0.04em;
    color: #000000;
    margin-bottom: 24px;
  }

  &__descr {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 24px;
  }

  &__block {

    &:first-child {
      grid-column: 1/2;
      padding: 50px;
    }

    &:last-child {
      grid-column: 2/2;
      height: 100%;
    }
  }

  &__labels {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__label {
    padding: 12px 20px;
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 30px;
    min-width: 140px;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.02em;
    color: rgba(0, 0, 0, 0.6);
    gap: 10px;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 100px;
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

  &__link {
    padding: 20px 35px;
    background-color: #000000;
    color: #fff;
    fill: #fff;
    border-radius: 16px;
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
      font-size: 40px;
      line-height: 42px;
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
</style>