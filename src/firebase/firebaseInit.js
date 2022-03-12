// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWkNsMgq2plYDjNajBsE-6vQvI9yYTQrE",
    authDomain: "foodblog-c62fc.firebaseapp.com",
    projectId: "foodblog-c62fc",
    storageBucket: "foodblog-c62fc.appspot.com",
    messagingSenderId: "534908125520",
    appId: "1:534908125520:web:5f456de6455683d83b6c55"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp }

export default firebaseApp.firestore()