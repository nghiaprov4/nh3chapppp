
import React, {useState,useContext,useRef} from 'react'
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import {showErrMsg} from '../../pages/messenger/Notification'


export default function Login() {
  const email = useRef();
  const password = useRef();

  const initialState = {
    err: '',
  }
  const { isFetching, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState(initialState);
  const { err} = user;
  const handleChangeInput = e => {
    const {name, value} = e.target
    setUser({err: ''})
}

  const handleClick = (e) => {
    e.preventDefault();
   
      
        loginCall(
          { email: email.current.value, password: password.current.value },
          dispatch
        );



   
  };
  // responseGoogle = (e)=>{
  //   console.log(e);
  // }
  

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">NH3</h3>
          <span className="loginDesc">
          Kết nối với bạn bè và thế giới xung quanh bạn trên NH3
          </span>
        </div>
        <div className="loginRight">
          {err && showErrMsg(err)}
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
              onChange={handleChangeInput}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
              onChange={handleChangeInput}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Đăng nhập"
              )}
            </button>
           
            <Link to="/register" style={{ textDecoration: "none" }}>
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Tạo tài khoản mới"
              )}
            </button>
            </Link>
           {/* <GoogleLogin  
            clientId="862778676575-hcsahb23fbibrpc20n7h8r8p5lo9crig.apps.googleusercontent.com"
            buttonText="Login With Google" 
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
            > 
             
            </GoogleLogin> */}
           

          </form>
        </div>
      </div>
    </div>
  );
}
