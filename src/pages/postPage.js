import React from 'react'
import {connect} from 'react-redux'
import {useLocation} from 'react-router-dom'
import Navbar from '../components/navbar'
import RepliesPage from '../components/repliesPage'

function PostPage() {

    const location=useLocation();
    console.log(location.state);
    return (
        <div className="timeline">
            <Navbar />
            <RepliesPage id={location.state.id} />
        </div>
    )
}

const mapStateToProps=()=>{
    return{

    }
}

export default connect(mapStateToProps)(PostPage)
