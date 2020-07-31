import React from 'react'
import {withRouter, useLocation} from 'react-router-dom'
import Navbar from '../components/navbar'
import UserProfile from '../components/userProfile'

function Profile() {
    const location=useLocation();
    console.log(location.state.handle);
    return (
        <div>
            <Navbar />
            <UserProfile handle={location.state.handle}/>
        </div>
    )
}

export default Profile
