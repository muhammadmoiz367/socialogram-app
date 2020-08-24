import React, {useEffect, useState, Fragment} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import {getSpecificPost, commentOnPost, likePost, unlikePost, deleteComment} from '../actions/dataActions'
import RepliesPageSkeleton from '../utils/repliesPageSkeleton';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 900,
      marginTop: '11%',
      textAlign:'left',
      marginRight: '5%',
      marginLeft: '2px'
    },
    rootExpand: {
        maxWidth: 1000,
        margin: '8% 0%',
        marginLeft: '5%'
    },
    rootList: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    mediaExpand: {
      height: 505,
      width: '100%'
    },
    avatar: {
      height: 30,
      width: 30
    },
    usersAvatar: {
        height: 30,
        width: 30,
    },
    content: {
        marginTop: 10,
    },
    separator:{
        borderBottom: '2px solid lightgray'
    },
    date: {
        marginLeft: 20,
        marginBottom: 10
    }
  }));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function RepliesPage(props) {
    const classes = useStyles();
    const [text, setText]=useState('')
    const [openErrorSnackbar, setOpenErrorSnackbar]=useState(false)
    
    const handleChange=(e)=>{
        setText(e.target.value)
    }
    const handleCloseErrorSnackbar = () => {
        setOpenErrorSnackbar(false);
    };
    const handleSubmitComment=()=>{
        const comment={
            body: text,
            postId: props.id,
            createdAt: new Date().toISOString(),
            userImage: props.user.credentials.imageUrl,
            userHandle: props.user.credentials.handle
        }
        props.dispatch(commentOnPost(comment, props.id))
    }
    const handleDeleteComment=(e)=>{
        if(e.target !== ""){
            const commentId=e.target.id
            const postId=props.id
            props.dispatch(deleteComment(commentId, props.user.credentials.handle, postId))
            setTimeout(()=>{
                setOpenErrorSnackbar(true);
            }, 8000)
        }
        
    }
    const isLiked=()=>{
        if(props.user.likes && props.user.likes.find((like)=> like.postId === props.specificPost.postId))
            return true
        else    
            return false
    }
    const handleLike=(e)=>{
        e.preventDefault()
        props.dispatch(likePost(props.specificPost.postId, props.user.credentials.handle))
    }
    const handleUnlike=(e)=>{
        e.preventDefault()
        props.dispatch(unlikePost(props.specificPost.postId, props.user.credentials.handle))
    }
    useEffect(() => {
        props.dispatch(getSpecificPost(props.id))
    }, [])
    dayjs.extend(relativeTime);
    return (
        <div>
            {Object.keys(props.data.specificPost).length===0
                ? (<RepliesPageSkeleton />)
               : (
                    <Fragment>
                        <Grid container spacing={0}>
                        <Grid item sm={7} xs={12}>
                            <Card  className={classes.rootExpand}>
                                <CardMedia
                                    className={classes.mediaExpand}
                                    image={props.specificPost.postImage}
                                    title={props.specificPost.body}
                                />
                            </Card>
                        </Grid>
                        <Grid item sm={5} xs={12}>
                            <Card  className={classes.root}>
                                <Link to={{pathname: `/user/${props.specificPost.userHandle}`, state: {handle: props.specificPost.userHandle} }}>
                                    <CardHeader
                                        className={classes.separator}
                                        avatar={
                                            <Avatar src={props.specificPost.userImage} alt={props.specificPost.userHandle} aria-label="recipe" className={classes.avatar} />
                                        }
                                        action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                        }
                                        title={props.specificPost.userHandle}
                                    />
                                </Link>
                                <ListItem key={props.specificPost.postId} >
                                        <ListItemAvatar>
                                        <Avatar
                                            alt={props.specificPost.userHandle}
                                            src={props.specificPost.userImage}
                                            className={classes.usersAvatar}
                                        />
                                        </ListItemAvatar>
                                        <ListItemText id={props.specificPost.postId} primary={props.specificPost.body} secondary={props.specificPost.userHandle} />
                                    </ListItem>                            
                                <div className="replies-box">
                                    {props.specificPost.comments && props.specificPost.comments.map((comment)=>(
                                        <ListItem key={comment.commentId}>
                                            <ListItemAvatar>
                                                <Link to={{pathname: `/user/${comment.userHandle}`, state: {handle: comment.userHandle} }}>
                                                    <Avatar
                                                        alt={comment.userHandle}
                                                        src={comment.userImage}
                                                        className={classes.usersAvatar}
                                                    />
                                                </Link>
                                            </ListItemAvatar>
                                            <ListItemText id={comment.commentId} primary={comment.body} secondary={dayjs(comment.createdAt).fromNow()} />
                                            <ListItemSecondaryAction>
                                            { props.user.authenticated && props.user.credentials.handle===comment.userHandle && 
                                                (<DeleteIcon id={comment.commentId} onClick={handleDeleteComment} className="deletePost" />)
                                            }
                                            
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        )
                                    )}
                                </div>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites">
                                        {isLiked() 
                                            ? <FavoriteOutlinedIcon  style={{color:'rgb(228,64,95)'}} onClick={handleUnlike}/>
                                            : <FavoriteBorderOutlinedIcon onClick={handleLike} />
                                        }
                                    </IconButton>
                                    <span>{props.specificPost.likeCount}</span>
                                    <IconButton aria-label="share">
                                        <QuestionAnswerOutlinedIcon />
                                    </IconButton>
                                    <span>{props.specificPost.commentCount}</span>
                                </CardActions>
                                <Typography variant="body2" color="textSecondary" component="p" className={classes.date} >
                                    {dayjs(props.specificPost.createdAt).fromNow()}
                                </Typography>
                                <div className="comment-box">
                                    <TextField style={{marginLeft: '5%', width: "80%"}} label="Comment" onChange={handleChange}/>
                                    <SendIcon style={{color:'rgb(228,64,95)', marginTop: '5%', marginLeft: '2%'}} onClick={handleSubmitComment} />
                                </div>
                            </Card>
                        </Grid>
                    </Grid>
                    <Snackbar open={openErrorSnackbar} autoHideDuration={3000} onClose={handleCloseErrorSnackbar}>
                        <Alert onClose={handleCloseErrorSnackbar} severity="error">
                            Comment deleted successfully
                        </Alert>
                    </Snackbar>
                </Fragment>
                )
            }
            
        </div>
    )
}

const mapStateToProps=({data, user})=>{
    return{
        specificPost: data.specificPost ? data.specificPost : null,
        user,
        data
    }
}

export default withRouter(connect(mapStateToProps)(RepliesPage))