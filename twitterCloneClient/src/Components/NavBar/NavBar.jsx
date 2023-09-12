import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './navBar.css'
import SideBar from '../SideBar/SideBar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { setUsers } from '../../redux/reducers';

const NavBar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userName = useSelector(state => state.user.userName)
    const [isSideBarShow, setIsSideBarShow] = useState(false)

    const handleLogOut = () => {
        Cookies.remove("userToken");
        dispatch(setUsers({}));
        navigate(`/`);
    }

    return (
        <div className='navBarContainer'>
            <div>
                <div className='isSideBarShownbutton' onClick={() => setIsSideBarShow(!isSideBarShow)}>{isSideBarShow ? <span>&times;</span> : <span>&equiv;</span>} </div>

            </div>
            {
                isSideBarShow && <div className="isSideBarShown">
                    <SideBar />
                </div>
            }

            <div className='appName'>
                Twits
            </div>
            <div className='userName'>
                <div>
                    <AccountCircleIcon />
                </div>
                <div>
                    {`${userName}`}

                </div>
                <div className='logout' onClick={() => handleLogOut()}>
                    LogOut
                </div>
            </div>
        </div>
    )
}

export default NavBar