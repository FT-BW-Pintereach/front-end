import React from 'react'
import BoardFormModal from './BoardFormModal.js'
// import UserNav from './UserNav.js' 
// import UserCarousel from './UserCarousel.js'

const UserHome = ({addCategory}) => {
    return(
        <div>
            {/* <UserCarousel/>
            <UserNav />  */}
            <BoardFormModal addCategory={addCategory}/>
        </div>
    )
}

export default UserHome;