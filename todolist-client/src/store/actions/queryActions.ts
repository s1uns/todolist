import { actionRequestType } from "./constants";

const setFilterRequest = (payload: number) => ({
  type: actionRequestType.SET_CURRENT_FILTER_REQUEST,
  payload: payload
});

const setCurrentPageRequest = (payload: number) => ({
  type: actionRequestType.SET_CURRENT_PAGE_REQUEST,
  payload: payload
});

const setSearchQueryRequest = (payload: string) => ({
  type: actionRequestType.SET_SEARCH_QUERY_REQUEST,
  payload: payload
});

const incrementPageRequest = () => ({
  type: actionRequestType.INCREMENT_PAGE_REQUEST
});

export {
  incrementPageRequest,
  setCurrentPageRequest,
  setFilterRequest,
  setSearchQueryRequest
};
