import { AuthResult } from "../../types/auth/AuthResult";
import { LoginCredentials } from "../../types/auth/LoginCredentials";
import { RegistrationCredentials } from "../../types/auth/RegistrationCredentials";
import { actionRequestType, actionSuccessType } from "./constants";

const registerUserRequest = (payload: RegistrationCredentials) => ({
  type: actionRequestType.REGISTER_USER_REQUEST,
  payload: payload
});

const authUserSuccess = (payload: AuthResult) => ({
  type: actionSuccessType.AUTH_USER_SUCCESS,
  payload: payload
});

const loginUserRequest = (payload: LoginCredentials) => ({
  type: actionRequestType.LOGIN_USER_REQUEST,
  payload: payload
});

const logoutUserRequest = () => ({
  type: actionRequestType.LOGOUT_USER_REQUEST
});

const logoutUserSuccess = () => ({
  type: actionSuccessType.LOGOUT_USER_SUCCESS
});

export {
  authUserSuccess,
  loginUserRequest,
  logoutUserRequest,
  logoutUserSuccess,
  registerUserRequest
};
