<template>
  <div class="blog-card-wrap">
    <div class="blog-cards container">
      <div v-if="profileUser" class="toggle-edit">
        <div class="categories">
          <h3>Категории:</h3>
          <div class="category" @click="filterProducts(0)">
            Все категории
          </div>
          <div class="category" @click="filterProducts(1)">
            Выпечка
          </div>
          <div class="category" @click="filterProducts(2)">
            Горячее
          </div>
          <div class="category" @click="filterProducts(3)">
            Тортики
          </div>
        </div>

        <div>
          <span>Toggle Editing Post</span>
          <input type="checkbox" v-model="editPost">
        </div>

      </div>
      <BlogCard :post="post" v-for="(post, index) in filterBlogs" :key="index"/>
      <div v-show="filterBlogs.length <= 0">
        В данной категории рецептов нет
        <button @click="filterProducts(0)">Вернуться к рецептам</button>
      </div>
    </div>
  </div>
</template>

<script>

import BlogCard from "../components/BlogCard";

export default {
  name: "Blogs",
  components: {BlogCard},
  methods: {
    filterProducts(category) {
      if (category === 0 || undefined ) {
        this.$store.commit('showAllCategories')
        console.log(category)
      } else {
        this.$store.commit('filterCategory', category)
      }
    },
  },
  computed: {
    blogPosts() {
      return this.$store.state.blogPosts
    },
    filterBlogs() {
      return this.$store.state.filterBlogPosts
    },
    sampleBlogCards() {
      return this.$store.state.sampleBlogCards
    },
    editPost: {
      get() {
        return this.$store.state.editPost
      },
      set(payload) {
        this.$store.commit('toggleEditPost', payload)
      }
    },
    profileUser() {
      return this.$store.state.user;
    },
  },
  beforeDestroy() {
    this.$store.commit('toggleEditPost', false)
  }
}
</script>

<style lang="scss" scoped>

.blog-cards {
  position: relative;

  .toggle-edit {
    width: 100%;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    position: absolute;
    top: -70px;
    right: 0;

    .categories {
      display: flex;
      align-items: center;
    }

    .category {
      margin: 0 5px;
    }

    span {
      margin-right: 16px;
    }

    input[type="checkbox"] {
      position: relative;
      border: none;
      -webkit-appearance: none;
      background: #fff;
      outline: none;
      width: 80px;
      height: 30px;
      border-radius: 20px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input[type="checkbox"]:before {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 20px;
      top: 0;
      left: 0;
      background: #303030;
      transform: scale(1.1);
      transition: 750ms ease all;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input:checked[type="checkbox"]:before {
      background: #fff;
      left: 52px;
    }
  }
}
</style>