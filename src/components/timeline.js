import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Post from './post'

export default function Timeline() {
  const [posts,setPosts] = useState([])

  useEffect(() => {
    axios.get('/posts')
    .then(res=>{
      console.log(res.data);
      setPosts(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  },[])

  return (
    <Grid container spacing={6}>
      <Grid item sm={8} xs={12}>
        <Post posts={posts}/>
      </Grid>
      <Grid item sm={4} xs={12}>
          Profile
      </Grid>
    </Grid>
  );
}
