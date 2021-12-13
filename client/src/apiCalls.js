import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
    window.confirm("Tài khoản hoặc mật khẩu không đúng");
  }
};

export const registerCall = async (userCredential, dispatch) => {
  dispatch({ type: "REGISTER_START" });
  try {
    const res = await axios.post("/auth/register", userCredential);
    dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
    window.confirm("Vui lòng vào email đê xác thực ");
  } catch (err) {
    dispatch({ type: "REGISTER_FAILURE", payload: err });
    window.confirm("Tài khoản Email này đã được sử dụng !");
    // <Alert>
    //   svbfkjshsfkjfhsdjsdfjk
    // </Alert>
  }
};
