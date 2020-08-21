import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {signUp} from '../actions/authUserActions'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles(theme=>({
  root: {
    paddingLeft:100,
    paddingRight:110,
    paddingBottom:50,
    marginLeft:330,
    marginTop:60,
    width: 170,
  },
  form: {
    '& > *': {
      width: '32ch',
      marginLeft:-45
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '32ch',
    marginLeft:-45
  },
  button: {
    marginLeft:-30
  },
  label:{
    paddingLeft:10
  },
  title:{
    marginLeft: -140,
    padding: 20,
    paddingTop: 30
  }
}));

function SignUp(props) {
    const classes = useStyles();
    const [userHandle, setUserHandle]=useState('');
    const [email, setEmail]=useState('');
    const [errors, setErrors]=useState('');
    const [password, setPassword]=useState('');
    const [confirmPassword, setConfirmPassword]=useState('');
    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
      if(event.target.name === 'userHandle'){
        setUserHandle(event.target.value)
      }
      if(event.target.name === 'email'){
        setEmail(event.target.value)
      }
      if(event.target.name === 'password'){
        setPassword(event.target.value)
      }
      if(event.target.name === 'confirmPassword'){
        setConfirmPassword(event.target.value)
      }
    };
      const handleSubmit=(event)=>{
          event.preventDefault();
          const userDetails={
            email,
            password,
            confirmPassword,
            userHandle
          }
          props.dispatch(signUp(userDetails, props.history))
      }
      useEffect(() => {
        console.log(props)
      },[props])

  return (
    <Card className={classes.root} >
         <form className={classes.form} noValidate autoComplete="off">
           <Typography className={classes.title} variant="h5" id="appName">
                Socialogram
            </Typography>
            <TextField
              type='text'
              id="outlined-basic"
              label="User handle"
              name="userHandle"
              variant="outlined"
              value={userHandle}
              onChange={handleChange}
              helperText={props.errors.handle}
              error={props.errors.handle ? true : false}
            /><br /><br />
            <TextField
              type="email"
              id="outlined-basic"
              label="Email"
              name="email"
              variant="outlined"
              value={email}
              onChange={handleChange}
              helperText={props.errors.email}
              error={props.errors.email ? true : false}
            /><br /><br />
            <TextField
              type="password"
              id="outlined-basic"
              label="Password"
              name="password"
              variant="outlined"
              value={password}
              onChange={handleChange}
              helperText={props.errors.password}
              error={props.errors.password ? true : false}
            /><br /><br />
            <TextField
              type="password"
              id="outlined-basic"
              label="Confirm Password"
              name="confirmPassword"
              variant="outlined"
              value={confirmPassword}
              onChange={handleChange}
              helperText={props.errors.confirmPassword}
              error={props.errors.confirmPassword ? true : false}
            /><br /><br />
            <Button
                onClick={handleSubmit}
                variant="contained"
                style={{backgroundColor:'rgb(228,64,95)',color:'white'}}
                className={classes.button}
            >
                {props.loading ? <CircularProgress size={25} color="white" /> : 'Signup'}
            </Button>
            {props.errors.general ? <p style={{color:'red',textAlign:'center'}}>{props.errors.general}</p> : null}
            <br />
            <small className="toSignup">
                Already have an account
                <Link to="/login"><a> Login</a></Link>
            </small>
         </form>
    </Card >
  );
}

const mapStateToProps=({user, ui})=>{
  return{
    user,
    loading: ui.loading,
    errors: ui.errors
  }
}

export default connect(mapStateToProps)(SignUp)