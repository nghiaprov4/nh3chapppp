import "./message.css";
import { format } from "timeago.js";
import { imageShow } from "../../pages/messenger/mediaShow";
import Topbar from "../topbar/Topbar";
import { useParams } from "react-router";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Feed from "../feed/Feed";
import { AuthContext } from "../../context/AuthContext";
import {
  PermMedia,Delete

} from "@material-ui/icons";
import { useHistory } from "react-router-dom";
export default function Message({ message, own,username}) {
  const [posts, setPosts] = useState([]);
  const history=useHistory();
  const { user } = useContext(AuthContext);
  const handleDeletemess = () => {
    try{
      if (window.confirm("Bạn có chắc muốn xóa dòng tin nhắn này không ?")) {
      
      axios.delete(`/messages/${message._id}`);
      return history.push("/messenger");
      }
    }catch{

    }

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/" + user._id);
    };
    fetchPosts();
  }, [username, user._id]);
  return (
    <div>
      {/* <div className="infmess">
      <div className="profileInfoName">{user.username}</div>

      </div> */}
      
    <div className={own ? "message own" : "message"}>
      
      <div className="messageTop">
      {/* <div className="profileInfoName">{user.username}</div> */}
        <img
          className="messageImg"
          src="https://res.cloudinary.com/hocnguyen08/image/upload/v1636209348/imgzalo/logo_fbhg8m.png"
         
          alt=""
        />
              {/* <h4 className="profileInfoName">{user.username}</h4> */}
            
            
        {/* <Topbar src={user.username}/> */}
        <div>      
            <p className="messageText">{message.text}</p>
     
        <div className="messageImg2">
        {
                        message.media.map((item, index) => (
                            <div key={index}>
                                {
                                   
                                    imageShow(item.url)
                                }
                            </div>
                        ))
                    }
        </div>
        <Delete htmlColor="tomato" onClick={handleDeletemess} alt="" className=""/> 
        </div>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    
    </div>
    </div>
  );
}
