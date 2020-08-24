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
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 900,
        marginTop: 20,
        marginLeft: "10%",
        marginRight: "10%",
        textAlign:'left'
      },
      media: {
        height: 400,
        width: '100%'
      },
    content:{
        marginTop: -20
    }
  }));

function PostSkeleton() {
    const classes = useStyles();
    return (
        <div>
            {
                Array.from({ length: 5}).map((item, index)=>(
                    <Card className={classes.root} key={index}>
                        <CardHeader
                            avatar={
                                <Skeleton animation="wave" variant="circle" width={40} height={40} />
                            }
                            action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                            }
                            title={
                                <Skeleton animation="wave" height={10} width="30%" className={classes.handle} />
                            }
                        />
                        <Skeleton animation="wave" variant="rect" className={classes.media} />
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
                        <CardContent className={classes.content}>
                            <React.Fragment>
                                <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                <Skeleton animation="wave" height={10} width="80%" />
                            </React.Fragment>
                        </CardContent>
                    </Card>
                ))
            }
        </div>
    )
}

export default PostSkeleton
