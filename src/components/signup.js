import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
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
          setLoading(true)
          const userDetails={
            email,
            password,
            confirmPassword,
            userHandle
          }
          axios.post('/signup',userDetails)
          .then((res)=>{
            console.log(res.data)
            localStorage.setItem('FBIDToken',`Bearer ${res.data.token}`)
            setLoading(false)
            props.history.push('/')
          })
          .catch((err)=>{
            setErrors(err.response.data)
            setLoading(false)
          })

      }
  return (
    <Card className={classes.root} >
         <form className={classes.form} noValidate autoComplete="off">
           <Typography className={classes.title} variant="h5" id="appName">
                Socialogram
            </Typography>
            <TextField type='text' id="outlined-basic" label="User handle" variant="outlined" value={userHandle} onChange={handleChange} name="userHandle" helperText={errors.handle} error={errors.handle ? true : false} /><br /><br />
            <TextField type="email" id="outlined-basic" label="Email" variant="outlined" value={email} onChange={handleChange} name="email" helperText={errors.email} error={errors.email ? true : false} /><br /><br />
            <TextField type="password" id="outlined-basic" label="Password" variant="outlined" value={password} onChange={handleChange} name="password" helperText={errors.password} error={errors.password ? true : false} /><br /><br />
            <TextField type="password" id="outlined-basic" label="Confirm Password" variant="outlined" value={confirmPassword} onChange={handleChange} name="confirmPassword" helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false} /><br /><br />
            <Button
                onClick={handleSubmit}
                variant="contained"
                style={{backgroundColor:'rgb(228,64,95)',color:'white'}}
                className={classes.button}
            >
                {loading ? <CircularProgress size={30} color="secondary" /> : 'Signup'}
            </Button>
            {errors.general ? <p style={{color:'red',textAlign:'center'}}>{errors.general}</p> : null}
            <small className="toSignup">
                Already have an account
                <Link to="/login"><a> Login</a></Link>
            </small>
         </form>
    </Card >
  );
}

export default SignUp