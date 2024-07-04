import axios, { AxiosRequestConfig } from "axios";
import { ErrorResponse } from "../../types/common/ErrorResponse";

axios.defaults.withCredentials = true;

//class ServerError extends error

const customRequest = async <TData, TResponse>(
  method: string,
  url: string,
  data?: TData
): Promise<TResponse | ErrorResponse> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      data
    };

    const response = await axios(config);
    return response.data as TResponse;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401) {
          // store.dispatch(logoutUserRequest());
        }

        return {
          code: error.response.data.code,
          message: error.response.data.message,
          success: false
        } as ErrorResponse;
      }
    }

    return {
      code: 500,
      message: "Couldn't send your request, try again later",
      success: false
    } as ErrorResponse;
  }
};

export default customRequest;
