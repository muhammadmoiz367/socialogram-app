import React from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: "fixed",
    '& > *': {
      margin: theme.spacing(1),
      marginRight: theme.spacing(3),
      marginTop: theme.spacing(4)
    },
  },

  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  content: {
      paddingTop: 20,
      fontSize: '16px'
  },
  add:{
      position: "fixed",
      top: '80%',
      left:'88%'
  }
}));

function Profile(props) {
    const classes = useStyles();
    console.log(props)
    return (
      <div className={classes.root}>
          <Link to={{pathname: `/user/${props.user.credentials.handle}`, state: {handle: props.user.credentials.handle} }}>
            <Avatar alt="Remy Sharp" src={props.user.credentials.imageUrl} className={classes.large} />
          </Link>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.content}>
            {props.user.credentials.handle}
        </Typography>
        <Fab style={{backgroundColor:'rgb(228,64,95)'}} aria-label="add" className={classes.add}>
            <Link to="/new-post"><AddIcon style={{color: 'white'}}/></Link>
        </Fab>
      </div>
    )
}

const mapStateToProps=({user})=>{
    return{
        user
    }
}

export default connect(mapStateToProps)(Profile)
