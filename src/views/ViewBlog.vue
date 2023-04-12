<template>
  <div class="post-view" v-if="currentBlog">
    <div class="container quillWrapper">
      <h2>{{ currentBlog[0].blogTitle }}</h2>
      <h4>Posted on: {{ new Date(currentBlog[0].blogDate).toLocaleString("en-us", { dateStyle: "long" }) }}</h4>
      <img :src="currentBlog[0].blogCoverPhoto" :alt="currentBlog[0].blogCoverPhoto" />
      <div class="post-content ql-editor" v-html="currentBlog[0].blogHTML"></div>
    </div>
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'

const store = useStore()
const route = useRoute()

const currentBlog = ref(null);

onMounted(async () => {
  currentBlog.value = await store.state.blogPosts.filter((post) => {
    return post.blogID === route.params.blogid;
  });
})
</script>

<style lang="scss">
.post-view {
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
}
</style>
