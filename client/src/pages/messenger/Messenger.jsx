import "./messenger.css";

import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import axios from "axios";
import { io } from "socket.io-client";
import { imageUpload } from "./imageUpload";
import { imageShow } from "./mediaShow";
import { GLOBALTYPES } from "./globalTypes";
import LoadIcon from "./loading.gif";
import { PermMedia, Delete } from "@material-ui/icons";

//import conversation from "../../../../api/routes/conversations"

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const [media, setMedia] = useState([]);
  const [loadMedia, setLoadMedia] = useState(false);
  const [text, setText] = useState("");
  const refDisplay = useRef();
  //  const dispatch = useDispatch()
  // const { theme, socket } = useSelector(state => state)

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        media: data.media,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleChangeMedia = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newMedia = [];

    files.forEach((file) => {
      if (!file) return (err = "File does not exist.");

      if (file.size > 1024 * 1024 * 5) {
        return (err = "The image/video largest is 5mb.");
      }

      return newMedia.push(file);
    });

    // if(err) dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err} })
    setMedia([...media, ...newMedia]);
  };
  const handlecreateGroup = async (e) => {
    window.confirm("GR ?");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if(!text.trim() && media.length === 0) return;
    setText("");
    setMedia([]);
    setLoadMedia(true);
    let newArr = [];
    if (media.length > 0) {
      newArr = await imageUpload(media);
    }

    const message = {
      sender: user._id,
      text: newMessage,
      media: newArr,
      conversationId: currentChat._id,
    };
    setLoadMedia(false);
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
      media: newArr,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="">
            <button className="chatMenuInput1" onClick={handlecreateGroup}>
              Tạo nhóm
            </button>
            {/* <a className="chatMenuInput1" data-toggle="modal" data-target="#ff">Home</a> */}
          </div>
          <div className="chatMenuWrapper">
            <input placeholder="Tìm kiếm bạn bè" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>

                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Tin nhắn"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <label htmlFor="file" className="shareOption">
                    <div className="file_upload" htmlFor="file">
                      <PermMedia htmlColor="tomato" className="shareIcon" />

                      <input
                        style={{ display: "none" }}
                        type="file"
                        name="file"
                        id="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleChangeMedia}
                      />
                    </div>
                  </label>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Gửi
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Mở một cuộc trò chuyện để bắt đầu một cuộc trò chuyện.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
