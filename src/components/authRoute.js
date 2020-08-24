import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class AuthRoute extends React.Component {
   render() {
    const Component = this.props.component;
    //const isAuthenticated = localStorage.getItem('FBIdToken') 
    return this.props.authenticated ? (
        <Component />
    ) : (
        <Redirect to={{ pathname: '/login' }} />
    );
    }
}

const mapStateToProps=({user})=>{
    return{
        authenticated: user.authenticated
    }
}

export default connect(mapStateToProps)(AuthRoute)