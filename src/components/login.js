import React,{useState} from 'react'
import {Link } from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
const useStyles = makeStyles(theme=>({
  root: {
    paddingLeft:100,
    paddingRight:110,
    paddingBottom:30,
    marginLeft:330,
    marginTop:140,
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

function Login(props) {
    const classes = useStyles();
    const [email, setEmail]=useState('');
    const [errors, setErrors]=useState('');
    const [password, setPassword]=useState('');
    const [showPassword, setShowPassword]=useState(false);
    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
      if(event.target.name === 'email'){
        setEmail(event.target.value)
      }
      if(event.target.name === 'password'){
        setPassword(event.target.value)
      }
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
      };

      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      const handleSubmit=(event)=>{
          event.preventDefault();
          setLoading(true)
          const userDetails={
            email,
            password
          }
          axios.post('/login',userDetails)
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
            <TextField
                id="outlined-basic"
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                value={email}
                onChange={handleChange}
                helperText={errors.email}
                error={errors.email ? true : false}
            /><br /><br />
            <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel className={classes.label} htmlFor="standard-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={password}
                    onChange={handleChange}
                    helperText={errors.password}
                    error={errors.password ? true : false}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
            </FormControl>
            <br /><br/>
            <Button
                onClick={handleSubmit}
                variant="contained"
                style={{backgroundColor:'rgb(228,64,95)',color:'white'}}
                className={classes.button}
            >
                {loading ? <CircularProgress style={{}} color="secondary" /> : 'Login'}
            </Button>
            {errors.general ? <p style={{color:'red',textAlign:'center'}}>{errors.general}</p> : null}
            <small className="toSignup">
                Don't have an account
                <Link to="/signup"><a> Signup now</a></Link>
            </small>
         </form>
    </Card >
  );
}

export default Login