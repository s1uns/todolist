import { handleActions } from "redux-actions";
import { actionSuccessType } from "../actions/constants";
import { FILTER_ALL } from "../../shared/constants";

const queryReducer = handleActions(
    {
        [actionSuccessType.SET_QUERY_SUCCESS]: (state, { payload }) => ({
            currentPage: payload.currentPage,
            currentFilter: payload.currentFilter,
        }),

        [actionSuccessType.SET_CURRENT_PAGE_SUCCESS]: (state, { payload }) => ({
            currentPage: payload,
            currentFilter: state.currentFilter,
        }),

        [actionSuccessType.SET_CURRENT_FILTER_SUCCESS]: (
            state,
            { payload },
        ) => ({
            currentPage: 1,
            currentFilter: payload,
        }),
    },
    { currentPage: 1, currentFilter: FILTER_ALL },
);

export default queryReducer;
