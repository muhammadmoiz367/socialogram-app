
import firebase, { db } from '../firebase/firebase';
import {GET_POSTS, CREATE_POST, GET_SPECIFIC_POST, CREATE_NEW_COMMENT, LIKE_POST, UNLIKE_POST, LOADING_DATA} from '../actionConstants'
import 'firebase/firestore';
import post from '../components/post';

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
function likePostAction(data){
  return{
    type: LIKE_POST,
    data
  }
}
function unlikePostAction(data){
  return{
    type: UNLIKE_POST,
    data
  }
}
export const handleInitialData=()=>{
  return (dispatch, getState, {getFirebase, getFirestore})=>{
    const firebase=getFirebase();
    const firestore=getFirebase().firestore()
    let id;
    db.collection("posts").orderBy('createdAt', 'desc').get()
    .then((querySnapshot) => {
      let posts=[]
      querySnapshot.forEach((doc) =>{
        posts.push({
            postId:doc.id,
            body:doc.data().body,
            userHandle:doc.data().userHandle,
            createdAt:doc.data().createdAt,
            userImage: doc.data().userImage,
            likeCount:doc.data().likeCount,
            commentCount: doc.data().commentCount,
            postImage: doc.data().postImage
          })
       });
      dispatch({type: LOADING_DATA}) 
      dispatch(getPosts(posts))
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
//create post
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
//ge specific post
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
    return db.collection('comments').where('postId', '==', id).get();
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
//comment on post
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
      window.location.reload(false);
      dispatch(createNewComment(doc.data()))
    })
    .catch((err)=>{
      console.log(err);
    })
  }
}
//like on post
export const likePost = (postId, handle) => {
  return (dispatch)=>{
    const likeDocument = db.collection('likes').where('userHandle', '==', handle).where('postId', '==', postId).limit(1);
    const postDocument = db.doc(`/posts/${postId}`);
    let postData;

    postDocument.get()
    .then((doc) => {
        if (doc.exists) {
            postData = doc.data();
            postData.postId = doc.id;
            return likeDocument.get();
        } else {
            console.log('post not found');
        }
    })
    .then((data) => {
        if (data.empty) {
            return db.collection('likes').add({
                postId: postId,
                userHandle: handle
            })
            .then(() => {
                postData.likeCount++;
                return postDocument.update({ likeCount: postData.likeCount });
            })
            .then(() => {
                dispatch(likePostAction(postData))
            });
        } else {
            console.log('Post already liked')
        }
    })
    .catch((err) => {
        console.log(err);
    });
  }
};
//unlike post
export const unlikePost = (postId, handle) => {
  return (dispatch)=>{
    const likeDocument = db.collection('likes').where('userHandle', '==', handle).where('postId', '==', postId).limit(1);
    const postDocument = db.doc(`/posts/${postId}`);
    let postData;

    postDocument.get()
      .then((doc) => {
        if (doc.exists) {
          postData = doc.data();
          postData.postId = doc.id;
          return likeDocument.get();
        } else {
            console.log('post not found');
        }
      })
      .then((data) => {
        if (data.empty) {
          console.log('post not liked');
        } else {
          return db.doc(`/likes/${data.docs[0].id}`).delete()
            .then(() => {
              postData.likeCount--;
              return postDocument.update({ likeCount: postData.likeCount });
            })
            .then(() => {
              dispatch(unlikePostAction(postData))
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

//forced check for like
export const forcedIsLiked = (postId, handle) =>{
  return (dispatch)=>{
    db.collection('likes').where('userHandle', '==', handle).where('postId', '==', postId).limit(1).get()
    .then((doc)=>{
      if(doc.exists){
        console.log('true')
        return true
      }
      else{
        console.log('true')
        return false
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }
}