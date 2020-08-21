import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/dataActions'
import Grid from '@material-ui/core/Grid'
import Post from './post'
import Profile from './profile'

function Timeline(props) {

  useEffect(() => {
    props.dispatch(handleInitialData())
    console.log(props)
  },[])

  return (
    <div className="timeline">
      <Grid container spacing={6} >
        <Grid item sm={8} xs={12}>
        {props.loading === false
          ? (<p>Loading posts...</p>)
          : props.posts.map((post)=>(
            <Post key={props.postId} post={post} />
          )
        )}
        </Grid>
        <Grid item sm={4} xs={12}>
            <Profile />
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps=({data, user})=>{
  const {posts} = data
  return{
    authenticated: user.authenticated,
    posts: data.posts,
    loading: data.loading
  }
}

export default connect(mapStateToProps)(Timeline)