import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
//material UI imports
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {signOut} from '../actions/authUserActions'
import Notifications from './notifications'



const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'block',
    marginLeft: theme.spacing(8)
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },

  
  smaller: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginLeft: 10,
    marginRight: 12
  },
  small: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    marginTop: 9,
    marginLeft: 15
  },

}));

function Navbar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleSignOut=()=>{
    props.dispatch(signOut())
  }
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className="logoutDropdown"
    >
      <MenuItem onClick={handleSignOut}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem >
        <IconButton aria-label="Home" color="inherit">
          <HomeIcon />
        </IconButton>
        <Link to="/" >
          <p>Home</p>
        </Link>
      </MenuItem>
      <MenuItem>
        <Notifications color="black" />
        <p>Notifications</p>
      </MenuItem>
      <MenuItem >
        <Avatar alt="Remy Sharp" src={props.user.credentials.imageUrl} className={classes.smaller} />
        <Link to={{pathname: `/user/${props.user.credentials.handle}`, state: {handle: props.user.credentials.handle} }}>
          <p>Profile</p>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleSignOut}>
        <IconButton
          aria-label="account of logout user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" style={{backgroundColor:'rgb(228,64,95)'}}>
        <Toolbar>
        
          <Link to="/">
            <Typography className={classes.title} variant="h6" noWrap id="appName" style={{color:'white'}}>
              Socialogram
            </Typography>
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          
            <IconButton aria-label="Home" color="inherit">
            <Link to="/" >
              <HomeIcon style={{color:'white'}} />
            </Link>  
            </IconButton>
            <Notifications color="white" />
            <Link to={{pathname: `/user/${props.user.credentials.handle}`, state: {handle: props.user.credentials.handle} }}>
              <Avatar alt="Remy Sharp" src={props.user.credentials.imageUrl} className={classes.small}/>
            </Link>
            <IconButton>
              <ArrowDropDownIcon style={{color:'white'}} onClick={handleProfileMenuOpen} />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

const mapStateToProps=({user})=>{
  return{
    user
  }
}

export default connect(mapStateToProps)(Navbar)