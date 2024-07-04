import { actionRequestType } from "./constants";
import { actionSuccessType } from "./constants";

const addToastRequest = (payload) => ({
    type: actionRequestType.ADD_TOAST_REQUEST,
    payload: payload,
});

const addToastSuccess = (payload) => ({
    type: actionSuccessType.ADD_TOAST_SUCCESS,
    payload: payload,
});

const dismissToastRequest = (payload) => ({
    type: actionRequestType.DISMISS_TOAST_REQUEST,
    payload: payload,
});

const dismissToastSuccess = (payload) => ({
    type: actionSuccessType.DISMISS_TOAST_SUCCESS,
    payload: payload,
});

export {
    addToastRequest,
    addToastSuccess,
    dismissToastRequest,
    dismissToastSuccess,
};
