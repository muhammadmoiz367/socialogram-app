import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
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
import {likePost, unlikePost, getSpecificPost} from '../actions/dataActions'

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 900,
      marginTop: 20,
      marginLeft: "10%",
      marginRight: "10%",
      textAlign:'left'
    },
    media: {
      height: 400,
      width: '100%'
    },
    avatar: {
      height: 45,
      width: 45
    },
    content:{
        marginTop: -20
    }
  }));

function Post(props) {
    const classes = useStyles();
    const isLiked=()=>{
        if(props.user.likes && props.user.likes.find((like)=> like.postId === props.post.postId))
            return true
        else    
            return false
    }
    const handleLike=(e)=>{
        e.preventDefault()
        props.dispatch(likePost(props.post.postId, props.user.credentials.handle))
    }
    const handleUnlike=(e)=>{
        e.preventDefault()
        props.dispatch(unlikePost(props.post.postId, props.user.credentials.handle))
    }
    dayjs.extend(relativeTime);
    return (
        <div>
            <li key={props.post.id}>
                <Card  className={classes.root}>
                    <Link to={{pathname: `/user/${props.post.userHandle}`, state: {handle: props.post.userHandle} }}>
                        <CardHeader
                            avatar={
                            <Avatar src={props.post.userImage} alt={props.post.userHandle} aria-label="recipe" className={classes.avatar} />
                            }
                            action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                            }
                            title={props.post.userHandle}
                        />
                        </Link>
                    <CardMedia
                        className={classes.media}
                        image={props.post.postImage}
                        title="Paella dish"
                    />
                    <Link to={{pathname: `/post/${props.post.postId}`, state: {id: props.post.postId} }}>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                {isLiked() 
                                    ? <FavoriteOutlinedIcon  style={{color:'rgb(228,64,95)'}} onClick={handleUnlike}/>
                                    : <FavoriteBorderOutlinedIcon onClick={handleLike} />
                                }
                            </IconButton>
                            <span>{props.post.likeCount}</span>
                            <IconButton aria-label="share">
                                <QuestionAnswerOutlinedIcon />
                            </IconButton>
                            <span>{props.post.commentCount}</span>
                        </CardActions>
                        <CardContent className={classes.content}>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <span className="userName">{props.post.userHandle}</span> {props.post.body}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {dayjs(props.post.createdAt).fromNow()}
                            </Typography>
                        </CardContent>
                    </Link>
                </Card>
            </li>
        </div>
    )
}

const mapStateToProps=({data, user})=>{
    return{
        user: user,
        loading: data.loading
    }
}

export default withRouter(connect(mapStateToProps)(Post))