import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import "./profile.css";
import axios from "axios";
import { baseUrl, createPostApi, deletePostApi, getAllPostByUserApi, getFollowerFollowingList, updatePostApi } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Cookies from "js-cookie";
import { setFollwersFollowings } from "../../redux/reducers";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const cookie = Cookies.get("userToken")
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const user = useSelector((state) => state.user)
  const followerFollowing = useSelector((state) => state.followerFollowingList)

  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  var [image, setImage] = useState(null);
  const [isAddPost, setIsAddPost] = useState(false)
  const [isAddEdit, setIsAddEdit] = useState(true)
  const [postId, setPostId] = useState(null)


  const getApiAlllBlogDataByUser = async () => {
    console.log(user)
    const res = await getAllPostByUserApi({ "userName": user.userName, "token": user.token })
    setData(res.posts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userName", user.userName)
    formData.append("title", title);
    formData.append("description", description);
    formData.append("imagePath", image.name);
    formData.append("image", image);
    formData.append("cookie", cookie);


    if (isAddEdit) {
      const res = await createPostApi(formData)
    } else {
      formData.append("postId", postId)
      const res = await updatePostApi(formData)
    }
    setIsAddPost(false)
    getApiAlllBlogDataByUser()

  };

  const createPost = () => {
    setIsAddEdit(true)
    setIsAddPost(true)
  };

  const handleDelete = async (details) => {
    const res = await deletePostApi({ ...details, userName: user.userName })
    getApiAlllBlogDataByUser()

  }
  const handleEdit = (details) => {
    setPostId(details._id)
    setTitle(details.title)
    setDescription(details.description)
    setImage({ name: details.image })

    setIsAddEdit(false)
    setIsAddPost(true)

    getApiAlllBlogDataByUser()

  }

  const handleFollowerFollowingList = async () => {
    const response = await getFollowerFollowingList({ userName: user.userName, cookie })
    dispatch(setFollwersFollowings(response))
  }
  const navigateToLink = (id) => {
    navigate(`/post/${id}`)
  }
  useEffect(() => {
    getApiAlllBlogDataByUser();
    handleFollowerFollowingList();

  }, []);

  return (
    <>
      <div className="profile">
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="profileView">
          <button className="createPost" onClick={() => createPost()}>
            {" "}
            + Post
          </button>

          {isAddPost &&
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="closeButton" onClick={() => setIsAddPost(false)}>&times;</div>
                <form className="form" onSubmit={(e) => handleSubmit(e)}>
                  <label>
                    {`Title  :`}
                    <input type='text' value={title} onChange={(e) => setTitle(e.target.value.trim())} />

                  </label>
                  <label>
                    {`Image  :`}

                    <input type='file' name='image' onChange={(e) => setImage(e.target.files[0])} />

                  </label>
                  <label>
                    {`Description : `}
                    <textarea type='text' value={description} onChange={(e) => setDescription(e.target.value)} />

                  </label>
                  <button type='submit'> {`${isAddEdit ? "Add Post" : "Update"}`}</button>
                </form>
              </div>
            </div>}


          {
            data.map((items) => {
              return (
                <div className="myPostsCard">
                  <div className="myPostsCardHeader">

                    <div onClick={() => handleDelete(items)}><DeleteIcon /></div>
                    <div onClick={() => handleEdit(items)}><EditIcon /></div>
                  </div>
                  <div>
                    <div className="titleCardInfo">{items?.title}</div>
                    <div className="descriptionsCardInfo">{items?.description}</div>
                  </div>
                  <div onClick={() => navigateToLink(items._id)}>
                    <img className="image" src={`${baseUrl}/${items?.image}`} />
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

export default Profile;
