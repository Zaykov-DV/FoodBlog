<template>
  <main class="home-page">
    <div class="home-page__container">
      <section class="home-page__section">
        <BlogPost :post="lastBlogPost" />
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
import {computed} from 'vue'
import {useBlogsStore} from '@/stores/blogs-store'

const blogsStore = useBlogsStore()

const lastBlogPost = computed(() => {
  return blogsStore.getLastBlogPost;
});

const blogPostsCards = computed(() => {
  return blogsStore.getBlogPostsCards;
});
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
    @include h1;
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
      @include h2;
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
