import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/dataActions'
import Grid from '@material-ui/core/Grid'
import Post from './post'

function Timeline(props) {

  useEffect(() => {
    console.log(props)
    props.dispatch(handleInitialData())
  },[])

  return (
    <Grid container spacing={6}>
      <Grid item sm={8} xs={12}>
        <Post posts={props.posts.posts}/>
      </Grid>
      <Grid item sm={4} xs={12}>
          Profile
      </Grid>
    </Grid>
  );
}

const mapStateToProps=({data, user})=>{
  return{
    posts: data,
    authenticated: user.authenticated
  }
}

export default connect(mapStateToProps)(Timeline)