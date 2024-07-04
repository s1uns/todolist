import { AuthResult } from "../../types/auth/AuthResult";
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

const loginUserRequest = (payload) => ({
  type: actionRequestType.LOGIN_USER_REQUEST,
  payload: payload
});

const logoutUserRequest = (payload) => ({
  type: actionRequestType.LOGOUT_USER_REQUEST,
  payload: payload
});

const logoutUserSuccess = (payload) => ({
  type: actionSuccessType.LOGOUT_USER_SUCCESS,
  payload: payload
});

export {
  authUserSuccess,
  loginUserRequest,
  logoutUserRequest,
  logoutUserSuccess,
  registerUserRequest
};
