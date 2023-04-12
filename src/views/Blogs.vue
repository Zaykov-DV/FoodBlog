<template>
  <div class="blog-card-wrap">
    <div class="blog-cards container">
      <div v-if="profileUser" class="toggle-edit">
        <div class="categories">
          <h4>Категории:</h4>
          <div class="category" :class="{ 'is-active' : categoryActive === 0}" @click="filterProducts(0)" >
            Все категории
          </div>
          <div class="category" :class="{ 'is-active' : categoryActive === 1}" @click="filterProducts(1)">
            Выпечка
          </div>
          <div class="category" :class="{ 'is-active' : categoryActive === 2}" @click="filterProducts(2)">
            Горячее
          </div>
          <div class="category" :class="{ 'is-active' : categoryActive === 3}" @click="filterProducts(3)">
            Тортики
          </div>
        </div>

        <div class="toggle-edit-checkbox">
          <span>Редактировать пост</span>
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

<script setup>
import BlogCard from "../components/BlogCard";
import {computed, ref, onBeforeUnmount} from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const categoryActive = ref(0)

const filterProducts = (category) => {
  if (category === 0 || undefined ) {
    store.commit('showAllCategories')
    categoryActive.value = 0
  } else {
    store.commit('filterCategory', category)
    categoryActive.value = category
  }
}

// const blogPosts = computed(() => {
//   return store.state.blogPosts
// })

const filterBlogs = computed(() => {
  return store.state.filterBlogPosts
})


const editPost = computed({
  get() {
    return store.state.editPost
  },
  set(payload) {
    store.commit('toggleEditPost', payload)
  }
})


const profileUser = computed(() => {
  return store.state.user;
})

onBeforeUnmount(() => {
  store.commit('toggleEditPost', false)
})

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
      align-items: baseline;
    }

    .category {
      cursor: pointer;
      margin: 0 5px;

      &.is-active {
        color: #1eb8b8;
      }

      &:hover {
        color: rgba(48, 48, 48, 0.8);
      }
    }

    span {
      margin-right: 16px;
    }

    .toggle-edit-checkbox {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>