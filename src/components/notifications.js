import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// MUI stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../actions/authUserActions';

function Notifications(props){
    const [anchorEl, setAnchorEl]=useState(null)
    
    const handleOpen = (event) => {
        setAnchorEl(event.target)
    };
    const handleClose = () => {
        setAnchorEl(null)
    };
    const onMenuOpened = () => {
        let unreadNotificationsIds = props.notifications.filter((notification) => !notification.read).map((notification) => notification.notificationId);
        console.log(unreadNotificationsIds)
        props.dispatch(markNotificationsRead(unreadNotificationsIds));
    };

    dayjs.extend(relativeTime);

    let notificationsIcon;
    if (props.notifications && props.notifications.length > 0) {
      props.notifications.filter((not) => not.read === false).length > 0
        ? (notificationsIcon = (
            <Badge
              badgeContent={
                props.notifications.filter((not) => not.read === false).length
              }
              color="secondary"
            >
              <NotificationsIcon style={{color: props.color}} />
            </Badge>
          ))
        : (notificationsIcon = <NotificationsIcon style={{color:"white"}} />);
    } else {
      notificationsIcon = <NotificationsIcon style={{color:"white"}} />;
    }
    let notificationsMarkup =
      props.notifications && props.notifications.length > 0 ? (
        props.notifications.map((not) => {
          const verb = not.type === 'like' ? 'liked' : 'commented on';
          const time = dayjs(not.createdAt).fromNow();
          const iconColor = not.read ? 'primary' : 'secondary';
          const icon =
            not.type === 'like' ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );

          return (
            <MenuItem key={not.createdAt} onClick={handleClose}>
              {icon}
              <Link to={{pathname: `/post/${not.postId}`, state: {id: not.postId} }}>
                <Typography
                    component="p"
                    color="default"
                    variant="body1"
                >
                    {not.sender} {verb} your post {time}
                </Typography>
              </Link>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={handleClose}>
          You have no notifications yet
        </MenuItem>
      );
    return(
        <Fragment>
        <Tooltip placement="top" title="Notifications">
            <IconButton
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={handleOpen}
            >
            {notificationsIcon}
            </IconButton>
        </Tooltip>
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onExit={onMenuOpened}
        >
            {notificationsMarkup}
        </Menu>
        </Fragment>
    );
}

const mapStateToProps = ({user}) => ({
  notifications: user.notifications
});

export default connect(mapStateToProps)(Notifications);