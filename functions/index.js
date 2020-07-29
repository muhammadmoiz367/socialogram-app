const functions = require('firebase-functions');
const cors = require('cors')
const app=require('express')();

app.use(cors())

const FBAuth=require('./utils/fbAuth');
const { db }=require('./utils/admin');
const {getAllPosts, createPost, getPost, commentOnPost, deletePost, likePost, unlikePost}=require('./handlers/posts');
const {signup, login, uploadImage, addUserDetails, getAuthenticatedUser, getUserDetails, markNotificationsRead} =require('./handlers/users');

//posts route
app.get('/posts',getAllPosts);
app.post('/post', FBAuth, createPost);
app.get('/post/:postId', getPost);
app.post('/post/:postId/comment', FBAuth, commentOnPost);
app.delete('/post/:postId', FBAuth, deletePost);
app.get('/post/:postId/like', FBAuth, likePost);
app.get('/post/:postId/unlike', FBAuth, unlikePost);

//sigunup route
app.post("/signup",signup);
app.post("/login",login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);
app.get('/user/:handle', getUserDetails);
app.post('/notifications', FBAuth, markNotificationsRead);

//kdjsfgdksuufhgkdsufky

exports.api=functions.https.onRequest(app);

exports.deleteNotificationOnUnlike=functions.firestore.document('likes/{id}').onDelete((snapshot)=>{
    return db.doc(`/notifications/${snapshot.id}`).delete()
    .then(()=>{
        return;
    })
    .catch((err)=>{
        console.error(err);
        return;
    })
})

exports.createNotificationForLike = functions.firestore.document('likes/{id}').onCreate((snapshot)=>{
    return db.doc(`/posts/${snapshot.data().postId}`).get()
    .then((doc) => {
        if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle){
            return db.doc(`/notifications/${snapshot.id}`).set({
                createdAt: new Date().toISOString(),
                recipient: doc.data().userHandle,
                sender: snapshot.data().userHandle,
                type: 'like',
                read: false,
                postId: doc.id
            })
        }
    })
    .catch((err) => {
        console.error(err);
        return;
    });
});

exports.createNotificationForComment = functions.firestore.document('comments/{id}').onCreate((snapshot)=>{
    return db.doc(`/posts/${snapshot.data().postId}`).get()
    .then((doc) => {
        if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle){
            return db.doc(`/notifications/${snapshot.id}`).set({
                createdAt: new Date().toISOString(),
                recipient: doc.data().userHandle,
                sender: snapshot.data().userHandle,
                type: 'comment',
                read: false,
                postId: doc.id
            })
        }
    })
    .catch((err) => {
        console.error(err);
        return;
    });
});

exports.onUserImageChange = functions.firestore.document('/users/{userId}').onUpdate((change) => {
    console.log(change.before.data());
    console.log(change.after.data());
    if (change.before.data().imageUrl !== change.after.data().imageUrl) {
      console.log('image has changed');
      const batch = db.batch();
      return db.collection('posts').where('userHandle', '==', change.before.data().handle).get()
        .then((data) => {
          data.forEach((doc) => {
            const post = db.doc(`/posts/${doc.id}`);
            batch.update(post, { userImage: change.after.data().imageUrl });
          });
          return db.collection('comments').where('userHandle', '==', change.before.data().handle).get()
        })
        .then((data) => {
            data.forEach((doc) => {
                const comment = db.doc(`/comments/${doc.id}`);
                batch.update(comment, { userImage: change.after.data().imageUrl });
            });
            return batch.commit();
        });
    } else return true;
  });

exports.onPostDelete = functions.firestore.document('/posts/{postId}').onDelete((snapshot, context) => {
    const postId = context.params.postId;
    const batch = db.batch();
    return db.collection('comments').where('postId', '==', postId).get()
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/comments/${doc.id}`));
        });
        return db.collection('likes').where('postId', '==', postId).get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/likes/${doc.id}`));
        });
        return db.collection('notifications').where('postId', '==', postId).get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/notifications/${doc.id}`));
        });
        return batch.commit();
      })
      .catch((err) => console.error(err));
  });