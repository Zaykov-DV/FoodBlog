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
            <QuillEditor v-model:content="blogHTML" contentType="html" :modules="editorSettings" ref="editor"
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
                        :selected="category.category">
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
          <button @click="handlePreview" :class="{ 'button-inactive': !checkTerms }" :disabled="!checkTerms">Посмотреть
            превью
          </button>
          <button @click="uploadBlog" :class="{ 'button-inactive': !checkTerms }" :disabled="!checkTerms">Опубликовать
          </button>
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
import "firebase/compat/storage";
import db from "../firebase/firebaseInit";
import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import BlotFormatter from "quill-blot-formatter";

import {ref, computed, onMounted} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import Modal from "../components/UI/Modal";
import BlogPreview from "./BlogPreview";

const store = useStore()
const router = useRouter()

const editor = ref('')
const blogPhoto = ref(null)
const modalActive = ref(false)
const file = ref(null)
const error = ref(null)
const loading = ref(null)
const editorSettings = ref({
  name: 'blotFormatter',
  module: BlotFormatter,
  options: {/* options */}
})


const closeBlogPhotoPreviewModal = () => {
  store.commit('openPhotoPreview')
}

const handlePreview = () => {
  modalActive.value = !modalActive.value
}

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

const checkTerms = computed(() => {
  return blogTitle.value.length !== 0 && blogHTML.value.length !== 0 && selectedCategory.value !== 0 && file.value !== null && blogCookingTime.value
})

const uploadBlog = () => {
  if (checkTerms.value) {
    console.log(file.value)
    if (file.value) {
      loading.value = true;
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(`documents/BlogCoverPhotos/${store.state.blogPhotoName}`);
      docRef.put(file.value).on(
          "state_changed",
          (snapshot) => {
            console.log('snapshot ' + snapshot);
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
              blogDescr: blogDescr.value,
              blogCookingTime: blogCookingTime.value,
              profileId: profileId.value,
              date: timestamp,
              categoryID: selectedCategory.value,
              blogAuthor: authorName()
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
    setTimeout(() => {
      error.value = false;
    }, 5000);
    return;
  }
  error.value = true;
  setTimeout(() => {
    error.value = false;
  }, 5000);
}


// computed



const profileId = computed(() => {
  return store.state.profileId
})

const blogCoverPhotoName = computed(() => {
  return store.state.blogPhotoName
})

const selectedCategory = computed(
    {
      get() {
        return store.state.selectedCategory;
      },
      set(payload) {
        store.commit("updateBlogCategory", payload);
      }
    }
)

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

const blogDescr = computed(
    {
      get() {
        return store.state.blogDescr;
      },
      set(payload) {
        store.commit("updateBlogDescr", payload);
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

const blogCookingTime = computed(
    {
      get() {
        return store.state.blogCookingTime;
      },
      set(payload) {
        store.commit("updateBlogCookingTime", payload);
      },
    }
)

const authorName = () => {
  return store.state.profileFirstName + ' ' + store.state.profileLastName
}

onMounted(() => {
  clearPost()
  editor.value.setHTML('')
})
</script>

<style lang="scss">

.create-post {

  &__container {
    padding: 40px 80px 80px;
  }

  &__form {
    display: flex;
    flex-direction: column;
  }

  &__form-header {
    display: flex;
    align-items: center;
  }

  &__input {
    min-width: 300px;
    transition: all .5s ease-in-out;
    padding: 10px 4px;
    border: none;
    border-bottom: 1px solid #303030;
  }

  &__uploader-wrapper {
    margin-left: 20px;
  }

  &__uploader-label {
    transition: all .5s ease-in-out;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;
  }

  &__uploader-input {
    display: none;
  }

  &__btn-preview {
    margin: 0 20px;
  }

  &__textarea {
    width: 100%;
    height: 150px;
    line-height: 150%;
    resize: vertical;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 10px 15px;
  }

  &__description {
    margin: 20px 0;
  }

  &__editor {
    min-height: 40vh;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  &__select-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    width: 20%;
  }

  &__select {

  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 20px;

    // @TODO поправить роутер-линки
    a {
      margin: 0;
    }
  }
}

</style>