import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

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
    media: {
        height: 300,
        width: '100%'
    },
    avatar: {
        marginLeft: "100%",
        marginTop: "8%",
        height: 120,
        width: 120
    },
    handle: { 
        marginTop:'8%',
        fontWeight: '500',
        marginLeft: '32%',
        fontSize: '20px',
        marginBottom:'1%'
    },
    intro: {
        textAlign:'left',
        marginLeft:'31%',
        fontSize: '14px'
    }
}));

function UserSkeleton() {
    const classes = useStyles();
    return (
        <div>
            <Grid container spacing={0} >
                <Grid item sm={4} xs={12}>
                    <Skeleton animation="wave" variant="circle" className={classes.avatar}/>
                </Grid>
                <Grid item sm={8} xs={12}>
                    <Skeleton animation="wave" height={20} width="30%" style={{ marginBottom: 10 }} className={classes.handle}/>   
                    <div className={classes.intro}>
                        <Skeleton animation="wave" height={10} width="40%" />
                        <Skeleton animation="wave" height={10} width="80%" />
                        <Skeleton animation="wave" height={10} width="60%" />
                    </div>
                </Grid>
            </Grid>
            
            <div className={classes.root}>
                <GridList cellHeight={240}  className={classes.gridList} cols={3}>
                    {Array.from({ length: 3}).map((item, index)=>(
                        <GridListTile key={index}>
                            <Skeleton animation="wave" variant="rect" className={classes.media} />
                            <GridListTileBar
                                title={(<Skeleton animation="wave" height={10} width="80%" />)}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        </div>
    )
}

export default UserSkeleton
