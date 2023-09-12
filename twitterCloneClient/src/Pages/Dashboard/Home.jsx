import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import "./home.css";
import { baseUrl, getAllPostApi, getFollowerFollowingList, handleFollowUnFollowApi } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Cookies from "js-cookie";
import { setFollwersFollowings } from "../../redux/reducers";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ModeCommentIcon from '@mui/icons-material/ModeComment';

const Home = () => {

  const navigate=useNavigate();
  const cookie = Cookies.get("userToken")
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [isProgressBarShow, setIsProgressBar] = useState(false)
  const [data, setData] = useState([]);
  var [response,setResponse] =useState({})
  const [followerFollowing, setFollowerFollowing] = useState({
    followers: [],
    following: []
  })

  const getApiAlllBlogData = async () => {
    const res = await getAllPostApi({ "userName": user.userName, "token": user.token })
    setData(res);
  };

  const handleFollowerFollowingList = async () => {
    const response = await getFollowerFollowingList({ userName: user.userName, cookie })
    dispatch(setFollwersFollowings(response))
    setResponse(response)
    setIsProgressBar(false)
  }

  const handleFollowUnfollow = async (details) => {
    setIsProgressBar(true)
    const res = handleFollowUnFollowApi({ ...details, followingName: details.userName, userName: user.userName })
    handleFollowerFollowingList();
  }

  const navigateToLink=(id)=>{
    navigate(`/post/${id}`)
  }

  useEffect(()=>{
    setFollowerFollowing(response);
  },[response])

  useEffect(() => {
    getApiAlllBlogData();
    handleFollowerFollowingList();
  }, []);

  return (
    <>
      <div className="homePage">
      <div className="sidebar">
          <SideBar />
        </div>
        {isProgressBarShow && <div className="modal-overlay">
          <div className="modal-content">
            <CircularProgress />
          </div>
        </div>}

        <div className="homeView">
          {data && data.map((items) => {

            var isFollow = false;
            if (followerFollowing.following && followerFollowing.following.find(user => user == items.userName)) {
              isFollow = true
            } else isFollow = false
            return (
              <div className="myPostsCard">
                <div className="myPostsCardHeader">
                  <div style={{ display: "flex", alignItems: "center" }}><AccountCircleIcon />  {items?.userName}</div>
                  <div className="followUnfollow">
                    <div>{isFollow ? "Following" : ""}</div>
                    <div className="followUnfollowButton" onClick={() => handleFollowUnfollow({ ...items, isFollow })}>{isFollow ? "UnFollow" : "Follow"}</div>
                  </div>
                </div>
                  <div  onClick={()=>navigateToLink(items._id)}>
                    <div className="cardInfo">
                      <div className="titleCardInfo">{items?.title}</div>
                      <div className="descriptionsCardInfo">{items?.description}</div>

                      <img className="image" src={`${baseUrl}/${items?.image}`} />
                    </div>
                    <div className="commentss">
                      <ModeCommentIcon />  {` Comments`}
                    </div>
                  </div>
              </div>
            )
          }).reverse()
          }
        </div>
      </div>
    </>
  );
};

export default Home;
