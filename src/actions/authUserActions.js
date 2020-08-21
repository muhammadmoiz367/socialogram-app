import firebase, { db, firebaseConfig } from '../firebase/firebase';
import {signUpValidate, loginValidate} from '../utils/validators';

import {
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_USER,
    SET_UNAUTHENTICATED,
    SET_AUTHENTICATED,
    SIGNOUT_ERROR,
    GET_SPECIFIC_USER
} from '../actionConstants';
import 'firebase/auth';
import 'firebase/firestore';

function loadingUi(){
    return{
        type: LOADING_UI
    }
}
function clearErrors(){
    return{
        type: CLEAR_ERRORS
    }
}
function setUser(data){
    return{
        type: SET_USER,
        data
    }
}
function setErrors(errors){
    return{
        type: SET_ERRORS,
        errors
    }
}
function setUnauthenticated(){
    return{
        type: SET_UNAUTHENTICATED
    }
}
function setAuthenticated(){
    return{
        type: SET_AUTHENTICATED
    }
}
function signoutError(err){
    return{
        type: SIGNOUT_ERROR,
        err
    }
}
function getSpecificUserData(data){
    return{
        type: GET_SPECIFIC_USER,
        data
    }
}

export const signIn=(credentials,history)=>{
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        const firebase=getFirebase();
        const firestore=getFirebase().firestore()
        dispatch(loadingUi())
        const {isValid, errors} = loginValidate(credentials)
        if(!isValid){
            dispatch(setErrors(errors))
        }
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        )
        .then((res)=>{
            let token=`Bearer ${res.user.refreshToken}`
            localStorage.setItem('FBIdToken',token)
            dispatch(clearErrors())
            db.collection("users").where('uid','==',res.user.uid).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) =>{
                    dispatch(setAuthenticated())
                    dispatch(setUser(doc.data()))
                });
                history.push('/')
            });
        })
        .catch((err)=>{
            console.log(err)
            if(err.code==="auth/user-not-found"){
                dispatch(setErrors({general: 'User not found'}))
            }
            if(err.code === 'auth/wrong-password'){
                dispatch(setErrors({general: 'Wrong password'}))
            }
        })
    }
}


export const signUp=(newUser,history)=>{
    return (dispatch, getState, {getFirebase, getFirestore})=>{
        const firebase=getFirebase();
        const firestore=getFirebase().firestore();
        dispatch(loadingUi())
        const {isValid, errors} = signUpValidate(newUser)
        if(!isValid){
            dispatch(setErrors(errors))
        }
        let uid;
        const noImage='no-image.png';
        db.collection("users").doc(newUser.userHandle).get()
        .then((doc)=>{
            if(doc.exists){
                console.log('this handle is already taken')
                dispatch(setErrors({general: 'This handle is already taken'}))
            }
            else{
                return firebase.auth().createUserWithEmailAndPassword(newUser.email,newUser.password)
            }
        })
        .then(data=>{
            let token=`Bearer ${data.user.refreshToken}`
            localStorage.setItem('FBIdToken',token)
            uid=data.user.uid;
            dispatch(clearErrors())
            const userCredentials={
                handle:newUser.userHandle,
                email:newUser.email,
                createdAt:new Date().toISOString(),
                imageUrl:`https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${noImage}?alt=media`,
                uid
            }
            return db.doc(`/users/${newUser.userHandle}`).set(userCredentials)
        })
        .then(()=>{
            dispatch(clearErrors())
            db.collection("users").where('uid','==',uid).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) =>{
                    localStorage.setItem('UserData',doc.data())
                    dispatch(setUser(doc.data()))
                });
                history.push('/')
            });
        })
        .catch((err)=>{
            if(err.code === 'auth/email-already-in-use'){
                dispatch(setErrors({general: 'Email already in use'}))
            }
        })
    }
}

export const signOut=()=>{
    return (dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase();
        firebase.auth().signOut()
        .then(()=>{
            localStorage.removeItem('FBIdToken')
            localStorage.removeItem('userData')
            dispatch(setUnauthenticated())
            window.location.reload()
        })
        .catch((err)=>{
            dispatch(signoutError(err))
        })
    }
}
export const getSpecificUser = (handle)=>{
    return (dispatch)=>{
        let userData={};
        db.doc(`/users/${handle}`).get()
        .then((doc)=>{
            if(doc.exists){
                userData=doc.data();
                return db.collection('posts').where('userHandle','==',handle).orderBy('createdAt','desc').get()
            }
            else{
                console.log('User not found')
            }
        })
        .then((data)=>{
            userData.posts=[];
            data.forEach((doc)=>{
                userData.posts.push({
                    body: doc.data().body,
                    createdAt: doc.data().createdAt,
                    userHandle: doc.data().userHandle,
                    userImage: doc.data().userImage,
                    likeCount: doc.data().likeCount,
                    commentCount: doc.data().commentCount,
                    postImage: doc.data().postImage,
                    postId: doc.id
                })
            })
            dispatch(getSpecificUserData(userData))
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}