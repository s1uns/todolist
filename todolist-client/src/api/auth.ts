import { customRequest } from "../lib/axios";
import { AuthResult } from "../types/auth/AuthResult";
import { LoginCredentials } from "../types/auth/LoginCredentials";
import { RegistrationCredentials } from "../types/auth/RegistrationCredentials";
import { ServerResponse } from "../types/common/ServerResponse";
import { POST_REQUEST } from "../utils/constants";

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

const checkCredentialAvailability = async (
  credential: string,
  credentialType: number
): Promise<ServerResponse<boolean>> => {
  const response = await customRequest<
    { credential: string; credentialType: number },
    boolean
  >(POST_REQUEST, `${url}auth/available-credential`, {
    credential: credential,
    credentialType: credentialType
  });
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

export { checkCredentialAvailability, loginUser, logoutUser, registerUser };
