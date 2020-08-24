import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"

//social-app-old-firestore
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


/*
export const firebaseConfig={
    apiKey: "AIzaSyDbEbayFqHIj60dh_ZsLkUBynIIAk1BmDE",
    authDomain: "instagram-clone-8fd4a.firebaseapp.com",
    databaseURL: "https://instagram-clone-8fd4a.firebaseio.com",
    projectId: "instagram-clone-8fd4a",
    storageBucket: "instagram-clone-8fd4a.appspot.com",
    messagingSenderId: "326415590975",
    appId: "1:326415590975:web:245337fcf23504e121fa8a",
    measurementId: "G-6MLJK8XKHV"
}
*/

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage()
export { db, storage };
export default firebase;
