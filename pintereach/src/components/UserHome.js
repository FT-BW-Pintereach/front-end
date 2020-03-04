import React from 'react'
import UserNav from './UserNav.js' 
import UserCarousel from './UserCarousel.js'

const UserHome = ({addCategory}) => {
    return(
        <div>
            <UserCarousel/>
            <UserNav/> 
        </div>
    )
}

export default UserHome;