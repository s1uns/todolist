import { actionRequestType } from "./constants";

const getAvailableUsersRequest = () => ({
  type: actionRequestType.GET_AVAILABLE_USERS_REQUEST
});

const setSearchQueryRequest = (payload: string) => ({
  type: actionRequestType.SET_AVAILABLE_USERS_SEARCH_QUERY_REQUEST,
  payload: payload
});

const setCurrentPageRequest = (payload: number) => ({
  type: actionRequestType.SET_AVAILABLE_USERS_CURRENT_PAGE_REQUEST,
  payload: payload
});

export {
  getAvailableUsersRequest,
  setCurrentPageRequest,
  setSearchQueryRequest
};
