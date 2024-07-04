import { LoginCredentials } from "../types/auth/LoginCredentials";
import { RegistrationCredentials } from "../types/auth/RegistrationCredentials";
import { POST_REQUEST } from "../utils/constants";
import { customRequest } from "./helpers";

const url = process.env.REACT_APP_BACKEND_URL;
console.log("Url: ", url);

const registerUser = async (credentials: RegistrationCredentials) => {
  const response = await customRequest(
    POST_REQUEST,
    `${url}auth/registration`,
    credentials
  );
  return response;
};

const loginUser = async (credentials: LoginCredentials) => {
  const response = await customRequest(
    POST_REQUEST,
    `${url}auth/login`,
    credentials
  );

  console.log("Response: ", response);

  return response;
};

const logoutUser = async () => {
  const response = await customRequest(POST_REQUEST, `${url}auth/logout`);
  return response;
};

export { loginUser, logoutUser, registerUser };
