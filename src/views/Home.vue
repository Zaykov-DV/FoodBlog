<template>
  <div class="home">
    <BlogPost v-if="!user" :post="welcomeScreen"/>
    <BlogPost :post="post" v-for="(post, index) in blogPostsFeed" :key="index"/>
    <div class="blog-card-wrap">
      <div class="container">
        <h3 class="home__subtitle">View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard :post="post" v-for="(post, index) in blogPostsCards" :key="index"/>
        </div>
      </div>
    </div>
    <div v-if="!user" class="updates">
      <div class="container">
        <h2>Never miss a post. Register your free account today</h2>
        <router-link class="router-button" to="#">
          Register for FoodBlogs
          <Arrow class="arrow"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>

import BlogPost from "../components/BlogPost";
import BlogCard from "../components/BlogCard";
import Arrow from '../assets/Icons/arrow-right-light.svg'
import {ref, computed} from 'vue'
import {useStore} from 'vuex'
const store = useStore()

const welcomeScreen = ref({
  title: "Welcome!",
  blogPost: "Weekly blog articles with recipes. Register today to never miss a post!",
  welcomeScreen: true,
  photo: "welcome",
})

const blogPostsFeed = computed(() => {
  return store.getters.blogPostsFeed;
});

const blogPostsCards = computed(() => {
  return store.getters.blogPostsCards;
});

const user = computed(() => {
  return store.state.user
});

</script>

<style lang="scss" scoped>

.home {
  &__subtitle {
    margin-bottom: 20px;
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }
  }
}

</style>