
import firebase, { db } from '../firebase/firebase';
import {GET_POSTS} from '../actionConstants'
import 'firebase/firestore';

function getPosts(data){
  return{
    type: GET_POSTS,
    data
  }
}

export const handleInitialData=()=>{
  return (dispatch, getState, {getFirebase, getFirestore})=>{
    const firebase=getFirebase();
    const firestore=getFirebase().firestore()
    let id;
    let posts={}
    db.collection("posts").get()
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
