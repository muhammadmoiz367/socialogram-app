import React from 'react'

function UserProfile(props) {
    return (
        <div className="timeline">
            {props.handle}
        </div>
    )
}

export default UserProfile
