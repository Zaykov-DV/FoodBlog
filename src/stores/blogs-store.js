import {defineStore} from 'pinia'
import 'firebase/compat/auth'
import db from "../firebase/firebaseInit";
import firebase from "firebase/compat/app";
import mapBlogPosts from "../helpers/mapBlogPosts";

export const useBlogsStore = defineStore('BlogsStore', {
    state: () => {
        return {
            blogPosts: [],
            lastDocSnapshot: null,
            dataBase: null,
            dbSnapshot: null,
            postLoaded: false,
            categories: [
                {id: 0, category: 'Все категории', image: 'soybeans'},
                {id: 1, category: 'Выпечка', image: 'bread'},
                {id: 2, category: 'Завтрак', image: 'bowl'},
                {id: 4, category: 'Вторые блюда', image: 'chicken'},
                {id: 5, category: 'Салаты', image: 'avocado'},
                {id: 6, category: 'Десерты', image: 'cake'},
                {id: 7, category: 'Соусы и маринады', image: 'cola'},
                {id: 8, category: 'Закуски', image: 'hot-dog'},
                {id: 9, category: 'Напитки', image: 'drink'},
            ],
            navigateToCategory: 0,
        }
    },
    getters: {
        getLastDocSnapshot() {
            return this.lastDocSnapshot
        },
        getLastBlogPost() {
            return this.blogPosts[0]
        },
        getBlogPostsCards() {
            if (document.documentElement.clientWidth > 1280) {
                return this.blogPosts.slice(0, 8)
            } else {
                return this.blogPosts.slice(0, 6)
            }
        },
        getBlogCategories() {
            if (document.documentElement.clientWidth <= 1280 && document.documentElement.clientWidth > 768) {
                return this.categories.slice(1, 5)
            } else if (document.documentElement.clientWidth > 1280 && document.documentElement.clientWidth < 1440) {
                return this.categories.slice(1, 6)
            } else if (document.documentElement.clientWidth <= 768) {
                return this.categories.slice(1, 7)
            } else {
                return this.categories.slice(1, 7)
            }
        }
    },
    actions: {
        clearPosts() {
            this.blogPosts = []
            this.lastDocSnapshot = null
        },

        async getPosts(categoryId) {
            console.log('getPosts')
            console.log(categoryId)
            let dataBase
            if (!categoryId) {
                console.log('if')
                dataBase = await db.collection("blogPosts")
                    .orderBy("date", "desc")
                    .limit(10)
            } else {
                console.log('else')
                dataBase = await db.collection("blogPosts")
                    .orderBy("date", "desc")
                    .where("categoryID", "==", categoryId)
                    .limit(10)
            }

            if (this.lastDocSnapshot) {
                dataBase = dataBase.startAfter(this.lastDocSnapshot)
            }

            const dbSnapshot = await dataBase.get()

            this.lastDocSnapshot = dbSnapshot.docs[dbSnapshot.docs.length - 1]

            const result = await mapBlogPosts(dbSnapshot)

            this.blogPosts.push(...result)

            if (result.length === 0) this.lastDocSnapshot = null

            this.postLoaded = true;

            return result.length
        },

        async deletePost(payload) {
            const storageRef = firebase.storage().ref();

            await db.collection('blogPosts').doc(payload.blogID)?.delete();
            await storageRef.child(`documents/BlogCoverPhotos/${payload.blogCoverPhotoName}`).delete();

            this.blogPosts = this.blogPosts.filter(blog => {
                return blog.blogID !== payload.blogID
            })
        },
    }
})
