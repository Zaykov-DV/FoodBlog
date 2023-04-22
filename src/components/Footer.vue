<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__block">
        <div>
          <router-link class="footer__title" :to="{ name: 'Home' }">FoodBlog</router-link>
          <p>Lorem ipsum dolor sit amet, consectetur.</p>
        </div>
        <ul class="footer__links">
          <router-link class="footer__link" :to="{ name: 'Home' }">Home</router-link>
          <router-link class="footer__link" :to="{ name: 'Blogs' }">Blogs</router-link>
          <router-link class="footer__link" :to="{ name: 'CreatePost' }">Create Post</router-link>
          <router-link v-if="!user" class="footer__link" :to="{ name: 'Login' }">Login/Register</router-link>
        </ul>
      </div>
      <div class="footer__copyright">
        <div class="footer__info">
          <p class="footer__info-text">© Copyright 2023 All Rights Reserved</p>
          <span class="footer__info-link">Design by <a href="https://www.flowbase.co/">Flowbase</a></span>
        </div>
        <div class="footer__social">
          <ul class="footer__links footer__links_social">
            <li>
              <a href="https://www.instagram.com/avedima/">
                <SvgIcon name="instagram" class="footer__link-icon"/>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/grunger.ekb">
                <SvgIcon name="facebook" class="footer__link-icon"/>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/grunger.ekb">
                <SvgIcon name="vk" class="footer__link-icon"/>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import {computed} from "vue";
import {useStore} from "vuex";
import SvgIcon from "./UI/SvgIcon";

const store = useStore()

const user = computed(() => {
  return store.state.user;
});

// const admin = computed(() => {
//   return store.state.profileAdmin;
// });

</script>

<style lang="scss" scoped>
.footer {

  &__container {
    padding: 0 80px 50px;
  }

  &__title {
    font-family: "Lobster Two", cursive;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 30px;
    color: #000000;
    border-bottom: none;
  }

  &__block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 50px;
  }

  &__links {
    display: flex;
    align-items: center;
    gap: 60px;

    &_social {
      justify-content: flex-end;
      gap: 40px;
    }
  }

  &__link {
    &.router-link-active {
      border-bottom: none;
    }
  }

  &__copyright {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  &__info {
    grid-column: 2/3;
    text-align: center;
  }

  &__social {
    grid-column: 3/3;
  }

  &__info-text {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    letter-spacing: -0.02em;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 5px;
  }

  &__info-link {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 23px;
    letter-spacing: -0.02em;
    color: rgba(0, 0, 0, 0.6);

    a {
      color: #FF7967;
    }
  }
}

@media (max-width: 1024px) {
  .footer {

    &__container {
      padding: 0 60px 60px;
    }

    &__block {
      align-items: flex-start;
      flex-direction: column;
    }

    &__links {
      margin-top: 20px;
    }
  }
}

@media (max-width: 768px) {
  .footer {

    &__container {
      padding: 0 40px 40px;
    }
  }
}

@media (max-width: 540px) {
  .footer {

    &__container {
      padding: 0 20px 40px;
    }

    &__block {
      padding-bottom: 30px;
      margin-bottom: 20px;
    }

    &__links {
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
    }

    &__copyright {
      display: flex;
      flex-direction: column-reverse;
    }

    &__info {
      margin-top: 20px;
    }
  }
}
</style>