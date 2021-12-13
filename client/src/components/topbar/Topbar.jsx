import "./topbar.css";
import React, { useState, useContext } from "react";

import { Search, ExitToApp, Backspace, Delete } from "@material-ui/icons";
import { Link, Redirect } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history = useHistory();
  const [search, setSearch] = useState("");
  const dangx = () => {
    try {
      window.confirm("Bạn có chắc đăng xuất không ?");
    } catch (err) {}
  };
  const deleteHandler = () => {
    try {
      if (window.confirm("Bạn có chắc muốn xóa Tài Khoản này không?")) {
        axios.delete(`/users/${user._id}`);
        return history.push(`/login`);
      }
    } catch (err) {}
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img className="topbarImg2" src="../assets/logo.png" alt="" />
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Link to={`/profile/${search}`}>
            <Search className="searchIcon" />
          </Link>

          <input
            placeholder="Tìm kiếm bạn bè "
            className="searchInput"
            name="sname"
            value={search}
            onChange={(e) => setSearch(e.target.value.replace(/ /g, ""))}
            id="Search"
          />
        </div>
      </div>
      <div className="topbarRight"></div>
      {/* <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <Link to="/messenger" style={{ textDecoration: "none" }}>
          <div className="topbarIconItem">
            <Chat />
            
            <span className="topbarIconBadge"></span>
     
            
          </div>
          </Link>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div> */}

      <Link to={`/profile/${user.username}`}>
        <div className="topbarImg">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <span class="tooltiptext2">Trang cá nhân</span>
        </div>
      </Link>

      <Link to="/logout">
        <div className="logout">
          <ExitToApp fontSize="50px" onClick={dangx} />
          <span class="tooltiptext1">Đăng xuất</span>
        </div>
      </Link>
      <div className="logout">
        <Delete fontSize="50px" onClick={deleteHandler} />
        <span class="tooltiptext">Xóa Tài Khoản</span>
      </div>
    </div>
  );
}
