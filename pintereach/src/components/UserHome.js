import React from 'react'
import UserNav from './UserNav.js' 
import UserCarousel from './UserCarousel.js'

import './UserHome.css'

const UserHome = ({addCategory}) => {
    return(
        <div className="dot-grid">
            <UserCarousel/>
            <UserNav/> 
            <h1>Cards render here</h1>
        </div>
    )
}

export default UserHome;