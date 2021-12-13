export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});
export const RegisterStart = (userCredentials) => ({
  type: "REGISTER_START",
});

export const RegisterSuccess = (user) => ({
  type: "REGISTER_SUCCESS",
  payload: user,
});

export const RegisterFailure = () => ({
  type: "REGISTER_FAILURE",
});

export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});

export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});
