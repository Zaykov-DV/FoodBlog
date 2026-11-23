<!-- вынес все сюда из старого дизайна, пока не юзается -->
<template>
  <div>
    <div class="container">
      <h2>Never miss a post. Register your free account today</h2>
      <NuxtLink class="router-button" to="#">
        Register for FoodBlogs
        <SvgIcon name="arrow-right-light" class="icon"/>
      </NuxtLink>
    </div>
<!--    <div v-if="post.welcomeScreen">-->
<!--      <h2>{{ post.title }}</h2>-->
<!--      <p>{{ post.blogPost }}</p>-->
<!--      <router-link class="link link-light" :to="{ name: 'Login' }">-->
<!--        Login / Register-->
<!--        <SvgIcon name="arrow-right-light" class="arrow arrow-light"/>-->
<!--      </router-link>-->
<!--      <img :src="require(`../assets/blogPhotos/${post.photo}.jpg`)" alt="welcome-img">-->
<!--    </div>-->
  </div>
</template>

<script setup>
import SvgIcon from "../components/UI/SvgIcon";
</script>