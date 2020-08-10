import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function TextForm(props) {
  const classes = useStyles();
  const [text, setText] = useState('')
  const handleChange=(e)=>{
    setText(e.target.value)
    props.onHandleTextChange(e.target.value)
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className="formDiv">
        <TextField label="Caption" id="standard-size-normal" value={text} placeholder="Write your caption" onChange={handleChange}/>
      </div>
    </form>
  );
}
