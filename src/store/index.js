import Vue from 'vue'
import Vuex from 'vuex'

import firebase from "firebase/app";
import 'firebase/auth'
import db from '../firebase/firebaseInit'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        blogPosts: [],
        filterBlogPosts: [],
        postLoaded: null,
        blogHTML: 'Write your blog title here...',
        blogTitle: '',
        blogPhotoName: '',
        blogPhotoFileURL: null,
        blogPhotoPreview: null,
        editPost: null,
        user: null,
        profileFirstName: null,
        profileLastName: null,
        profileUserName: null,
        profileEmail: null,
        profileId: null,
        profileInitials: null,
        categories: [
            { id: 1, category: 'Выпечка' },
            { id: 2, category: 'Горячее' },
            { id: 3, category: 'Тортики' }
        ],
        selectedCategory: 0,
    },
    getters: {
        blogPostsFeed(state) {
            return state.blogPosts.slice(0, 2);
        },
        blogPostsCards(state) {
            return state.blogPosts.slice(2, 6);
        },
    },
    mutations: {
        newBlogPost(state, payload) {
            state.blogHTML = payload;
        },
        updateBlogTitle(state, payload) {
            state.blogTitle = payload
        },
        fileNameChange(state, payload) {
            state.blogPhotoName = payload;
            console.log(this.blogPhotoName)
        },
        createFileURL(state, payload) {
            state.blogPhotoFileURL = payload
        },
        openPhotoPreview(state) {
            state.blogPhotoPreview = !state.blogPhotoPreview;
        },
        toggleEditPost(state, payload) {
            state.editPost = payload
        },
        filterBlogPost(state, payload) {
            state.blogPosts = state.blogPosts.filter(post => post.blogID !== payload)
            state.filterBlogPosts = state.blogPosts
        },
        // фильтр по категории
        filterCategory(state, payload) {
            state.filterBlogPosts = state.blogPosts.filter(post => post.categoryID === payload)
        },
        // сбросить фильтры по категории
        showAllCategories(state) {
            state.filterBlogPosts = state.blogPosts
        },
        setBlogState(state, payload) {
            state.blogTitle = payload.blogTitle;
            state.blogHTML = payload.blogHTML;
            state.blogPhotoFileURL = payload.blogCoverPhoto;
            state.blogPhotoName = payload.blogCoverPhotoName;
            state.selectedCategory = payload.selectedCategory
        },
        // очистить стейт
        clearBlogState(state) {
            state.blogTitle = '';
            state.blogHTML = 'Write your blog title here...';
            state.blogPhotoFileURL = null;
            state.blogPhotoName = '';
            state.selectedCategory = null
        },
        updateUser(state, payload) {
            state.user = payload
        },
        setProfileInfo(state, doc) {
            state.profileId = doc.id;
            state.profileEmail = doc.data().email;
            state.profileFirstName = doc.data().firstName;
            state.profileLastName = doc.data().lastName;
            state.profileUserName = doc.data().userName;
        },
        setProfileInitials(state) {
            state.profileInitials = state.profileFirstName.match(/(\b\S)?/g).join("")
                + state.profileLastName.match(/(\b\S)?/g).join("");
        },
        changeFirstName(state, payload) {
            state.profileFirstName = payload
        },
        changeLastName(state, payload) {
            state.profileLastName = payload
        },
        changeUserName(state, payload) {
            state.profileUserName = payload
        }
    },
    actions: {
        async getCurrentUser({commit}) {
            const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid)
            const dbResults = await dataBase.get();
            commit('setProfileInfo', dbResults);
            commit('setProfileInitials')
        },

        async getPost({state}) {
            const dataBase = await db.collection("blogPosts").orderBy("date", "desc");
            const dbResults = await dataBase.get();
            dbResults.forEach((doc) => {
                if (!state.blogPosts.some((post) => post.blogID === doc.id)) {
                    const data = {
                        blogID: doc.data().blogID,
                        blogHTML: doc.data().blogHTML,
                        blogCoverPhoto: doc.data().blogCoverPhoto,
                        blogTitle: doc.data().blogTitle,
                        blogDate: doc.data().date,
                        blogCoverPhotoName: doc.data().blogCoverPhotoName,
                        categoryID: doc.data().categoryID
                    };
                    state.blogPosts.push(data);
                }
            });
            state.postLoaded = true;
            state.filterBlogPosts = state.blogPosts
        },

        async updatePost({commit, dispatch}, payload) {
            commit('filterBlogPost', payload);
            await dispatch('getPost')
        },

        async deletePost({commit}, payload) {
            const getPost = await db.collection('blogPosts').doc(payload);
            await getPost.delete();
            commit('filterBlogPost', payload)
        },

        async updateUserSettings({commit, state}) {
            const dataBase = await db.collection('users').doc(state.profileId);
            await dataBase.update({
                firstName: state.profileFirstName,
                lastName: state.profileLastName,
                userName: state.profileUserName,
            });
            commit('setProfileInitials')
        }
    },
    modules: {}
})
