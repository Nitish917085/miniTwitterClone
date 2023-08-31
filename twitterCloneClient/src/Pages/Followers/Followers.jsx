import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFollwersFollowings } from '../../redux/reducers'
import { getFollowerFollowingList } from '../../services/api'
import Cookies from 'js-cookie'
import './followers.css'
import SideBar from '../../Components/SideBar/SideBar'
const Followers = () => {
    const dispatch = useDispatch()

    const storefollowerFollowing = useSelector((state) => state.followerFollowingList)
    const [followerFollowing, setFollowerFollowing] = useState({
        followers: [],
        following: []
    })
    const user = useSelector((state) => state.user)

    const handleFollowerFollowingList = async () => {
        const cookie = Cookies.get("userToken")
        const response = await getFollowerFollowingList({ userName: user.userName, cookie })
        dispatch(setFollwersFollowings(response))
        setFollowerFollowing(storefollowerFollowing);

    }


    useEffect(() => {
        handleFollowerFollowingList()
    }, [])

    return (
        <div className='follwerContainer'>
            <div className="sidebarFollower">
                <SideBar />
            </div>
            <div className='followers'>
                <div>
                    <h3 >Followers</h3>
                    {followerFollowing.following.map(items => {
                        return (
                            <div className='followersCard'>
                                {items}
                            </div>
                        )
                    })}
                </div>
                <div>
                    <h3>Followings</h3>
                    {followerFollowing.followers.map(items => {
                        return (
                            <div className='followersCard'>
                                {items}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Followers