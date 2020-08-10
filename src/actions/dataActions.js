
import firebase, { db } from '../firebase/firebase';
import {GET_POSTS, CREATE_POST, GET_SPECIFIC_POST, CREATE_NEW_COMMENT} from '../actionConstants'
import 'firebase/firestore';

function getPosts(data){
  return{
    type: GET_POSTS,
    data
  }
}
function createNewPost(post){
  return{
    type: CREATE_POST,
    data: post
  }
}
function getSpecificPostData(data){
  return{
    type: GET_SPECIFIC_POST,
    data
  }
}
function createNewComment(comment){
  return{
    type: CREATE_NEW_COMMENT,
    data: comment
  }
}

export const handleInitialData=()=>{
  return (dispatch, getState, {getFirebase, getFirestore})=>{
    const firebase=getFirebase();
    const firestore=getFirebase().firestore()
    let id;
    let posts={}
    db.collection("posts").orderBy('createdAt', 'desc').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) =>{
      id=doc.id;
      posts[id]=doc.data();
       });
      dispatch(getPosts(posts))
    })
    .catch(err=>{
      console.log(err)
    })
  }
}

export const createPost=(newPost, history)=>{
  return (dispatch, getState, {getFirebase, getFirestore})=>{
    db.collection("posts").add(newPost)
    .then(doc=>{
      console.log('document written successfully with id: ',doc.id )
      db.doc(`/posts/${doc.id}`).get()
      .then(doc=>{
        let newPostData={}
        newPostData=doc.data()
        newPostData.id=doc.id
        dispatch(createNewPost(newPostData))
        history.push('/')
      })
      .catch(err=>{
        console.log(err)
      })
    })
  }
}

export const getSpecificPost=(id)=>{
  return (dispatch, {getFirebase, getFirestore})=>{
    let postData = {};
    db.doc(`/posts/${id}`).get()
    .then((doc) => {
    if (!doc.exists) {
        console.log('Document not existed')
    }
    postData = doc.data();
    postData.postId = doc.id;
    return db.collection('comments').orderBy('createdAt', 'desc').where('postId', '==', id).get();
    })
    .then((data) => {
        postData.comments = [];
        data.forEach((doc) => {
            postData.comments.push(doc.data());
        });
        return db.collection('likes').where('postId', '==', id).get();
    })
    .then((data) => {
        postData.likes = [];
        data.forEach((doc) => {
            postData.likes.push(doc.data());
        });
        dispatch(getSpecificPostData(postData))
    })
    .catch((err) => {
        console.log(err);
    });
  }
}
export const commentOnPost=(newComment, postId)=>{
  return (dispatch)=>{
    db.doc(`/posts/${postId}`).get()
    .then((doc)=>{
      if(!doc.exists){
          console.log('Post not found');
      }
      return doc.ref.update({ commentCount: doc.data().commentCount+1});
    })
    .then(()=>{
      return db.collection('comments').add(newComment);
    })
    .then((doc)=>{
      console.log('new comment added with id: ', doc.id)
      db.doc(`/comments/${doc.id}`).get()
    })
    .then(doc=>{
      dispatch(createNewComment(doc.data()))
    })
    .catch((err)=>{
      console.log(err);
    })
  }
}