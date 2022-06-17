<template>
  <div class="app" v-if="this.$store.state.postLoaded">
    <Navigation v-if="!navigation"/>
    <router-view/>
    <Footer v-if="!navigation"/>
  </div>
</template>

<script>
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import firebase from "firebase";
import 'firebase/auth'

export default {
  name: "app",
  components: {
    Footer,
    Navigation
  },
  data() {
    return {
      navigation: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit('updateUser', user);
      if (user) this.$store.dispatch('getCurrentUser', user)
    })
    this.checkRoute();
    this.$store.dispatch('getPost')
  },
  mounted() {
  },
  methods: {
    checkRoute() {
      this.$route.name === 'Login' || this.$route.name === 'Register' || this.$route.name === 'ForgotPassword'
          ? this.navigation = true
          : this.navigation = false
    }
  },
  watch: {
    $route() {
      this.checkRoute()
    }
  },
};
</script>