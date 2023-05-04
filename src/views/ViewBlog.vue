<template>
  <div class="view-blog">
    <div class="view-blog__container" v-if="currentBlog">
      <h2 class="view-blog__title">{{ currentBlog[0].blogTitle }}</h2>
      <div class="view-blog__info">
        <div class="view-blog__item">
          <div class="view-blog__author">
            <div class="view-blog__author-avatar"></div>
            <div class="view-blog__author-info">
              <h4 class="view-blog__author-name">Лучший шеф-повар</h4>
              <p class="view-blog__date">Опубликовано:
                {{ new Date(currentBlog[0].blogDate).toLocaleString("ru-RU", { year: 'numeric', month: 'long', day: 'numeric'}) }}</p>
            </div>
          </div>
        </div>
        <div class="view-blog__item">
          <SvgIcon class="view-blog__icon" name="category"/>
          <span>{{ blogCategory() }}</span>
        </div>
        <div class="view-blog__item" v-if="currentBlog[0].blogCookingTime">
          <SvgIcon class="view-blog__icon" name="timer"/>
          <span>{{currentBlog[0].blogCookingTime}} минут</span>
        </div>
      </div>
      <p class="view-blog__descr">{{currentBlog[0].blogDescr}}</p>
      <div class="view-blog__content" v-html="currentBlog[0].blogHTML"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref} from "vue";
import {useRoute} from 'vue-router'
import SvgIcon from "../components/UI/SvgIcon";
import { useBlogsStore } from '@/stores/blogs-store'

const blogsStore = useBlogsStore()
const route = useRoute()

const currentBlog = ref(null);

const blogCategory = () => {
  for (let category of blogsStore.categories) {
    if (currentBlog.value[0].selectedCategory === category.id)
      return category.category
  }
}

onMounted(async () => {
  currentBlog.value = await blogsStore.filterBlogPosts.filter((post) => {
    return post.blogID === route.params.blogid;
  })
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



@media (max-width: 767px) {
  .view-blog {
    &__container {
      padding: 40px;
    }
  }
}

@media (max-width: 540px) {
  .view-blog {
    &__container {
      padding: 20px 20px 40px;
    }

    &__title {
      white-space: normal;
      text-align: left;
      font-size: 28px;
      line-height: 32px;
    }

    &__info {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
      margin-bottom: 0;
    }

    &__item {
      padding: 0;
      border: none;
    }
  }
}
</style>
