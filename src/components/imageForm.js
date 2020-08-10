import React,{useState} from 'react'
import {storage} from '../firebase/firebase'
import AddAPhotoRoundedIcon from '@material-ui/icons/AddAPhotoRounded';

function ImageForm(props) {
    const [imageUrl, setimageUrl] = useState('')
    const handleImageUpload=async (e)=>{
        const image=e.target.files[0]
        const imageExtension = e.target.files[0].name.split('.')[1];
        const imageFileName = `${Math.round(Math.random() * 1000000000000).toString()}.${imageExtension}`;
        const uploadTask=storage.ref(`postImages`).child(imageFileName)
        await uploadTask.put(image)
        uploadTask.getDownloadURL()
        .then(url=>{
            document.querySelector('.uploadedImage').style.display="block"
            props.onHandleImageChange(imageFileName, url)
            setimageUrl(url)
        })
    }
    return (
        <div className="formDiv">
            <input type="file" style={{visibility: "hidden"}} id="image-icon-file" onChange={handleImageUpload} />
            <label htmlFor="image-icon-file">
                <AddAPhotoRoundedIcon className="addImageBtn" fontSize="large" />
                <p className="addImageText">Click to add image</p>
            </label>
            <div>
                <img src={imageUrl} className="uploadedImage" />
            </div>
        </div>
    )
}

export default ImageForm
