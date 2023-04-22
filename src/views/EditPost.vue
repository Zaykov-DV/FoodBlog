<template>
  <div class="create-post">
    <div class="create-post__container">
      <Modal v-if="store.state.blogPhotoPreview" modalSize="l'" v-on:close-modal="closeBlogPhotoPreviewModal">
        <img :src="store.state.blogPhotoFileURL" :alt="store.state.blogPhotoFileURL"/>
      </Modal>
      <Loading v-if="loading"/>
      <div class="create-post__content">
        <div class="create-post__form">
          <div class="create-post__form-header">
            <input class="create-post__input" type="text" placeholder="Введите заголовок" v-model="blogTitle"/>
            <div class="create-post__uploader-wrapper">
              <label class="create-post__uploader-label" for="blog-photo">Загрузить обложку</label>
              <input class="create-post__uploader-input" type="file" ref="blogPhoto" id="blog-photo"
                     @change="fileChange" accept=".png, .jpg, ,jpeg"/>
              <button @click="openPreview" class="create-post__btn-preview"
                      :disabled="!store.state.blogPhotoFileURL"
                      :class="{ 'button-inactive': !store.state.blogPhotoFileURL }">
                Посмотреть обложку
              </button>
              <span>Выбранный файл: {{ store.state.blogPhotoName }}</span>
            </div>
          </div>
          <div class="create-post__description">
            <textarea class="create-post__textarea" name="descr" placeholder="Введите описание"
                      v-model="blogDescr"></textarea>
          </div>
          <div class="create-post__editor">
            <QuillEditor v-model:content="blogHTML" contentType="html" :modules="editorSettings"
                         placeholder="Напишите рецепт..." toolbar="full"
                         theme="snow"/>
          </div>
          <div>
            <div class="create-post__select-wrapper">
              <span>Выберите категорию</span>
              <select class="create-post__select" v-model="selectedCategory">
                <option disabled value="0">Все категории</option>
                <option v-for="category in store.state.categories"
                        :key="category.id"
                        :value="category.id"
                        :selected="selectedCategory">
                  {{ category.category }}
                </option>
              </select>
            </div>

            <div>
              <input class="create-post__input" type="number" placeholder="Введите время готовки"
                     v-model="blogCookingTime"/>
            </div>
          </div>
        </div>
        <div class="create-post__actions">
          <button @click="updateBlog">Сохранить изменения</button>
          <Modal v-if="modalActive" v-on:close-modal="handlePreview" :modal-title="'Превью поста'" :modal-size="'xl'">
            <BlogPreview/>
          </Modal>
          <button @click="handlePreview">Посмотреть изменения</button>
        </div>
      </div>
    </div>
    <Modal v-if="modalActive" v-on:close-modal="handlePreview" :modal-title="'Превью поста'" :modal-size="'xl'">
      <BlogPreview/>
    </Modal>
  </div>
</template>


<script setup>

import Loading from "../components/UI/Loading";
import firebase from "firebase/compat/app";
import "firebase/storage";
import db from "../firebase/firebaseInit";
import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';

import {ref, computed, onMounted} from 'vue'
import {useStore} from 'vuex'
import {useRouter, useRoute} from 'vue-router'
import Modal from "../components/UI/Modal";
import BlogPreview from "./BlogPreview";

const store = useStore()
const router = useRouter()
const route = useRoute()

const file = ref(null)
const error = ref(null)
const loading = ref(null)
const routeID = ref(null)
const currentBlog = ref(null)
const editorSettings = ref({
  name: 'blotFormatter',
  module: BlotFormatter,
  options: {/* options */}
})

const blogPhoto = ref(null)
const modalActive = ref(false)
const handlePreview = () => {
  modalActive.value = !modalActive.value
}
onMounted(async () => {
  routeID.value = route.params.blogid;
  currentBlog.value = await store.state.blogPosts.filter((post) => {
    return post.blogID === routeID.value;
  });
  store.commit("setBlogState", currentBlog.value[0]);
})

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

const closeBlogPhotoPreviewModal = () => {
  store.commit('openPhotoPreview')
}

const updateBlog = async () => {
  const dataBase = await db.collection("blogPosts").doc(routeID.value);
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

            await dataBase.update({
              blogHTML: blogHTML.value,
              blogCoverPhoto: downloadURL,
              blogCoverPhotoName: blogCoverPhotoName.value,
              blogTitle: blogTitle.value,
              blogDescr: blogDescr.value,
              blogCookingTime: blogCookingTime.value,
              categoryID: selectedCategory.value
            });
            await store.dispatch("updatePost", routeID.value);
            loading.value = false;
            await router.push({name: "ViewBlog", params: {blogid: dataBase.id}});
          }
      );
      return;
    }
    loading.value = true;
    await dataBase.update({
      blogHTML: blogHTML.value,
      blogCoverPhotoName: blogCoverPhotoName.value,
      blogTitle: blogTitle.value,
      blogDescr: blogDescr.value,
      blogCookingTime: blogCookingTime.value,
      categoryID: selectedCategory.value
    });
    await store.dispatch("updatePost", routeID.value);
    loading.value = false;
    await router.push({name: "ViewBlog", params: {blogid: dataBase.id}});
    return;
  }
  error.value = true;
  setTimeout(() => {
    error.value = false;
  }, 5000);
}


const blogCoverPhotoName = computed(() => {
  return store.state.blogPhotoName
})

const blogTitle = computed({
  get() {
    return store.state.blogTitle;
  },
  set(payload) {
    store.commit("updateBlogTitle", payload);
  },
})

const blogDescr = computed({
  get() {
    return store.state.blogDescr;
  },
  set(payload) {
    store.commit("updateBlogDescr", payload);
  },
})

const blogHTML = computed({
  get() {
    return store.state.blogHTML;
  },
  set(payload) {
    store.commit("newBlogPost", payload);
  },
})

const selectedCategory = computed({
  get() {
    return store.state.selectedCategory;
  },
  set(payload) {
    store.commit("updateBlogCategory", payload);
  }
})

const blogCookingTime = computed({
  get() {
    return store.state.blogCookingTime;
  },
  set(payload) {
    store.commit("updateBlogCookingTime", payload);
  },
})
</script>