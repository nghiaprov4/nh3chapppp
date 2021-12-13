import "./profile.css";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import EditProfile from "./editProfile";
import {useSelector, useDispatch} from 'react-redux'
import { GLOBALTYPES } from "./globalTypes";
import { useEffect, useState,useRef } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import {avatarUpload} from "../messenger/imageUpload";
import { imageShow1 } from "../../pages/messenger/mediaShow";
import {
  PermMedia,Cancel,CameraAlt,SystemUpdate
} from "@material-ui/icons";


export default function Profile() {


  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState(false)
  const username = useParams().username;
  const [file1, setFile1] = useState(null);
  const profilePicture = useRef();

  const [loading, setLoading] = useState(false)
  const history=useHistory();
  const [text, setText] = useState('')
  const [media, setMedia] = useState([])
  const [loadMedia, setLoadMedia] = useState(false)
  const refDisplay = useRef()
  
  // const token = useSelector(state => state.token)
    //const [post, setPost] = useState({});
  const [onEdit, setOnEdit] = useState(false)

  
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const submitHandler1 = async (e) => {
    e.preventDefault();
    const newUser = {
      profilePicture:user.profilePicture
    
    };
    if (file1) {
      const data = new FormData();
     const fileName = Date.now() + file1.name;
      data.append("name", fileName);
      data.append("file1", file1);
      newUser.profilePicture = fileName;
      console.log(newUser);
      window.confirm("dddd")
      try {
        await axios.post("/upload", data);
       
      } catch (err) {}
    }
    try {
      await axios.post("/users", newUser);
      window.location.reload();
     
    } catch (err) {}
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if(!text.trim() && media.length === 0) return;
  
    setMedia([])
    setLoadMedia(true)
    let newArr = "";
    if(media.length > 0) {
      newArr = await avatarUpload(media)}
    if (newArr) {
       
        const user1 = {
          userId: user._id,
          profilePicture: newArr,
          username: username.name
        };
  
        console.log(user._id);
        console.log(profilePicture);
        console.log(username);
        try {
          await axios.put(`/users/${user._id}`, user1);
        } catch (err) {}
    }
      
    setLoadMedia(false)
    if(refDisplay.current){
      refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})}
  }

  const handleChangeAvatar = (e) => {
    const files = [...e.target.files]
    let err = ""
    let newMedia = []

    files.forEach(file => {
        if(!file) return err = "File does not exist."

        if(file.size > 1024 * 1024 * 5){
            return err = "The image/video largest is 5mb."
        }

        return newMedia.push(file)
    })

    // if(err) dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err} })
    setMedia([...media, ...newMedia])
  }
  
 
  
//   const changeAvatar = async(e) => {
    
//     e.preventDefault()
//     try {
//       const file = [...e.target.file]

//         if(!file) return setData({data, err: "No files were uploaded." , success: ''})

//         if(file.size > 1024 * 1024)
//             return setData({data, err: "Size too large." , success: ''})

//         if(file.type !== 'image/jpeg' && file.type !== 'image/png')
//             return setData({data, err: "File format is incorrect." , success: ''})

//         let formData =  new FormData()
//         formData.append('file', file)

//         setLoading(true)
//         const res = await axios.post('/upload_avatar', formData, {
//             headers: {'content-type': 'multipart/form-data'}
//         })

//         setLoading(false)
//         setAvatar(res.data.url)
        
//     } catch (err) {
//         setData({data, err: "Không tìm thấy lỗi" , success: ''})
//     }
// }

//   useEffect(() => {
//     if(  onEdit){
//         dispatch({ type: GLOBALTYPES.MODAL, payload: true})
//     }else{
//         dispatch({ type: GLOBALTYPES.MODAL, payload: false})
//     }
// },[ onEdit])

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <div className="avatar" >
              {
                        user.profilePicture?.map((item, index) => (
                            <div key={index}>
                                {
                                   
                                    imageShow1(item.url)
                                }
                            </div>
                        ))
                    }
              
                
             {/*              
              <img 
               
               src={
                "user.profilePicture.Object([0])"
               }
               alt=""
             />  */}
                <span>
                        <CameraAlt/>
                        <p>Change</p>
                        <input type="file" name="file" id="file_up" onChange={handleChangeAvatar} />
                    </span>
                    
              </div>
              {/* <button className="chatSubmitButton" onClick={handleSubmit}>
                    Cập nhật
                  </button> */}
                  <div className="postTopRight"> 
                  <SystemUpdate className="" onClick={(handleSubmit)} />
                  <span class="tooltiptext">Lưu</span>
                  </div>
              
              
              {file1 && (
          <div className="shareImgContainer">
            <img className="" src={URL.createObjectURL(file1)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile1(null)} />
          </div>
        )}
              
          
          <div className="info_container" key={user._id}>
        <div className="info_content_title">                            
                                {
                                     <button className="btn btn-outline-info"
                                    onClick={() => setOnEdit(true)}>
                                        Edit Profile
                                    </button>                          
                                }                                                          
                            </div>
            </div>
            </div>
            {
                            onEdit && <EditProfile setOnEdit={setOnEdit} />
                        }

          

            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
