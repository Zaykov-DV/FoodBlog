<template>
  <div class="blog-card">
    <router-link class="blog-card__container" :to="{name: 'ViewBlog', params: { blogid: props.post.blogID }}">
      <div class="blog-card__image" :style="{ backgroundImage: `url('` + post.blogCoverPhoto + `')` }"></div>
      <div class="blog-card__content">
        <div class="blog-card__info">
          <h4 class="blog-card__title">{{post.blogTitle}}</h4>
          <p class="blog-card__descr">{{post.blogDescr}}</p>
        </div>
        <div class="blog-card__footer">
            <div class="blog-card__author">
              <div class="blog-card__author-avatar"></div>
              <h4 class="blog-card__author-name">Best Home Chief</h4>
            </div>
            <h6 class="blog-card__date">{{ new Date(post.blogDate).toLocaleString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric'}) }}</h6>
          <div class="blog-card__edit-post" v-if="editPost">
            <div @click.prevent="editBlog" class="blog-card__icon">
              <SvgIcon name="edit-regular"/>
            </div>
            <div @click.prevent="deletePost" class="blog-card__icon blog-card__icon_delete">
              <SvgIcon name="trash-regular"/>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import SvgIcon from "./UI/SvgIcon";
import { useBlogsStore } from '@/stores/blogs-store'
import {defineProps, computed} from "vue";
import { useRouter } from 'vue-router'

const router = useRouter()

const blogsStore = useBlogsStore()

const props = defineProps(['post'])

const deletePost = () => {
  blogsStore.deletePost(props.post)
}
const editBlog = () => {
  router.push({name: 'EditPost', params: { blogid: props.post.blogID }})
}

const editPost = computed(() => {
  return blogsStore.editPost
});

</script>

<style lang="scss" scoped>

.blog-card {

  &__container {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  &__image {
    min-width: 290px;
    height: 200px;
    border-radius: 20px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin-right: 40px;
  }

  &__info {
    max-width: 500px;
  }

  &__title {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: -0.04em;
    color: #000000;
    margin-bottom: 16px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__descr {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 32px;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__author {
    display: flex;
    align-items: center;
  }

  &__author-avatar {
    min-width: 50px;
    height: 50px;
    border-radius: 50%;
    background: url("../assets/images/sticker.png") no-repeat center/cover;
    margin-right: 15px;
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
    display: flex;
    align-items: center;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.02em;
    color: rgba(0, 0, 0, 0.6);
    padding-left: 25px;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    min-height: 50px;
  }

  &__footer {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
  }

  &__edit-post {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-left: 25px;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    gap: 15px;
  }

  &__icon {
    height: 24px;
    width: 24px;
    color: rgba(48, 48, 48, 0.5);
    transition: 0.5s ease all;

    &:hover {
      color: #000;
    }

    &_delete:hover {
      color: #FF7967;
    }
  }
}


@media (max-width: 767px) {

  .blog-card {
    &__container {
      flex-direction: column;
      align-items: flex-start;
      max-width: calc(100vw - 40px);
    }
    &__image {
      min-width: 100%;
      margin-right: 0;
    }
    &__title {
      white-space: normal;
    }
  }
}

</style>
