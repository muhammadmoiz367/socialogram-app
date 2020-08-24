import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    
    root: {
        maxWidth: 900,
        height: 505,
        marginTop: '11%',
        textAlign:'left',
        marginRight: '5%',
        marginLeft: '2px'
    },
    rootExpand: {
        maxWidth: 1000,
        margin: '8% 0%',
        marginLeft: '5%'
    },
    mediaExpand: {
        height: 505,
        width: '100%'
    },
      usersAvatar: {
        height: 30,
        width: 30,
    },
    content:{
        marginTop: -20
    },
    separator:{
        borderBottom: '2px solid lightgray'
    },
    date: {
        marginLeft: 20,
        marginBottom: 10
    }
  }));

function RepliesPageSkeleton() {
    const classes = useStyles();
    return (
        <div>
            <Grid container spacing={0}>
                <Grid item sm={7} xs={12}>
                    <Card  className={classes.rootExpand}>
                        <Skeleton animation="wave" variant="rect" className={classes.mediaExpand} />
                    </Card>
                </Grid>
                <Grid item sm={5} xs={12}>
                    <Card  className={classes.root}>
                        <CardHeader
                            className={classes.separator}
                            avatar={
                                <Skeleton animation="wave" variant="circle" className={classes.avatar} />
                            }
                            action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                            }
                            title={
                                <Skeleton animation="wave" height={10} width="50%" />
                            }
                        />
                        <ListItem >
                            <ListItemAvatar>
                                <Skeleton animation="wave" variant="circle" className={classes.usersAvatar} />
                            </ListItemAvatar>
                            <Skeleton animation="wave" height={20} width="80%" />
                        </ListItem>                            
                        <div className="replies-box">
                            {Array.from({ length: 4}).map((item, index)=>(
                                <ListItem key={index}>
                                <ListItemAvatar>
                                    <Skeleton animation="wave" variant="circle" className={classes.usersAvatar} />
                                </ListItemAvatar>
                                <Skeleton animation="wave" height={20} width="80%" />
                            </ListItem>
                            )
                            )}
                        </div>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteBorderOutlinedIcon />
                            </IconButton>
                            <span>{null}</span>
                            <IconButton aria-label="share">
                                <QuestionAnswerOutlinedIcon />
                            </IconButton>
                            <span>{null}</span>
                        </CardActions>
                        <Skeleton animation="wave" height={10} width="80%" className={classes.date}/>
                        <div className="comment-box">
                            <TextField style={{marginLeft: '5%', width: "80%"}} label="Comment" />
                            <SendIcon style={{color:'rgb(228,64,95)', marginTop: '5%', marginLeft: '2%'}}  />
                        </div>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default RepliesPageSkeleton
