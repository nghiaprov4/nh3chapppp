import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";
import {
  PermMedia,Delete

} from "@material-ui/icons";
import { useHistory } from "react-router-dom";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const history=useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  const handleDeleteConversation = () => {
    try{
      if (window.confirm("Bạn có chắc muốn xóa cuộc trò chuyện này không ?")) {
      
        axios.delete(`/conversations/${conversation._id}`);
        var child = document.getElementById("conver");
  
        // Remove the child element from the document
        child.parentNode.removeChild(child);
        return history.push("/messenger");
      }
    }catch{
     
    }

  }


  return (
    <div className="conversation" id="conver">
      <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
      <Delete htmlColor="tomato" onClick={handleDeleteConversation} alt="" className="deleteconver"/> 
    </div>
  );
}
