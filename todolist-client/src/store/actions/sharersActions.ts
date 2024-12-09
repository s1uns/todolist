import { actionRequestType } from "./constants";

const getSharersRequest = (payload?: boolean) => ({
  type: actionRequestType.GET_SHARERS_REQUEST,
  payload: payload
});

const setSearchQueryRequest = (payload: string) => ({
  type: actionRequestType.SET_SHARERS_SEARCH_QUERY_REQUEST,
  payload: payload
});

export { getSharersRequest, setSearchQueryRequest };
