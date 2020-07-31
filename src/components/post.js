import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 900,
      marginTop: 20,
      marginLeft: 20,
      textAlign:'left'
    },
    media: {
      maxHeight: 0,
      paddingTop: '56.25%', // 16:9
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
    const handleLike=(e)=>{
        e.preventDefault()
        console.log('Post liked')
    }
    return (
        <div>
            <ul className="posts-list">
            { props.post === null
                ? ( <p>Post not found</p>)
                : (
                    <li key={props.id}>
                        <Card  className={classes.root}>
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
                            <CardMedia
                                className={classes.media}
                                image="https://firebasestorage.googleapis.com/v0/b/social-app-7ddb9.appspot.com/o/353524666602.jpg?alt=media"
                                title="Paella dish"
                            />
                            <Link to={{pathname: `/post/${props.id}`, state: {id: props.id} }}>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteBorderOutlinedIcon onClick={handleLike}/>
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
                                        {moment(props.post.createdAt).startOf('day').fromNow() }
                                    </Typography>
                                </CardContent>
                            </Link>
                        </Card>
                    </li>
                )
            }
            </ul>
        </div>
    )
}

const mapStateToProps=({data},{id})=>{
    const post=data.posts[id]
    return{
        post: post ? post : null
    }
}

export default connect(mapStateToProps)(Post)
