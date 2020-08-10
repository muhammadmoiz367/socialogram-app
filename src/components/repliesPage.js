import React, {useEffect, useState} from 'react'
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
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import {getSpecificPost, commentOnPost} from '../actions/dataActions'

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
    mediaExpand: {
      height: 450,
      width: '100%'
    },
    avatar: {
      height: 30,
      width: 30
    },
    content:{
        marginTop: -20,
        maxHeight: '300px'
    }
  }));

function RepliesPage(props) {
    const classes = useStyles();
    const [text, setText]=useState('')
    const handleLike=(e)=>{
        e.preventDefault()
        console.log('Post liked')
    }
    const handleChange=(e)=>{
        setText(e.target.value)
    }
    const handleSubmitComment=()=>{
        const comment={
            body: text,
            postId: props.id,
            createdAt: new Date().toISOString(),
            userImage: props.user.credentials.imageUrl,
            userHandle: props.user.credentials.handle
        }
        console.log(comment)
        props.dispatch(commentOnPost(comment, props.id))
    }
    useEffect(() => {
        props.dispatch(getSpecificPost(props.id))
    }, [])
    console.log(props)
    return (
        <div>
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
                        <CardHeader
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
                        <CardContent className={classes.content}>
                            <Typography variant="body2" color="textSecondary" component="p">
                            <span className="userName">{props.specificPost.userHandle}</span> {props.specificPost.body}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {moment(props.specificPost.createdAt).startOf('hour').fromNow() }
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteBorderOutlinedIcon onClick={handleLike}/>
                            </IconButton>
                            <span>{props.specificPost.likeCount}</span>
                            <IconButton aria-label="share">
                                <QuestionAnswerOutlinedIcon />
                            </IconButton>
                            <span>{props.specificPost.commentCount}</span>
                        </CardActions>
                        <div className="comment-box">
                            <TextField id="comment" label="Comment" onChange={handleChange}/>
                            <SendIcon style={{color:'rgb(228,64,95)'}} onClick={handleSubmitComment} />
                        </div>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps=({data, user})=>{
    return{
        specificPost: data.specificPost,
        user
    }
}

export default connect(mapStateToProps)(RepliesPage)