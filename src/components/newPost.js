import React,{useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {firebaseConfig} from '../firebase/firebase';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import TextFieldsRoundedIcon from '@material-ui/icons/TextFieldsRounded';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ImageForm from '../components/imageForm'
import TextForm from '../components/textForm'
import {createPost} from '../actions/dataActions'

const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    completed: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
    },
  })(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#fff',
      width: 50,
      height: 50,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
  });


function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <ImageRoundedIcon />,
    2: <TextFieldsRoundedIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

function getSteps() {
  return ['Select picture', 'Write caption', 'Create post'];
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));


function NewPost(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const [image, setImage] = useState('')
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')

  function handleImageChange(image, url){
    setImage(image);
    setUrl(url);
  }
  function handleTextChange(text){
    setText(text)
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (<ImageForm onHandleImageChange={handleImageChange}/>);
      case 1:
        return (<TextForm onHandleTextChange={handleTextChange} />);
      case 2:
        return (<div>
          <img src={url} alt={image} style={{display: 'block' }} className="uploadedImage" />
          <p>{text}</p>
        </div>);
      default:
        return 'Unknown step';
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleSubmitPost=()=>{
    const newPostData={
      body: text,
      userHandle: props.user.credentials.handle,
      userImage: props.user.credentials.imageUrl,
      createdAt: new Date().toISOString(),
      postImage: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/postImages%2F${image}?alt=media`,
      likeCount: 0,
      commentCount: 0
    }
    props.dispatch(createPost(newPostData, props.history))
  }

  return (
    <div className={classes.root} className="timeline">

      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        {activeStep === steps.length
        ? handleSubmitPost()
        : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button} >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                style={{backgroundColor:'rgb(228,64,95)'}}

              >
                {activeStep === steps.length - 1 ? 'Post' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps=({user})=>{
  return{
    user
  }
}

export default withRouter(connect(mapStateToProps)(NewPost))