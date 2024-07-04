import { actionRequestType } from "./constants";
import { actionSuccessType } from "./constants";

const setQuerySuccess = (payload) => ({
    type: actionSuccessType.SET_QUERY_SUCCESS,
    payload: payload,
});

const setQueryRequest = (payload) => ({
    type: actionRequestType.SET_QUERY_REQUEST,
    payload: payload,
});

const setCurrentPageRequest = (payload) => ({
    type: actionRequestType.SET_CURRENT_PAGE_REQUEST,
    payload: payload,
});

const setCurrentPageSuccess = (payload) => ({
    type: actionSuccessType.SET_CURRENT_PAGE_SUCCESS,
    payload: payload,
});

const setCurrentFilterRequest = (payload) => ({
    type: actionRequestType.SET_CURRENT_FILTER_REQUEST,
    payload: payload,
});

const setCurrentFilterSuccess = (payload) => ({
    type: actionSuccessType.SET_CURRENT_FILTER_SUCCESS,
    payload: payload,
});

export {
    setQuerySuccess,
    setQueryRequest,
    setCurrentPageRequest,
    setCurrentPageSuccess,
    setCurrentFilterRequest,
    setCurrentFilterSuccess,
};
