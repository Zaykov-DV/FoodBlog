import {defineStore} from 'pinia'
import 'firebase/compat/auth'
import db from "../firebase/firebaseInit";
import mapBlogPosts from "../helpers/mapBlogPosts";

export const usePostStore = defineStore('PostStore', {
    state: () => {
        return {
            currentPost: null,
            blogHTML: '',
            blogTitle: '',
            blogDescr: '',
            blogPhotoName: '',
            blogPhotoFileURL: null,
            blogPhotoPreview: null,
            editPost: null,
            blogAuthor: null,
            selectedCategory: null,
            blogCookingTime: 0
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

        async getPost(id) {
            let dataBase = await db.collection("blogPosts")
                .where("blogID", "==", id)
            const dbSnapshot = await dataBase.get()
            return this.currentPost = await mapBlogPosts(dbSnapshot)
        },
    }
})


