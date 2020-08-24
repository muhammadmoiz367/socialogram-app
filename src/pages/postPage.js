import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {useLocation} from 'react-router-dom'
import Navbar from '../components/navbar'
import RepliesPage from '../components/repliesPage'

function PostPage(props) {
    const location=useLocation();
    return (
        <div className="timeline">
            <Navbar />
            <RepliesPage id={location.state.id} />
        </div>
    )
}


export default withRouter(connect()(PostPage))
