import axios, { AxiosRequestConfig } from "axios";
import { ServerError } from "../../types/common/ServerError.js";

axios.defaults.withCredentials = true;

const customRequest = async <T>(method: string, url: string, data?: T) => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      data
    };

    const response = await axios(config);
    return response.data;
  } catch (error: unknown) {
    console.log((error as ServerError).response.message);

    // if (error.response) {
    //   if (error.response.status === 401) {
    //     store.dispatch(logoutUserRequest);
    //   }

    //   return error.response.data;
    // } else {
    //   return {
    //     success: false,
    //     message: "Couldn't send your request, retry later"
    //   };
    // }
  }
};

export default customRequest;
