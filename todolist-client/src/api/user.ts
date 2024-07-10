import axios from "axios";
import { customRequest } from "../lib/axios";
import { ServerResponse } from "../types/common/ServerResponse";
import { UsersCollection } from "../types/user/UsersCollection";
import { GET_REQUEST, USERS_LIMIT } from "../utils/constants";

axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_BACKEND_URL;

const getAvailableUsers = async (page: number, searchQuery: string) => {
  const response: ServerResponse<UsersCollection> = await customRequest(
    GET_REQUEST,
    `${url}users/available-users?page=${page}&limit=${USERS_LIMIT}&search=${searchQuery}`
  );

  return response;
};

export { getAvailableUsers };
