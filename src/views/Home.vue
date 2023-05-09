<template>
  <main class="home-page">
    <div class="home-page__container">
      <!--    пока не юзается   -->
      <!--    <div v-if="!user" class="updates">-->
      <!--      <WelcomeScreen />-->
      <!--    </div>-->
      <section class="home-page__section">
        <carousel :items-to-show="1" :items-to-scroll="1" :autoplay='500' :wrapAround='true' :transition="3000">
          <slide v-for="(post, index) in blogPostsFeed" :key="index">
            <BlogPost :post="post"/>
          </slide>
        </carousel>
      </section>
      <section class="home-page__section home-page__section_categories">
        <BlogCategories/>
      </section>
      <section class="home-page__section">
        <div class="home-page__recent">
          <h2 class="home-page__recent-title">
            Попробуй приготовить по этим рецептам <br> и день станет лучше!
          </h2>
          <div class="home-page__recent-blogs blog-cards">
            <BlogRecent :post="post" v-for="(post, index) in blogPostsCards" :key="index"/>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import BlogPost from "../components/BlogPost";
import BlogCategories from "../components/BlogCategories";
import BlogRecent from "../components/BlogRecent";
// import WelcomeScreen from "../components/WelcomeScreen";
import {computed} from 'vue'
import {useBlogsStore} from '@/stores/blogs-store'
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Slide} from 'vue3-carousel'

const blogsStore = useBlogsStore()

const blogPostsFeed = computed(() => {
  return blogsStore.getBlogPostsFeed;
});

const blogPostsCards = computed(() => {
  return blogsStore.getBlogPostsCards;
});

// определяем если пользователь залогинен
// const user = computed(() => {
//   return blogsStore.user
// });

</script>

<style lang="scss" scoped>

.home-page {

  &__container {
    padding: 0 80px;
  }

  &__section {
    margin-bottom: 50px;
  }

  &__recent {
    padding: 0 20px;
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

  .carousel__slide {
    padding: 0 20px;
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

    &__section {
      margin-bottom: 20px;
    }

    &__recent {
      padding: 0;
    }

    &__recent-title {
      font-size: 32px;
      line-height: 38px;
      margin-bottom: 40px;
    }

    &__recent-blogs {
      padding: 0 8px;
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .carousel__slide {
    touch-action: pan-x;
    padding: 15px 5px 0;
  }
}


</style>