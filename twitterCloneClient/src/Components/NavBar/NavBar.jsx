import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './navBar.css'
import SideBar from '../SideBar/SideBar';
const NavBar = () => {
    const userName = useSelector(state => state.user.userName)

    const [isSideBarShow, setIsSideBarShow] = useState(false)
    return (
        <div className='navBarContainer'>
            <div className='isSideBarShownbutton' onClick={()=>setIsSideBarShow(!isSideBarShow)}>{isSideBarShow ? <span>&times;</span>:<span>&equiv;</span>} </div>

            {

                isSideBarShow && <div className="isSideBarShown">
                    <SideBar />
                </div>
            }
            <div className='appName'>
                TwitterCLone
            </div>
            <div className='userName'>
                <div>
                    <AccountCircleIcon />
                </div>
                <div>
                    {`${userName}`}

                </div>
            </div>
        </div>
    )
}

export default NavBar