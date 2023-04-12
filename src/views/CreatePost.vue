<template>
  <div class="create-post">
    <BlogCoverPreview v-show="store.state.blogPhotoPreview"/>
    <Loading v-show="loading"/>
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span>{{ errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle"/>
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input type="file" ref="blogPhoto" id="blog-photo" @change="fileChange" accept=".png, .jpg, ,jpeg"/>
          <button @click="openPreview" class="preview"
                  :class="{ 'button-inactive': !store.state.blogPhotoFileURL }">
            Preview Photo
          </button>
          <span>File Chosen: {{ store.state.blogPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <QuillEditor v-model:content="blogHTML" contentType="html" :modules="editorSettings" toolbar="full"
                     theme="snow"/>
      </div>

      <div class="blog-actions">
        <button @click="uploadBlog">Publish Blog</button>
        <router-link class="router-button" :to="{ name: 'BlogPreview' }">Post Preview</router-link>

        <select v-model="selectedCategory">
          <option disabled value="0">Все категории</option>
          <option v-for="category in store.state.categories"
                  :key="category.id"
                  :value="category.id"
                  :selected="category.category"
          >{{ category.category }}
          </option>
        </select>

        <span>Выбрано {{ selectedCategory }} </span>

        <span class="error">выберите категорию!</span>

      </div>
    </div>
  </div>
</template>

<script setup>

import BlogCoverPreview from "../components/BlogCoverPreview";
import Loading from "../components/Loading";
import firebase from "firebase/app";
import "firebase/storage";
import db from "../firebase/firebaseInit";
import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import BlotFormatter from "quill-blot-formatter";

import {ref, computed} from 'vue'
import { useStore } from 'vuex'
import {useRouter} from 'vue-router'
const store = useStore()
const router = useRouter()

const file = ref(null)
const error = ref(null)
const errorMsg = ref(null)
const loading = ref(null)
const selectedCategory = ref(0)
const editorSettings = ref({
  name: 'blotFormatter',
  module: BlotFormatter,
  options: {/* options */}
})

const blogPhoto = ref(null)

// methods
const fileChange = () => {
  file.value = blogPhoto.value.files[0];
  const fileName = file.value.name;
  store.commit("fileNameChange", fileName);
  store.commit("createFileURL", URL.createObjectURL(file.value));
}

const openPreview = () => {
  store.commit('openPhotoPreview');
}

const clearPost = () => {
  store.commit('clearBlogState');
}

const uploadBlog = () => {
  if (blogTitle.value.length !== 0 && blogHTML.value.length !== 0 && selectedCategory.value !== 0) {
    if (file.value) {
      loading.value = true;
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(`documents/BlogCoverPhotos/${store.state.blogPhotoName}`);
      docRef.put(file.value).on(
          "state_changed",
          (snapshot) => {
            console.log(snapshot);
          },
          (err) => {
            console.log(err);
            loading.value = false;
          },
          async () => {
            const downloadURL = await docRef.getDownloadURL();
            const timestamp = await Date.now();
            const dataBase = await db.collection("blogPosts").doc();

            await dataBase.set({
              blogID: dataBase.id,
              blogHTML: blogHTML.value,
              blogCoverPhoto: downloadURL,
              blogCoverPhotoName: blogCoverPhotoName.value,
              blogTitle: blogTitle.value,
              profileId: profileId.value,
              date: timestamp,
              categoryID: selectedCategory.value
            });
            await store.dispatch("getPost");
            loading.value = false;
            await router.push({name: "ViewBlog", params: {blogid: dataBase.id}});
            clearPost()
          }
      );
      return;
    }
    error.value = true;
    errorMsg.value = "Please ensure you uploaded a cover photo!";
    setTimeout(() => {
      error.value = false;
    }, 5000);
    return;
  }
  error.value = true;
  errorMsg.value = "Please ensure fields has been filled!";
  setTimeout(() => {
    error.value = false;
  }, 5000);
}


// computed

const profileId = computed(() =>{
  return store.state.profileId
})

const blogCoverPhotoName = computed(() =>{
  return store.state.blogPhotoName
})

const blogTitle = computed(
    {
      get() {
        return store.state.blogTitle;
      },
      set(payload) {
        store.commit("updateBlogTitle", payload);
      },
    }
)

const blogHTML = computed(
    {
      get() {
        return store.state.blogHTML;
      },
      set(payload) {
        store.commit("newBlogPost", payload);
      },
    }
)
</script>

<style lang="scss">

$glass: rgba(255, 255, 255, 0.2);
$glass-icon: rgba(255, 255, 255, 0.3);
$gradient: linear-gradient(35deg, red, purple);
$option: #320a28;

/* <select> styles */
select {
  /* Reset */
  appearance: none;
  border: 0;
  outline: 0;
  font: inherit;
  /* Personalize */
  width: 20em;
  height: 3em;
  padding: 0 4em 0 1em;
  background: url('https://upload.wikimedia.org/wikipedia/commons/9/9d/Caret_down_font_awesome_whitevariation.svg') no-repeat right 0.8em center / 1.4em, linear-gradient(to left, $glass-icon 3em, $glass 3em);
  color: white;
  border-radius: 0.25em;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  /* <option> colors */
  option {
    color: inherit;
    background-color: $option;
  }

  /* Remove focus outline */
  &:focus {
    outline: none;
  }

  /* Remove IE arrow */
  &::-ms-expand {
    display: none;
  }
}

.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  // error styling
  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>