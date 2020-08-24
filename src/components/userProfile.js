import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { makeStyles } from '@material-ui/core/styles';
import UserDetailsModal from './userDetailsModal';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { deletePost } from '../actions/dataActions';
import {getSpecificUser, uploadImage} from '../actions/authUserActions'
import UserSkeleton from '../utils/userSkeleton'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: '3%',
        marginTop: '5%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        width: '90%',
      },
      icon: {
        color: 'rgba(255, 255, 255, 0.54)',
      },
    avatar: {
        marginLeft: "100%",
        marginTop: "8%",
        height: 120,
        width: 120
    },
    handle: { 
        marginTop:'6%',
        fontWeight: '500',
        marginLeft: '-25%',
        fontSize: '20px',
        marginBottom:'1%'
    },
    intro: {
        textAlign:'left',
        marginLeft:'31%',
        fontSize: '14px'
    },
    userDetailsEditBtn: {
        position: 'absolute',
        left: '65%',
        top: '17%'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #1e1e1e',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '40%'
      },
      rootTab: {
        flexGrow: 1,
        marginTop: 30
      },
}));

function UserProfile(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar]=useState(false)
    const [openErrorSnackbar, setOpenErrorSnackbar]=useState(false)
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    const handleCloseErrorSnackbar = () => {
        setOpenErrorSnackbar(false);
    };

    const handleDeletePost=(e)=>{
        if(e.target.id !== ''){
            const id=e.target.id
            props.dispatch(deletePost(id, props.user.credentials.handle))
            setTimeout(()=>{
                setOpenErrorSnackbar(true);
            }, 3000)
        }
    }

    const handleImageUpload= (e)=>{
        const image=e.target.files[0]
        props.dispatch(uploadImage(image, props.user.credentials.handle))
        setTimeout(()=>{
            setOpenSnackbar(true);
        }, 5000)
        
    }

    useEffect(() => {
        props.dispatch(getSpecificUser(props.handle))
    }, [props])

    return (
        <div className="timeline">
            { Object.keys(props.user.specificUser).length===0
            ? ( <UserSkeleton /> )
            : (
                <Grid container spacing={0} >
                    <Grid item sm={4} xs={12}>
                    {props.user.authenticated && props.user.credentials.handle===props.handle
                        ? (<div className="container">
                                <Avatar
                                    alt={props.user.specificUser.handle}
                                    src={props.user.specificUser.imageUrl}
                                    className='avatar'
                                />
                                <div className="middle">
                                    <div className="text" >
                                        <input type="file" style={{display: 'none'}} id="image-icon-file" onChange={handleImageUpload} />
                                        <label htmlFor="image-icon-file">
                                            <AddAPhotoIcon />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )
                        : (<Avatar
                            alt={props.user.specificUser.handle}
                            src={props.user.specificUser.imageUrl}
                            className={classes.avatar}
                        />)
                        }
                    </Grid>
                    <Grid item sm={8} xs={12}>
                        <div>
                            <Typography variant="body1" color="textSecondary" component="p" className={classes.handle}>
                                {props.user.specificUser.handle}
                            </Typography>
                            {props.user.authenticated && props.user.credentials.handle===props.handle && (
                                <Button size="small" variant="outlined" className={classes.userDetailsEditBtn} onClick={handleOpen}>
                                    Edit Profile
                                </Button>
                            )}
                            {props.user.specificUser.name && (
                                <Typography variant="body1" color="textPrimary" component="p" className={classes.intro}>
                                    {`${props.user.specificUser.name} || ${props.user.specificUser.location}`}
                                </Typography>
                            )}
                            {props.user.specificUser.bio && (
                                <Typography variant="body1" color="textPrimary" component="p" className={classes.intro}>
                                    {`~ ${props.user.specificUser.bio}`}
                                </Typography>
                            )}
                            {props.user.specificUser.website && (
                                <Typography variant="body1" color="textPrimary" component="p" className={classes.intro}>
                                    {`Website: ${props.user.specificUser.website}`}
                                </Typography>
                            )}
                        </div>
                    </Grid>
                </Grid>)
                }
                <Paper className={classes.rootTab}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="My posts" />
                        <Tab label="Favourites" />
                    </Tabs>
                </Paper>
                { Object.keys(props.user.specificUser).length===0 
                    ? (<Typography variant="body1" color="textSecondary" component="p"  >
                            No posts to show
                        </Typography>)
                    : (
                    <div className={classes.root}>
                        <GridList cellHeight={240}  className={classes.gridList} cols={3}>
                            {props.user.specificUser.posts.map((post)=>(
                                <GridListTile key={post.postId}>
                                    <Link to={{pathname: `/post/${post.postId}`, state: {id: post.postId} }}>
                                        <img src={post.postImage} alt={post.postId} className="post-gallery"/>
                                    </Link>
                                    <GridListTileBar
                                        title={post.body}
                                        actionIcon={
                                            <IconButton aria-label={post.postId} className={classes.icon}>
                                                { props.user.authenticated && props.user.credentials.handle===props.handle && (<DeleteIcon id={post.postId} onClick={handleDeletePost} className="deletePost" />)}
                                            </IconButton>
                                            }
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                    )
                }
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                    <div className={classes.paper}>
                        <UserDetailsModal imageUrl={props.user.specificUser.imageUrl} handle={props.user.specificUser.handle} />
                    </div>
                    </Fade>
                </Modal>
                <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="success">
                        Picture uploaded successfully
                    </Alert>
                </Snackbar>
                <Snackbar open={openErrorSnackbar} autoHideDuration={3000} onClose={handleCloseErrorSnackbar}>
                    <Alert onClose={handleCloseErrorSnackbar} severity="error">
                        Post deleted successfully
                    </Alert>
                </Snackbar>
                
        </div>
    )
}

const mapStateToProps = ({user})=>{
    return{
        user
    }
}

export default connect(mapStateToProps)(UserProfile)

