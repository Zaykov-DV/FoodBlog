import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue";
import Login from "../views/Login";
import Register from "../views/Register";
import ForgotPassword from "../views/ForgotPassword";
import Profile from "../views/Profile";
import Admin from "../views/Admin";
import CreatePost from "../views/CreatePost";
import BlogPreview from "../views/BlogPreview";
import ViewBlog from "../views/ViewBlog";
import EditPost from "../views/EditPost";
import BloomCalc from "../views/BloomCalc";
import Quiz from "../views/Quiz";
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthUserStore } from '@/stores/auth-user'

const router = createRouter({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    {
      path: "/blogs",
      name: "Blogs",
      component: Blogs,
      meta: {
        title: 'Blogs'
      }
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter(to, from, next) {
        getCurrentUser ? next() : next('/')
      },
      meta: {
        title: 'Login'
      }
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      beforeEnter(to, from, next) {
        getCurrentUser ? next() : next('/')
      },
      meta: {
        title: 'Register'
      }
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: ForgotPassword,
      meta: {
        title: 'Forgot Password'
      }
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      meta: {
        title: 'Profile',
        requiresAuth: true,
      }
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      beforeEnter(to, from, next) {
        checkAdmin() ? next() : next('/')
      },
      meta: {
        title: 'Admin',
        requiresAuth: true,
      }
    },
    {
      path: "/create-post",
      name: "CreatePost",
      component: CreatePost,
      meta: {
        title: 'Create Post',
        requiresAuth: true,
      }
    },
    {
      path: "/post-preview",
      name: "BlogPreview",
      component: BlogPreview,
      meta: {
        title: 'Blog Post Preview',
        requiresAuth: true,
      }
    },
    {
      path: "/view-blog/:blogid",
      name: "ViewBlog",
      component: ViewBlog,
      meta: {
        title: 'View Blog'
      }
    },
    {
      path: "/edit-blog/:blogid",
      name: "EditPost",
      component: EditPost,
      meta: {
        title: 'Edit Post',
        requiresAuth: true,
      }
    },
    {
      path: "/bloom-calc",
      name: "BloomCalc",
      component: BloomCalc,
      meta: {
        title: 'Bloom calculator',
        requiresAuth: false,
      }
    },
    {
      path: "/quiz",
      name: "Quiz",
      component: Quiz,
      meta: {
        title: 'Quiz',
        requiresAuth: false,
      }
    },
  ],
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
        getAuth(),
        (user) => {
          removeListener();
          resolve(user)
        },
        reject
    )
  })
}

const checkAdmin = () => {
  const authUserStore = useAuthUserStore()
  return authUserStore.isAdmin
}

router.beforeEach(async function (to, from, next) {
  document.title = `${to.meta.title} | FoodBlog`

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next(true);
    } else {
      // alert('you dont have access')
      next({path: '/login'})
    }
  } else {
    next()
  }
})

export default router;
