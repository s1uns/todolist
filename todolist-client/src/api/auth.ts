import { AuthResult } from "../types/auth/AuthResult";
import { LoginCredentials } from "../types/auth/LoginCredentials";
import { RegistrationCredentials } from "../types/auth/RegistrationCredentials";
import { ServerResponse } from "../types/common/ServerResponse";
import { POST_REQUEST } from "../utils/constants";
import { customRequest } from "./helpers";

const url = process.env.REACT_APP_BACKEND_URL;

const registerUser = async (
  credentials: RegistrationCredentials
): Promise<ServerResponse<AuthResult>> => {
  const response = await customRequest<RegistrationCredentials, AuthResult>(
    POST_REQUEST,
    `${url}auth/registration`,
    credentials
  );
  return response;
};

const checkEmailAvailability = async (
  email: string
): Promise<ServerResponse<boolean>> => {
  const response = await customRequest<{ email: string }, boolean>(
    POST_REQUEST,
    `${url}auth/available-email`,
    { email: email }
  );
  return response;
};

const loginUser = async (
  credentials: LoginCredentials
): Promise<ServerResponse<AuthResult>> => {
  const response = await customRequest<LoginCredentials, AuthResult>(
    POST_REQUEST,
    `${url}auth/login`,
    credentials
  );

  return response;
};

const logoutUser = async () => {
  const response = await customRequest(POST_REQUEST, `${url}auth/logout`);
  return response;
};

export { checkEmailAvailability, loginUser, logoutUser, registerUser };
