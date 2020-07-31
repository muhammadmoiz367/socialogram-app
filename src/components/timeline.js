import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/dataActions'
import Grid from '@material-ui/core/Grid'
import Post from './post'
import Profile from './profile'

function Timeline(props) {

  useEffect(() => {
    console.log(props)
    props.dispatch(handleInitialData())
  },[])
  return (
    <div className="timeline">
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
        {props.postsIDs === null
          ? (<p>Loading posts...</p>)
          : props.postsIDs.map((id)=>(
            <Post id={id}/>
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
    postsIDs: posts !== undefined ? Object.keys(posts).sort((a,b)=>posts[b].createdAt - posts[a].createdAt) : null
  }
}

export default connect(mapStateToProps)(Timeline)