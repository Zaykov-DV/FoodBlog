<template>
  <div class="blog-wrapper " :class="{'no-user' : !user}" >
    <div class="blog-content">
      <div class="post">
        <h2 v-if="post.welcomeScreen">{{ post.title }}</h2>
        <h2 v-else>{{ post.blogTitle }}</h2>

        <p v-if="post.welcomeScreen">{{ post.blogPost }}</p>

        <router-link v-if="post.welcomeScreen" class="link link-light" :to="{ name: 'Login' }">
          Login / Register
          <Arrow class="arrow arrow-light" />
        </router-link>

        <router-link v-else class="link" :to="{name: 'ViewBlog', params: { blogid: this.post.blogID }}">
          View The Post
          <Arrow class="arrow" />
        </router-link>
      </div>
    </div>
    <div class="blog-photo">
      <img v-if="post.welcomeScreen" :src="require(`../assets/blogPhotos/${post.photo}.jpg`)">
      <img v-else :src="post.blogCoverPhoto" :alt="post.blogCoverPhoto">
    </div>
  </div>
</template>

<script>

import Arrow from '../assets/Icons/arrow-right-light.svg'

export default {
  name: "BlogPost",
  props: ['post'],
  components: {
    Arrow
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  }
}
</script>

<style lang="scss" scoped>

.blog-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:nth-child(even) {
    .blog-content {
      order: 2
    }
    .blog-photo {
      order: 1;
    }
  }

  @media (min-width: 700px) {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }

  .blog-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 4;
    order: 2;
    @media (min-width: 700px) {
      order: 1;
    }

    @media (min-width: 800px) {
      flex: 3;
    }

    .post {
      max-width: 375px;
      padding: 72px 24px;

      @media (min-width: 700px) {
        padding: 0 24px;
      }

      h2 {
        margin-bottom: 24px;
      }

      .content-preview {
        font-size: 14px;
        max-height: 24px;
        max-width: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .link {
        display: inline-flex;
        align-items: center;
        margin-top: 32px;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;
        transition: .5s ease all;

        &:hover {
          border-bottom-color: #303030;
        }
      }

      .link-light {
        &:hover {
          border-bottom-color: #fff;
        }
      }
    }
  }

  .blog-photo {
    order: 1;
    flex: 3;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    @media (min-width: 700px) {
      order: 2;
    }

    @media (min-width: 800px) {
      flex: 4;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

}

.no-user {
  &:first-child {
    .blog-content {
      background: #000;
      color: #fff;
    }
  }
}
</style>