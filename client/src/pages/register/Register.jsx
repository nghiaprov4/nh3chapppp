import axios from "axios";
import { useRef,useContext } from "react";
import "./register.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { registerCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

export default function Register() {
  const username = useRef();
  const city=useRef();
  const email = useRef();
  const quoctich = useRef();
  const password = useRef();
  const passwordAgain = useRef(); 
  const history = useHistory();
  const quanhe=useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Mật khẩu không khớp!");
    } else { 
     
      try {
        registerCall({username: username.current.value,
          city:city.current.value,
          quoctich:quoctich.current.value,
          quanhe:quanhe.current.value,
          email: email.current.value,
          password: password.current.value},dispatch)
       
        
        //history.push("/login");
      } catch (err) {
        console.log(err);
      }
      
    }
    
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">NH3</h3>
          <span className="loginDesc">
          Kết nối với bạn bè và thế giới xung quanh bạn trên NH3.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox1" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Địa Chỉ"
              required
              ref={city}
              className="loginInput"
            />
             <input
              placeholder="Giới tính"
              required
              ref={quoctich}
              className="loginInput"
            />
             <input
              placeholder="Ngày sinh"
              required
              ref={quanhe}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
            Đăng ký
            </button>
            <Link to="/login" style={{ textDecoration: "none" }} >
            <button className="loginRegisterButton">Đăng nhập vào tài khoản</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
