<template>
  <main class="home-page">
    <div class="home-page__container">
      <!--    пока не юзается   -->
      <!--    <div v-if="!user" class="updates">-->
      <!--      <WelcomeScreen />-->
      <!--    </div>-->
      <section class="home-page__section">
        <BlogPost :post="post" v-for="(post, index) in blogPostsFeed" :key="index"/>
      </section>
      <section class="home-page__section">
        <BlogCategories/>
      </section>
      <section class="home-page__section">
        <h2 class="home-page__recent-title">
          Попробуй приготовить по этим рецептам <br> и день станет лучше!
        </h2>
        <div class="home-page__recent-blogs blog-cards">
          <BlogRecent :post="post" v-for="(post, index) in blogPostsCards" :key="index"/>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>

import BlogPost from "../components/BlogPost";
import {computed} from 'vue'
import {useStore} from 'vuex'
import BlogCategories from "../components/BlogCategories";
import BlogRecent from "../components/BlogRecent";
// import WelcomeScreen from "../components/WelcomeScreen";

const store = useStore()

const blogPostsFeed = computed(() => {
  return store.getters.getBlogPostsFeed;
});

const blogPostsCards = computed(() => {
  return store.getters.getBlogPostsCards;
});

// определяем если пользователь залогинен
// const user = computed(() => {
//   return store.state.user
// });

</script>

<style lang="scss" scoped>

.home-page {

  &__container {
    padding: 0 80px;
  }

  &__section {
    margin-bottom: 160px;
  }

  &__recent-title {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 48px;
    line-height: 58px;
    letter-spacing: -0.04em;
    color: #000000;
    margin-bottom: 80px;
  }

  &__recent-blogs {
    display: grid;
    gap: 32px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
}

@media (max-width: 1281px) {
  .home-page__recent-blogs {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1025px) {
  .home-page {
    &__container {
      padding: 0 60px;
    }

    &__section {
      margin-bottom: 100px;
    }
  }
}

@media (max-width: 768px) {
  .home-page {
    &__container {
      padding: 0 40px;
    }

    &__section {
      margin-bottom: 50px;
    }

    &__recent-blogs {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media (max-width: 540px) {
  .home-page {
    &__container {
      padding: 0 20px;
    }

    &__recent-title {
      font-size: 32px;
      line-height: 38px;
      margin-bottom: 40px;
    }

    &__recent-blogs {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>