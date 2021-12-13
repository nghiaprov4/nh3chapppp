import "./sidebar.css";
import {
  RssFeed,
  Chat,
 
  Group,
  
  HelpOutline,
 
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Sidebar() {
  const { user } = useContext(AuthContext);
  
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">

        <Link to="/" style={{ textDecoration: "none" }}>
        <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Trang Chủ</span>
          </li>
          </Link>
          <Link to={`/profile/${user.username}`} style={{ textDecoration: "none" }}>
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Trang cá nhân</span>
          </li>
          </Link>

          <Link to="/messenger" style={{ textDecoration: "none" }}>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Tin nhắn</span>
          </li>
          </Link>
          
          
          <Link to="/" style={{ textDecoration: "none" }}>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Trợ giúp</span>
          </li>
          </Link>
          
         
        </ul>
        
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          
            {/* {Users.map((u) => (
              <CloseFriend key={u.id} user={u} />
              
            ))} */}
         
          
        </ul>
      </div>
    </div>
  );
}
