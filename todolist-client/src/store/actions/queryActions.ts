import { Query } from "../../types/query/Query";
import { actionRequestType } from "./constants";

const setFilterRequest = (payload: number) => ({
  type: actionRequestType.SET_CURRENT_FILTER_REQUEST,
  payload: payload
});

const setCurrentPageRequest = (payload: number) => ({
  type: actionRequestType.SET_TODOS_CURRENT_PAGE_REQUEST,
  payload: payload
});

const setSearchQueryRequest = (payload: string) => ({
  type: actionRequestType.SET_TODOS_SEARCH_QUERY_REQUEST,
  payload: payload
});

const setSortingRequest = (payload: number) => ({
  type: actionRequestType.SET_SORTING_REQUEST,
  payload: payload
});

const setQueryRequest = (payload: Query) => ({
  type: actionRequestType.SET_QUERY_REQUEST,
  payload: payload
});

const handleSharedUserRequest = (payload: string) => ({
  type: actionRequestType.HANDLE_SHARED_USER_REQUEST,
  payload: payload
});

export {
  handleSharedUserRequest,
  setCurrentPageRequest,
  setFilterRequest,
  setQueryRequest,
  setSearchQueryRequest,
  setSortingRequest
};
