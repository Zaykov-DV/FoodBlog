<template class="blogs">
  <div class="blogs__container">
    <div v-if="authUserStore.isAdmin" class="blogs__edit">
      <span class="blogs__edit-label">редактирование постов</span>
      <input type="checkbox" v-model="editPost">
    </div>
    <div class="blogs__filter">
      <div v-if="!mobile">
        <h4 class="blogs__filter-title">Фильтр рецептов</h4>
        <div v-for="category in blogsStore.categories" :key="category.id">
          <p class="blogs__filter-text" :class="{ 'is-active' : categoryActive === category.id}"
             @click="filterProducts(category.id)">{{ category.category }}</p>
        </div>
      </div>
      <div class="blogs__filter-wrapper" v-if="mobile">
        <h4 class="blogs__filter-title">Фильтр рецептов</h4>
        <SvgIcon @click="toggleMobileNav" name="arrow-down-circle"/>
      </div>
      <Transition name="slide-fade" mode="out-in">
        <div v-show="mobileNav === true">
          <div v-for="category in blogsStore.categories" :key="category.id">
            <p class="blogs__filter-text" :class="{ 'is-active' : categoryActive === category.id}"
               @click="filterProducts(category.id)">{{ category.category }}</p>
          </div>
        </div>
      </Transition>
    </div>
    <div class="blogs__cards">
      <BlogCard :post="post" v-for="(post, index) in filterBlogs" :key="index"/>
      <div v-intersection-observer="[onIntersectionObserver]">
        <div class="blogs__loading" v-if="isVisible">
          <SvgIcon class="blogs__loader" name="donut"/>
        </div>
      </div>
      <div class="blogs__loading" v-if="isLoading">
        <SvgIcon class="blogs__loader" name="donut"/>
      </div>
      <div class="blogs__not-found" v-show="blogsStore.blogPosts.length <= 0 && !isLoading">
        <span>В данной категории рецептов нет</span>
        <img class="blogs__not-found-img" src="../assets/images/recept-not-found.jpg" alt="not-found">
        <button @click="filterProducts(0)">Вернуться к рецептам</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import BlogCard from "../components/BlogCard";
import {computed, ref, onBeforeUnmount, onMounted} from 'vue'
import SvgIcon from "../components/UI/SvgIcon";
import {useBlogsStore} from '@/stores/blogs-store'
import {useAuthUserStore} from '@/stores/auth-user'
import {vIntersectionObserver} from '@vueuse/components'
import {usePostStore} from "../stores/post-store";

const authUserStore = useAuthUserStore()
const blogsStore = useBlogsStore()
const postStore = usePostStore()
const categoryActive = ref(0)
const isVisible = ref(false)
const isLoading = ref(true)

const filterProducts = (category) => {
  if (category === 0 || undefined) {
    categoryActive.value = 0
  } else {
    categoryActive.value = category
  }
  isLoading.value = true
  blogsStore.clearPosts()

  blogsStore.getPosts(category)
      .then(() => {
        isLoading.value = false
      })
}

const filterBlogs = computed(() => {
  return blogsStore.blogPosts
})

const editPost = computed({
  get() {
    return postStore.editPost
  },
  set(payload) {
    postStore.toggleEditPost(payload)
  }
})

// mobile
const mobile = ref(null)
const mobileNav = ref(null)
const windowWidth = ref(null)
const checkScreen = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value < 1024) return mobile.value = true;
  mobile.value = false;
  mobileNav.value = false;
}
const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value
}

onMounted(() => {
  window.addEventListener('resize', checkScreen)
  checkScreen()
  filterProducts(blogsStore.navigateToCategory)
})

onBeforeUnmount(() => {
  postStore.toggleEditPost(false)
})

const onIntersectionObserver = ([{isIntersecting}]) => {
  isVisible.value = isIntersecting

  if (isVisible.value && blogsStore.getLastDocSnapshot) {
    blogsStore.getPosts(categoryActive.value)
  } else {
    isVisible.value = false
  }
}

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
    justify-content: center;
    gap: 35px;
    margin: 0 auto;
  }

  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }

  &__loader {
    width: 52px;
    height: 52px;
    animation: rotate 3s infinite linear;
  }

  &__edit {
    position: absolute;
    right: 80px;
    top: 0;
    display: flex;
    align-items: center;
  }

  &__edit-label {
    @include P14;
    color: #000000;
    margin-right: 15px;
  }

  &__filter {
    min-width: 300px;
    padding-right: 80px;
  }

  &__filter-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__filter-title {
    @include h2;
    letter-spacing: -0.04em;
    color: #000000;
    margin-bottom: 40px;
  }

  &__filter-text {
    @include P18;
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

  &__not-found-img {
    height: 400px;
  }

  &__pagination {
    display: flex;
    justify-content: center;
    margin-top: 65px;
  }
}

@media (max-width: 768px) {
  .blogs {
    &__container {
      padding: 20px 20px 40px;
      flex-direction: column;
    }

    &__filter {
      min-width: 100%;
      padding-right: 0;
      margin-bottom: 20px;
    }

    &__filter-wrapper {
      padding-bottom: 20px;
    }

    &__filter-title {
      @include h3;
      margin-bottom: 0;
    }
  }
}

// animation
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
