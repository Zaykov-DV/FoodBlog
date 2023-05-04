import { defineStore } from 'pinia'
import 'firebase/compat/auth'
import db from "../firebase/firebaseInit";

export const useBlogsStore = defineStore('BlogsStore', {
    state: () => {
        return {
            blogPosts: [],
            filterBlogPosts: [],
            postLoaded: false,
            blogHTML: '',
            blogTitle: '',
            blogDescr: '',
            blogPhotoName: '',
            blogPhotoFileURL: null,
            blogPhotoPreview: null,
            editPost: null,
            blogAuthor: null,
            categories: [
                { id: 0, category: 'Все категории', image: 'soybeans'},
                { id: 1, category: 'Выпечка', image: 'bread' },
                { id: 2, category: 'Завтрак', image: 'bowl' },
                { id: 3, category: 'Гарниры', image: 'rice' },
                { id: 4, category: 'Вторые блюда', image: 'chicken' },
                { id: 5, category: 'Салаты', image: 'avocado' },
                { id: 6, category: 'Десерты', image: 'cake' },
                { id: 7, category: 'Соусы и маринады', image: 'cola' },
                { id: 8, category: 'Закуски', image: 'hot-dog' },
                { id: 9, category: 'Напитки', image: 'drink' },
            ],
            selectedCategory: null,
            navigateToCategory: 0,
            blogCookingTime: 0
        }
    },
    getters: {
        getBlogPostsFeed() {
            return this.blogPosts.slice(0, 9);
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
        newBlogPost(payload) {
            this.blogHTML = payload;
        },
        updateBlogTitle(payload) {
            this.blogTitle = payload
        },
        updateBlogDescr(payload) {
            this.blogDescr = payload
        },
        updateBlogCookingTime(payload) {
            this.blogCookingTime = payload
        },
        updateBlogCategory(payload) {
            this.selectedCategory = payload
        },
        fileNameChange(payload) {
            this.blogPhotoName = payload;
        },
        createFileURL(payload) {
            this.blogPhotoFileURL = payload
        },
        openPhotoPreview() {
            this.blogPhotoPreview = !this.blogPhotoPreview;
        },
        toggleEditPost(payload) {
            this.editPost = payload
        },
        filterBlogPost(payload) {
            this.blogPosts = this.blogPosts.filter(post => post.blogID !== payload)
            this.filterBlogPosts = this.blogPosts
        },
        // фильтр по категории
        filterCategory(payload) {
            this.filterBlogPosts = this.blogPosts.filter(post => post.selectedCategory === payload)
        },
        // сбросить фильтры по категории
        showAllCategories() {
            this.filterBlogPosts = this.blogPosts
        },
        setBlogState(payload) {
            this.blogTitle = payload.blogTitle;
            this.blogDescr = payload.blogDescr;
            this.blogCookingTime = payload.blogCookingTime;
            this.selectedCategory = payload.selectedCategory;
            this.blogHTML = payload.blogHTML;
            this.blogPhotoFileURL = payload.blogCoverPhoto;
            this.blogPhotoName = payload.blogCoverPhotoName;
        },
        // очистить стейт
        clearBlogState() {
            this.blogTitle = '';
            this.blogDescr = '';
            this.blogCookingTime = 0;
            this.selectedCategory = 0;
            this.blogHTML = '';
            this.blogPhotoFileURL = null;
            this.blogPhotoName = '';
        },

        async getPost() {
            const dataBase = await db.collection("blogPosts").orderBy("date", "desc");
            const dbResults = await dataBase.get();
            dbResults.forEach((doc) => {
                if (!this.blogPosts.some((post) => post.blogID === doc.id)) {
                    const data = {
                        blogID: doc.data().blogID,
                        blogHTML: doc.data().blogHTML,
                        blogCoverPhoto: doc.data().blogCoverPhoto,
                        blogTitle: doc.data().blogTitle,
                        blogDescr: doc.data().blogDescr,
                        blogCookingTime: doc.data().blogCookingTime,
                        blogDate: doc.data().date,
                        blogCoverPhotoName: doc.data().blogCoverPhotoName,
                        selectedCategory: doc.data().categoryID,
                        blogAuthor: doc.data().blogAuthor
                    };
                    this.blogPosts.push(data);
                }
            });
            this.postLoaded = true;
            this.filterBlogPosts = this.blogPosts
        },

        async updatePost(payload) {
            this.filterBlogPost(payload)
            await this.getPost()
        },

        async deletePost(payload) {
            const getPost = await db.collection('blogPosts').doc(payload);
            await getPost.delete();
            this.filterBlogPost(payload)
        },
    }
})


