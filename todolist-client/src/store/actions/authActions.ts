import { LoginCredentials } from "../../types/auth/LoginCredentials";
import { RegistrationCredentials } from "../../types/auth/RegistrationCredentials";
import { actionRequestType } from "./constants";

const registerUserRequest = (payload: RegistrationCredentials) => ({
  type: actionRequestType.REGISTER_USER_REQUEST,
  payload: payload
});

const loginUserRequest = (payload: LoginCredentials) => ({
  type: actionRequestType.LOGIN_USER_REQUEST,
  payload: payload
});

const logoutUserRequest = () => ({
  type: actionRequestType.LOGOUT_USER_REQUEST
});

export { loginUserRequest, logoutUserRequest, registerUserRequest };
