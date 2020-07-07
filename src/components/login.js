import React from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
const useStyles = makeStyles(theme=>({
  root: {
    paddingLeft:100,
    paddingRight:110,
    paddingTop:100,
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
  }
}));

function Login() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        email:'',
        password: '',
        showPassword: false,
        complete:false
      });

      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setValues({...values, complete: true})
      };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };

      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      const handleSubmit=(event)=>{
          event.preventDefault();
          console.log(values);
      }
  return (
    <Card className={classes.root} >
         <form className={classes.form} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Email" variant="outlined" value={values.email} onChange={handleChange('email')}/><br /><br />
            <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel className={classes.label} htmlFor="standard-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="standard-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
            </FormControl>
            <Button
                disabled={!values.complete}
                onClick={handleSubmit}
                variant="contained"
                style={{backgroundColor:'rgb(228,64,95)',color:'white'}}
                className={classes.button}
            >
                Login
            </Button>
            <p id="toSignup">
                Don't have an account
                <Link to="/signup"><a> Signup now</a></Link>
            </p>
         </form>
    </Card >
  );
}

export default Login