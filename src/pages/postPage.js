import React from 'react'
import {connect} from 'react-redux'
import {withRouter, useLocation} from 'react-router-dom'
import Navbar from '../components/navbar'
import Post from '../components/post'

function PostPage(props) {
    console.log(props);
    const location=useLocation();
    console.log(location.state.post);
    return (
        <div className="timeline">
            <Navbar />
            <Post id={location.state.id} />
        </div>
    )
}

const mapStateToProps=(props)=>{

    return{

    }
}

export default connect(mapStateToProps)(PostPage)
