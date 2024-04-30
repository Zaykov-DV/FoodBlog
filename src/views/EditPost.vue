<template>
  <div class="create-post">
    <div class="create-post__container">
      <Modal v-if="blogsStore.blogPhotoPreview" modalSize="l'" @close-modal="handlePreviewModal">
        <img :src="blogsStore.blogPhotoFileURL" :alt="blogsStore.blogPhotoFileURL"/>
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
              <button @click="handlePreviewModal" class="create-post__btn-preview"
                      :disabled="!blogsStore.blogPhotoFileURL"
                      :class="{ 'button-inactive': !blogsStore.blogPhotoFileURL }">
                Посмотреть обложку
              </button>
              <span>Выбранный файл: {{ blogsStore.blogPhotoName }}</span>
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
                <option v-for="category in blogsStore.categories"
                        :key="category.id"
                        :value="category.id"
                        :selected="selectedCategory">
                  {{ category.category }}
                </option>
              </select>
            </div>

            <div>
              <input class="create-post__input" type="number" placeholder="Введите время готовки"
                     v-model="blogsStore.blogCookingTime"/>
            </div>
          </div>
        </div>
        <div class="create-post__actions">
          <button @click="updateBlog" :class="{ 'button-inactive': !checkTerms }" :disabled="!checkTerms">Сохранить изменения</button>
          <Modal v-if="modalActive" @close-modal="handlePreview" :modal-title="'Превью поста'" :modal-size="'xl'" :class="{ 'button-inactive': !checkTerms }" :disabled="!checkTerms">
            <BlogPreview/>
          </Modal>
          <button @click="handlePreview">Посмотреть изменения</button>
        </div>
      </div>
    </div>
    <Modal v-if="modalActive" @close-modal="handlePreview" :modal-title="'Превью поста'" :modal-size="'xl'">
      <BlogPreview/>
    </Modal>
  </div>
</template>


<script setup>
import BlogPreview from "./BlogPreview";
import Modal from "../components/UI/Modal";
import Loading from "../components/UI/Loading";
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
import firebase from "firebase/compat/app";
import "firebase/storage";
import db from "../firebase/firebaseInit";
import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import {ref, computed, onMounted} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import { useBlogsStore } from '@/stores/blogs-store'

const blogsStore = useBlogsStore()

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


onMounted(async () => {
  routeID.value = route.params.blogid;
  currentBlog.value = blogsStore.blogPosts.filter((post) => {
    return post.blogID === routeID.value;
  });
  blogsStore.setBlogState(currentBlog.value[0])
})

const updateBlog = async () => {
  const dataBase = db.collection("blogPosts").doc(routeID.value);
  if (checkTerms.value) {
    if (file.value) {
      loading.value = true;
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(`documents/BlogCoverPhotos/${blogsStore.blogPhotoName}`);
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
            await updateDataBase(dataBase, downloadURL)
            await blogsStore.getPost()

            loading.value = false;
            await router.push({name: "ViewBlog", params: {blogid: dataBase.id}});
          }
      );
      return;
    }
    loading.value = true;
    await updateDataBase(dataBase)

    await blogsStore.getPost()
    loading.value = false;
    await router.push({name: "ViewBlog", params: {blogid: dataBase.id}});

    return;
  }
  error.value = true;
  setTimeout(() => {
    error.value = false;
  }, 5000);
}

const updateDataBase = async (db, url) => {
  console.log(url)
  console.log(blogCoverPhotoUrl.value)
  await db.update({
    blogHTML: blogHTML.value,
    blogCoverPhotoName: blogCoverPhotoName.value,
    blogTitle: blogTitle.value,
    blogDescr: blogDescr.value,
    blogCookingTime: blogCookingTime.value,
    categoryID: selectedCategory.value,
    blogCoverPhoto: url ?? blogCoverPhotoUrl.value,
  })
}

// computed
const checkTerms = computed(() => {
  return blogTitle.value.length !== 0 && blogHTML.value.length !== 0 && selectedCategory.value !== 0 && blogCookingTime.value
})

const blogCoverPhotoName = computed(() => {
  return blogsStore.blogPhotoName
})

const blogCoverPhotoUrl = computed(() => {
  return blogsStore.blogPhotoFileURL
})

const blogTitle = computed({
  get() {
    return blogsStore.blogTitle;
  },
  set(payload) {
    blogsStore.updateBlogTitle(payload);
  },
})

const blogDescr = computed({
  get() {
    return blogsStore.blogDescr;
  },
  set(payload) {
    blogsStore.updateBlogDescr(payload);
  },
})

const blogHTML = computed({
  get() {
    return blogsStore.blogHTML;
  },
  set(payload) {
    blogsStore.newBlogPost(payload);
  },
})

const selectedCategory = computed({
  get() {
    return blogsStore.selectedCategory;
  },
  set(payload) {
    blogsStore.updateBlogCategory(payload);
  }
})

const blogCookingTime = computed({
  get() {
    return blogsStore.blogCookingTime;
  },
  set(payload) {
    blogsStore.updateBlogCookingTime(payload);
  },
})

// methods
const handlePreviewModal = () => {
  blogsStore.openPhotoPreview()
}
const handlePreview = () => {
  modalActive.value = !modalActive.value
}
const fileChange = () => {
  file.value = blogPhoto.value.files[0];
  const fileName = file.value.name;
  blogsStore.fileNameChange(fileName)
  blogsStore.createFileURL(URL.createObjectURL(file.value))
}
</script>
