import "./closeFriend.css";
import { Link } from "react-router-dom";

export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={PF+user.profilePicture} alt="" />
      
            <span className="sidebarFriendName">
            <Link to={'/profile/${user.username}'}>
                {user.username}
            </Link>
            </span>
   
      
    </li>
  );
}
