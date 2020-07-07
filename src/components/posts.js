import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid'
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft:30,
    maxWidth: 900,
    marginTop: 20,
    marginLeft: 20,
    textAlign:'left'
  },
  media: {
    //maxHeight: 0,
    //paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Posts() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [posts,setPosts] = useState([])
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    axios.get('/posts')
    .then(res=>{
      console.log(res.data);
      setPosts(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  },[posts])
  return (
    <Grid container spacing={6}>
      <Grid item sm={8} xs={12}>
        {posts
        ? posts.map(post=>(
          <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
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
          <CardContent>
            <Typography variant="body2" color="black" component="p">
              {post.body}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteBorderOutlinedIcon />
            </IconButton>
            <IconButton aria-label="share">
              <QuestionAnswerOutlinedIcon />
            </IconButton>
          </CardActions>
        </Card>
        ))
      : (<p>Loading...</p>)}
      </Grid>
      <Grid item sm={4} xs={12}>
          Profile
      </Grid>
    </Grid>
  );
}
