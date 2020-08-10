import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"

export const firebaseConfig={
    apiKey: "AIzaSyBnzEgWPw6pvA6rlz-7KeXmarMH57byNQk",
    authDomain: "social-app-7ddb9.firebaseapp.com",
    databaseURL: "https://social-app-7ddb9.firebaseio.com",
    projectId: "social-app-7ddb9",
    storageBucket: "social-app-7ddb9.appspot.com",
    messagingSenderId: "186675952732",
    appId: "1:186675952732:web:3902369bc91fbc5d2dfa99",
    measurementId: "G-RD7CS9E91K"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage()
export { db, storage };
export default firebase;

