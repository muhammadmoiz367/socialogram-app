import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import {getAllPosts} from '../actions/dataActions'
import {getAuthenticatedUser} from '../actions/authUserActions'
import Post from './post'
import Profile from './profile'
import PostSkeleton from '../utils/postSkeleton'

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  content: {
      paddingTop: 20,
      fontSize: '16px'
  }
}));

function Timeline(props) {
  const classes = useStyles();
  useEffect(() => {
    props.dispatch(getAllPosts())
    props.dispatch(getAuthenticatedUser(props.user.credentials.handle))
  },[props])

  return (
    <div className="timeline">
      <Grid container spacing={3} >
        <Grid item sm={8} xs={12}>
        {props.loading === false
          ? (<PostSkeleton />)
          : (
            <ul className="posts-list">
              {props.posts.map((post)=>(
                <Post key={post.postId} post={post} />
              ))}
            </ul>
          )
         }
        </Grid>
        <Grid item sm={4} xs={12}>
            {
              props.loading === false 
              ? ( <>
                    <Skeleton animation="wave" variant="circle"  className={classes.large}/>
                    <Skeleton animation="wave" height={10} width="80%" className={classes.content} />
                  </>
                )
              : (<Profile />)
            }
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps=({data, user})=>{
  const {posts} = data
  return{
    user,
    posts: data.posts,
    loading: data.loading
  }
}

export default connect(mapStateToProps)(Timeline)
