import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles(theme=>({
  root: {
    paddingLeft:100,
    paddingRight:110,
    paddingTop:60,
    paddingBottom:50,
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

function SignUp() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        email:'',
        userHandle:'',
        password: '',
        complete:false
      });

      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setValues({...values, complete: true})
      };
      const handleSubmit=(event)=>{
          event.preventDefault();
          console.log(values);
      }
  return (
    <Card className={classes.root} >
         <form className={classes.form} noValidate autoComplete="off">
         <TextField id="outlined-basic" label="User handle" variant="outlined" value={values.email} onChange={handleChange('userhandle')}/><br /><br />
            <TextField id="outlined-basic" label="Email" variant="outlined" value={values.email} onChange={handleChange('email')}/><br /><br />
            <TextField id="outlined-basic" label="Password" variant="outlined" value={values.email} onChange={handleChange('password')}/><br /><br />
            <Button
                //disabled={!values.complete}
                onClick={handleSubmit}
                variant="contained"
                style={{backgroundColor:'rgb(228,64,95)',color:'white'}}
                className={classes.button}
            >
                Signup
            </Button>
         </form>
    </Card >
  );
}

export default SignUp