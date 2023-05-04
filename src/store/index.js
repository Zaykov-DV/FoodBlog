import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import db from '../firebase/firebaseInit'

import { createStore } from 'vuex'

const store = createStore({
    state: {
        blogPosts: [],
        filterBlogPosts: [],
        postLoaded: null,
        blogHTML: '',
        blogTitle: '',
        blogDescr: '',
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
            { id: 0, category: 'Все категории', image: 'breakfast'},
            { id: 1, category: 'Выпечка', image: 'breakfast' },
            { id: 2, category: 'Горячее', image: 'breakfast' },
            { id: 3, category: 'Тортики', image: 'breakfast' },
            { id: 4, category: 'Завтрак', image: 'breakfast' },
            { id: 5, category: 'Салаты', image: 'salad' },
            { id: 6, category: 'Десерты', image: 'tort' },
            { id: 7, category: 'Ланч', image: 'lunch' },
            { id: 8, category: 'Шоколад', image: 'chocolate' },
            { id: 9, category: 'Мясо', image: 'meat' },
        ],
        selectedCategory: null,
        author: null,
        navigateToCategory: 0
    },
    getters: {
        getBlogPostsFeed(state) {
            return state.blogPosts.slice(0, 9);
        },
        getBlogPostsCards(state) {
            if (document.documentElement.clientWidth > 1280) {
                return state.blogPosts.slice(0, 8)
            } else {
                return state.blogPosts.slice(0, 6)
            }
        },
        getBlogCategories(state) {
            if (document.documentElement.clientWidth <= 1280 && document.documentElement.clientWidth > 768) {
                return state.categories.slice(4, 8)
            } else if (document.documentElement.clientWidth > 1280 && document.documentElement.clientWidth < 1440) {
                return state.categories.slice(4, 9)
            } else if (document.documentElement.clientWidth <= 768) {
                return state.categories.slice(4, 10)
            } else {
                return state.categories.slice(4)
            }
        }
    },
    mutations: {
        newBlogPost(state, payload) {
            state.blogHTML = payload;
        },
        updateBlogTitle(state, payload) {
            state.blogTitle = payload
        },
        updateBlogDescr(state, payload) {
            state.blogDescr = payload
        },
        updateBlogCookingTime(state, payload) {
            state.blogCookingTime = payload
        },
        updateBlogCategory(state, payload) {
            state.selectedCategory = payload
        },
        fileNameChange(state, payload) {
            state.blogPhotoName = payload;
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
            state.filterBlogPosts = state.blogPosts.filter(post => post.selectedCategory === payload)
        },
        // сбросить фильтры по категории
        showAllCategories(state) {
            state.filterBlogPosts = state.blogPosts
        },
        setBlogState(state, payload) {
            state.blogTitle = payload.blogTitle;
            state.blogDescr = payload.blogDescr;
            state.blogCookingTime = payload.blogCookingTime;
            state.selectedCategory = payload.selectedCategory;
            state.blogHTML = payload.blogHTML;
            state.blogPhotoFileURL = payload.blogCoverPhoto;
            state.blogPhotoName = payload.blogCoverPhotoName;
        },
        // очистить стейт
        clearBlogState(state) {
            state.blogTitle = '';
            state.blogDescr = '';
            state.blogCookingTime = 0;
            state.selectedCategory = 0;
            state.blogHTML = '';
            state.blogPhotoFileURL = null;
            state.blogPhotoName = '';
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
                        blogDescr: doc.data().blogDescr,
                        blogCookingTime: doc.data().blogCookingTime,
                        blogDate: doc.data().date,
                        blogCoverPhotoName: doc.data().blogCoverPhotoName,
                        selectedCategory: doc.data().categoryID,
                        blogAuthor: doc.data().blogAuthor
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

export default store