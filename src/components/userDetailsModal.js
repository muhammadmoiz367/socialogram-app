import React, {useState} from 'react'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {addUserDetails} from '../actions/authUserActions'

const useStyles = makeStyles((theme) => ({
    root: {

      },
    avatar: {
        marginTop: '2%',
        marginBottom: '5%',
        height: 60,
        width: 60
    },
    handle: { 
        marginTop:'8%',
        fontWeight: '500',
        marginLeft: '-25%',
        fontSize: '20px',
        marginBottom:'1%'
    }
}))

function UserDetailsModal(props) {
    const classes = useStyles();
    const [name,setName]=useState('')
    const [bio,setBio]=useState('')
    const [location,setLocation]=useState('')
    const [website,setWebsite]=useState('')

    const handleChange=(e)=>{
        if(e.target.name==='name'){
            setName(e.target.value)
        }
        if(e.target.name==='bio'){
            setBio(e.target.value)
        }
        if(e.target.name==='location'){
            setLocation(e.target.value)
        }
        if(e.target.name==='website'){
            setWebsite(e.target.value)
        }
    }
    const handleSaveDetails=(e)=>{
        e.preventDefault();
        const userData={
            name, 
            bio, 
            location, 
            website
        }
        console.log(userData)
        props.dispatch(addUserDetails(props.handle, userData))
        setBio('');
        setLocation('')
        setName('')
        setWebsite('')
    }

    return (
         <div>
            <Typography variant="body1" color="textPrimary" component="p" style={{textAlign: 'center', margin: '4% 0'}}>
                Add your Details    
            </Typography>
            <TextField id="name" name="name" value={name} label="Name" variant="outlined" className="userDetailsText" onChange={handleChange} /><br/><br/>
            <TextField id="bio" name="bio" label="Bio" value={bio} variant="outlined" className="userDetailsText" onChange={handleChange} /><br/><br/>
            <TextField id="location" name="location" value={location} label="location" variant="outlined" className="userDetailsText" onChange={handleChange} /><br/><br/>
            <TextField id="website" name="website" label="Website" value={website} variant="outlined" className="userDetailsText" onChange={handleChange} /><br/><br/>
            <Button size="small" variant="contained" style={{backgroundColor:'rgb(228,64,95)', color: 'white', marginLeft: '37%'}} onClick={handleSaveDetails}>
                Save Details
            </Button>
        </div>
    )
}

export default connect()(UserDetailsModal)
