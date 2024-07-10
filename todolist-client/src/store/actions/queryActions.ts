import { actionRequestType } from "./constants";

const setFilterRequest = (payload: number) => ({
  type: actionRequestType.SET_CURRENT_FILTER_REQUEST,
  payload: payload
});

const setCurrentPageRequest = (payload: number) => ({
  type: actionRequestType.SET_CURRENT_PAGE_REQUEST,
  payload: payload
});

const incrementPageRequest = () => ({
  type: actionRequestType.INCREMENT_PAGE_REQUEST
});

export { incrementPageRequest, setCurrentPageRequest, setFilterRequest };
