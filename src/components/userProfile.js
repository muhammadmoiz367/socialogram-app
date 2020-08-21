import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';
import {getSpecificUser} from '../actions/authUserActions'

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: '3%',
        marginTop: '15%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        width: '90%',
      },
      icon: {
        color: 'rgba(255, 255, 255, 0.54)',
      },
    avatar: {
        marginLeft: "100%",
        marginTop: "8%",
        height: 100,
        width: 100
    },
    handle: { 
        marginTop:'8%',
        fontWeight: '500',
        marginLeft: '-25%',
        fontSize: '20px'
    },
    intro: {
        marginTop: '3%',
    }
}));

function UserProfile(props) {
    const classes = useStyles();

    useEffect(() => {
        props.dispatch(getSpecificUser(props.handle))
        console.log(props.user)        
    }, [])

    return (
        <div className="timeline">
            { Object.keys(props.user).length===0
            ? ( <p>Loading user...</p> )
            : (
                <Grid container spacing={0} >
                    <Grid item sm={4} xs={12}>
                        <Avatar
                            alt={props.user.handle}
                            src={props.user.imageUrl}
                            className={classes.avatar}
                        />
                    </Grid>
                    <Grid item sm={8} xs={12}>
                        <div>
                            <Typography variant="body1" color="textSecondary" component="p" className={classes.handle}>
                                {props.user.handle}
                            </Typography>
                            {props.user.bio && (
                                <Typography variant="body1" color="textPrimary" component="p" className={classes.intro}>
                                    {props.user.bio}
                                </Typography>
                            )}
                        </div>
                    </Grid>
                    {props.user.posts && (
                        <div className={classes.root}>
                            <GridList cellHeight={240} className={classes.gridList} cols={3}>
                                {props.user.posts.map((post)=>(
                                    <GridListTile key={post.postId}>
                                        <img src={post.postImage} alt={post.postId} />
                                        <GridListTileBar
                                            title={post.body}
                                            actionIcon={
                                                <IconButton aria-label={`info about post`} className={classes.icon}>
                                                    <InfoIcon />
                                                </IconButton>
                                            }
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </div>
                    )}
                </Grid>
                )
            }
        </div>
    )
}

const mapStateToProps = ({user})=>{
    return{
        user: user.specificUser
    }
}

export default connect(mapStateToProps)(UserProfile)
