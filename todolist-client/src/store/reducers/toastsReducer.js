import { handleActions } from "redux-actions";
import { actionSuccessType } from "../actions/constants";

const toastsReducer = handleActions(
    {
        [actionSuccessType.ADD_TOAST_SUCCESS]: (state, { payload }) => [
            ...state,
            payload,
        ],

        [actionSuccessType.DISMISS_TOAST_SUCCESS]: (state, { payload }) =>
            state.filter((toast) => toast.id !== payload),
    },
    []
);

export default toastsReducer;
