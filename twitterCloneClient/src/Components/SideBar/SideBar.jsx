import React from "react";
import "./sideBar.css";
import { useNavigate } from "react-router-dom";

const SideBar = () => {

  const navigate = useNavigate()
  
  const hadleHomePageButton=()=>{
    navigate('/home')
  }
  const hadleProfilePageButton=()=>{
    navigate('/profile')
  }
  return (
    <div className="sideBar">
      <div onClick={()=>hadleHomePageButton()}>Home</div>
      <div onClick={()=>hadleProfilePageButton()}>Profile</div>
    </div>
  );
};

export default SideBar;
