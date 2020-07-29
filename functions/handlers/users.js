const {db, admin}=require('../utils/admin');
const config=require('../utils/config');

const firebase=require('firebase');
firebase.initializeApp(config);

const {signUpValidate, loginValidate, reduceUserDetails}=require('../utils/validators');

//sign up
exports.signup=(req,res)=>{
    const newUser={
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword,
        handle:req.body.handle
    }
    const {isValid, errors}=signUpValidate(newUser);
    if(!isValid){
        return res.status(400).json( errors )
    }
    let token,uid;
    const noImage='no-image.png'
    db.doc(`/users/${newUser.handle}`).get()
    .then((doc)=>{
        if(doc.exists){
            return res.status(400).json({ handle: 'this handle is already taken'})
        }
        else{
            return firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email,newUser.password)
        }
    })
    .then(data=>{
        uid=data.user.uid
        return data.user.getIdToken()
    })
    .then(idToken=>{
        token=idToken
        const userCredentials={
            handle:newUser.handle,
            email:newUser.email,
            createdAt:new Date().toISOString(),
            imageUrl:`https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImage}?alt=media`,
            uid
        }
        db.doc(`/users/${newUser.handle}`).set(userCredentials)
        return res.status(201).json({ token })
    })
        .then(()=>{
            return res.status(201).json({ token })
        })
    .catch((err)=>{
        console.error(err)
        if(err.code === 'auth/email-already-in-use'){
            return res.status(400).json({ email: 'Email already in use'})
        }
        return res.status(500).json({ error: "something went wrong, try again later" })
    })
}

//login
exports.login=(req,res)=>{
    const user={
        email:req.body.email,
        password:req.body.password
    }
    const {isValid,errors}=loginValidate(user);
    if(!isValid){
        return res.status(400).json( errors )
    }
    firebase.auth().signInWithEmailAndPassword(user.email,user.password)
    .then(data=>{
        return data.user.getIdToken()
    })
    .then(token=>{
        return res.json({token})
    })
    .catch((err)=>{
        console.error(err);
        if(err.code==='auth/wrong-password' || err.code==="auth/user-not-found"){
            return res.status(403).json({general:"wrong credentials. Try again"})
        }else
            return res.status(500).json({error:err.code})
    })

}

//add user details
exports.addUserDetails=(req,res)=>{
    let userDetails=reduceUserDetails(req.body);
    db.doc(`/users/${req.user.handle}`).update(userDetails)
    .then(()=>{
        return res.json({ message: 'Details added successfully'})
    })
    .catch((err)=>{
        console.error(err);
        return res.status(500).json({ error: err.code })
    })
}

//get login user details
exports.getAuthenticatedUser=(req,res)=>{
    let userData={}
    db.doc(`/users/${req.user.handle}`).get()
    .then((doc)=>{
        if(doc.exists){
            userData.credentials=doc.data();
            return db.collection('likes').where('userHandle','==',req.user.handle).get()
        }
    })
    .then((data)=>{
        userData.likes=[];
        data.forEach((doc)=>{
            userData.likes.push(doc.data())
        });
        return db.collection('notifications').where('recipient','==',req.user.handle).orderBy('createdAt','desc').limit(10).get()
        .then((data)=>{
            userData.notifications=[];
            data.forEach(doc=>{
                userData.notifications.push({
                    recipient: doc.data().recipient,
                    sender: doc.data().sender,
                    createdAt: doc.data().createdAt,
                    postId: doc.data().postId,
                    type: doc.data().type,
                    read: doc.data().read,
                    notificationsId: doc.id
                })
            })
            return res.json( userData)
        })
    })
    .catch((err)=>{
        console.error(err);
        return res.status(500).json({ error: err.code });
    })
}

//get user Details
exports.getUserDetails = (req, res)=>{
    let userData={};
    db.doc(`/users/${req.params.handle}`).get()
    .then((doc)=>{
        if(doc.exists){
            userData.user=doc.data();
            return db.collection('posts').where('userHandle','==',req.params.handle).orderBy('createdAt','desc').get()
        }
        else{
            return res.status(404).json({ error: 'User not found'})
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
                postId: doc.id
            })
        })
        return res.json(userData)
    })
    .catch((err)=>{
        console.error(err);
        return res.status(500).json({ error: err.code });
    })
}

//upload image
exports.uploadImage = (req, res) => {
    const BusBoy = require("busboy");
    const path = require("path");
    const os = require("os");
    const fs = require("fs");

    const busboy = new BusBoy({ headers: req.headers });

    let imageToBeUploaded = {};
    let imageFileName;

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      console.log(fieldname, file, filename, encoding, mimetype);
      if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
        return res.status(400).json({ error: "Wrong file type submitted" });
      }
      // my.image.png => ['my', 'image', 'png']
      const imageExtension = filename.split(".")[filename.split(".").length - 1];
      // 32756238461724837.png
      imageFileName = `${Math.round(Math.random() * 1000000000000).toString()}.${imageExtension}`;
      const filepath = path.join(os.tmpdir(), imageFileName);
      imageToBeUploaded = { filepath, mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on("finish", () => {
      admin
        .storage()
        .bucket()
        .upload(imageToBeUploaded.filepath, {
          resumable: false,
          metadata: {
            metadata: {
              contentType: imageToBeUploaded.mimetype
            },
          },
        })
        .then(() => {
          // Append token to url
          const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
          return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
        })
        .then(() => {
          return res.json({ message: "image uploaded successfully" });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ error: "something went wrong" });
        });
    });
    busboy.end(req.rawBody);
  };

  //read notifications
  exports.markNotificationsRead=(req, res)=>{
      let batch=db.batch();
      req.body.forEach((notificationId)=>{
          const notification=db.doc(`/notifications/${notificationId}`)
          batch.update(notification, { read: true})
      });
      batch.commit()
      .then(()=>{
          return res.json({ message: "Notification mark read"});
      })
      .catch((err)=>{
        console.error(err);
        return res.status(500).json({ error: err.code });
    })
  }