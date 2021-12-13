import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const dangx = () =>{
    try{
    window.confirm("Bạn có chắc đăng xuất không ?")
      
      
    }catch(err){

    }
  }
  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
       
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
        
          <span className="birthdayText">
            
          </span>
        </div>
        <img className="rightbarAd" src="assets/logo.png" alt="" />
      
        <ul className="rightbarFriendList">
          {/* {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))} */}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">Thông tin cá nhân</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Địa chỉ :</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Giới tính :</span>
            <span className="rightbarInfoValue">{user.quoctich}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Ngày Sinh :</span>
            <span className="rightbarInfoValue">
             {user.quanhe}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">Bạn bè của bạn</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
        <div>
          {/* <Link to="/logout">
            <button  class="btnDangXuat" onClick={dangx}>Đăng xuất</button> 
          </Link> */}
                  

        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
