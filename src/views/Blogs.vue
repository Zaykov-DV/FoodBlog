<template class="blogs">
  <div class="blogs__container">
    <div v-if="profileUser" class="blogs__edit">
      <span class="blogs__edit-label">редактирование постов</span>
      <input type="checkbox" v-model="editPost">
    </div>
    <div class="blogs__filter">
        <h4 class="blogs__filter-title">Фильтр рецептов</h4>
        <div v-for="category in store.state.categories" :key="category.id">
          <div class="blogs__filter-text" :class="{ 'is-active' : categoryActive === category.id}" @click="filterProducts(category.id)">{{category.category}}</div>
        </div>
    </div>
    <div class="blogs__cards">
      <BlogCard :post="post" v-for="(post, index) in filterBlogs" :key="index"/>
      <Pagination class="blogs__pagination"
                  v-if="countTotalPages > 1"
                  :total-pages="countTotalPages"
                  :total="113"
                  :per-page="itemsPerPage"
                  :current-page="currentPage"
                  @pagechanged="onPageChange">
      </Pagination>
      <div class="blogs__not-found" v-show="filterBlogs.length <= 0">
        <span>В данной категории рецептов нет</span>
        <button @click="filterProducts(0)">Вернуться к рецептам</button>
        <img src="../assets/images/recept-not-found.jpg" alt="not-found">
      </div>
    </div>
  </div>
</template>

<script setup>
import BlogCard from "../components/BlogCard";
import Pagination from "../components/UI/Pagination";
import {computed, ref, onBeforeUnmount} from 'vue'
import {useStore} from 'vuex'

const store = useStore()

const categoryActive = ref(0)


const filterProducts = (category) => {
  currentPage.value = 1;
  if (category === 0 || undefined) {
    store.commit('showAllCategories')
    categoryActive.value = 0
  } else {
    categoryActive.value = category
    store.commit('filterCategory', category)
  }
}

const currentPage = ref(1)
const itemsPerPage = ref(5)

const onPageChange = (page) => {
  currentPage.value = page;
}

// const blogPosts = computed(() => {
//   return store.state.blogPosts
// })

const filterBlogs = computed(() => {
  return store.state.filterBlogPosts.slice((currentPage.value - 1) * itemsPerPage.value, currentPage.value * itemsPerPage.value )
})

const countTotalPages = computed(() => {
  return Math.ceil(store.state.filterBlogPosts.length / itemsPerPage.value)
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

.blogs {

  &__container {
    position: relative;
    display: flex;
    padding: 80px;
  }

  &__cards {
    display: flex;
    flex-direction: column;
    gap: 35px;
  }

  &__edit {
    position: absolute;
    right: 80px;
    top: 0;
    display: flex;
    align-items: center;
  }

  &__edit-label {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #000000;
    margin-right: 15px;
  }

  &__filter {
    min-width: 300px;
    padding-right: 80px;
  }

  &__filter-title {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 44px;
    letter-spacing: -0.04em;
    color: #000000;
    margin-bottom: 40px;
  }

  &__filter-text {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color: #333333;
    margin-bottom: 10px;
    cursor: pointer;

    &.is-active {
      color: #1ad4ff;
    }

    &:hover:not(.is-active) {
      color: #000000;
    }
  }

  &__not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 80px;
  }

  &__pagination {
    display: flex;
    justify-content: center;
    margin-top: 65px;
  }
}
</style>