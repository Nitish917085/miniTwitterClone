import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import "./postDashBoard.css";
import { baseUrl, getAllPostApi, getFollowerFollowingList, getPostIdDetailsApi, handleFollowUnFollowApi, sendCommentApi } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Cookies from "js-cookie";
import { setFollwersFollowings } from "../../redux/reducers";
import { useLocation } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const PostDashBoard = () => {

  const path = useLocation()

  const postId = path.pathname.split('/')

  const cookie = Cookies.get("userToken")
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const storefollowerFollowing = useSelector((state) => state.followerFollowingList)

  const storeuser = useSelector((state) => console.log("storeFl", storefollowerFollowing.following))

  const [comment, setComment] = useState("")
  const [isProgressBarShow, setIsProgressBar] = useState(false)
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([])

  const getPostIdDetails = async () => {
    const res = await getPostIdDetailsApi({ "postId": postId[2], "token": user.token })
    console.log("up", res.comments)
    setData(res);
  };

  const handelSendComment = async () => {
    console.log("senc", user)
    const res = await sendCommentApi({ postId: postId[2], comment, userName: user.userName })
    getPostIdDetails();
  }

  useEffect(() => {
    getPostIdDetails();
  }, []);

  return (
    <>
      <div className="profile">
      <div className="sidebar">
          <SideBar />
        </div>
        {isProgressBarShow && <div className="modal-overlay">
          <div className="modal-content">
            <CircularProgress />
          </div>
        </div>}

        <div className="commentView">
          <div className="postCardComment">
            <div className="myPostsCardHeader">
     
              <div><AccountCircleIcon/> {data?.userName}</div>
              <div className="followUnfollow">
                {/* <div>{isFollow ? "Following" : ""}</div> */}
                {/* <div className="followUnfollowButton" onClick={() => handleFollowUnfollow({ ...items, isFollow })}>{isFollow ? "UnFollow" : "Follow"}</div> */}
              </div>
            </div>

            <div>
              <h3 className="title">{data?.title }</h3>
              <div className="description">{data?.description}</div>
              <img className="image" src={`${baseUrl}/${data?.image}`} />
            </div>
          </div>
          <div className="replyCommentCard" >
            <input className="replyComment" value={comment} onChange={(e) => setComment(e.target.value)} type="text" placeholder="comment" />
            <div className="sendIcon" onClick={(e) => handelSendComment(e.target.value)}>
              <SendIcon />
            </div>
          </div>
          <div className="commentsContainer">
            {data.comments && data.comments.map((items) => {
              return (
                <div className="commentsCard">
                  <div className="commentPoster"><AccountCircleIcon /> {items.userName ? items.userName : "Anonymous"}</div>
                  <div>{items.description}</div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </>
  );
};

export default PostDashBoard;
