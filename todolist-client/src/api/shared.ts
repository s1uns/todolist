import axios from "axios";
import { customRequest } from "../lib/axios";
import socket from "../notifications/socket";
import { ServerResponse } from "../types/common/ServerResponse";
import { POST_REQUEST } from "../utils/constants";

axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_BACKEND_URL;

const manageShared = async (userId: string) => {
  const response: ServerResponse<string> = await customRequest(
    POST_REQUEST,
    `${url}shared/${userId}`
  );

  return response;
};

export { manageShared };
