import { defineStore } from 'pinia'
import 'firebase/compat/auth'
import db from "../firebase/firebaseInit";
import firebase from "firebase/compat/app";

export const useAuthUserStore = defineStore('AuthStore', {
    state: () => {
        return {
            user: null,
            profileFirstName: null,
            profileLastName: null,
            profileUserName: null,
            profileEmail: null,
            profileId: null,
            profileInitials: null,
        }
    },
    actions: {
        async getCurrentUser() {
            const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid)
            const dbResults = await dataBase.get();
            this.setProfileInfo(dbResults);
            this.setProfileInitials()
        },

        setProfileInfo(doc) {
            this.profileId = doc.id;
            this.profileEmail = doc.data().email;
            this.profileFirstName = doc.data().firstName;
            this.profileLastName = doc.data().lastName;
            this.profileUserName = doc.data().userName;
        },
        setProfileInitials() {
            this.profileInitials = this.profileFirstName.match(/(\b\S)?/g).join("")
                + this.profileLastName.match(/(\b\S)?/g).join("");
        },
        updateUser(payload) {
            this.user = payload
        },
        async updateUserSettings() {
            const dataBase = await db.collection('users').doc(this.profileId);
            await dataBase.update({
                firstName: this.profileFirstName,
                lastName: this.profileLastName,
                userName: this.profileUserName,
            });
            this.setProfileInitials()
        },
        changeFirstName(payload) {
            this.profileFirstName = payload
        },
        changeLastName(payload) {
            this.profileLastName = payload
        },
        changeUserName(payload) {
            this.profileUserName = payload
        }
    }
})