import React from 'react'
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

const useStyles = makeStyles((theme) => ({
    root: {
      paddingLeft:50,
      maxWidth: 900,
      marginTop: 20,
      marginLeft: 20,
      textAlign:'left'
    },
    media: {
      //maxHeight: 0,
      //paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: red[500],
    },
    content:{
        paddingLeft:20
    }
  }));

function Post(props) {
    const classes = useStyles();
    return (
        <div>
            <ul className="posts-list">
            {!props.posts
                ? <p>Loading...</p>
                : props.posts.map(post=>(
                    <li key={post.postId}>
                        <Card  className={classes.root}>
                            <CardHeader
                                avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    {post.userHandle[1]}
                                </Avatar>
                                }
                                action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                                }
                                title={post.userHandle}
                                subheader={post.createdAt}
                            />
                            <CardMedia
                                className={classes.media}
                                image=""
                                title="Paella dish"
                            />
                            <CardContent className={classes.content}>
                                <Typography variant="body2" color="textSecondary" component="p">
                                {post.body}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteBorderOutlinedIcon />
                                    <span>{post.likeCount}</span>
                                </IconButton>
                                <IconButton aria-label="share">
                                    <QuestionAnswerOutlinedIcon />
                                    <span>{post.commentCount}</span>
                                </IconButton>
                            </CardActions>
                        </Card>
                    </li>
                ))
            }
            </ul>
        </div>
    )
}

export default Post
