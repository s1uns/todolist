import { takeEvery, put } from "redux-saga/effects";
import { actionRequestType } from "../actions/constants";
import {
    setCurrentFilterSuccess,
    setCurrentPageSuccess,
    setQuerySuccess,
} from "../actions/queryActions";

function* workSetQuery({ payload }) {
    yield put(setQuerySuccess(payload));
}

function* workSetCurrentPage({ payload }) {
    yield put(setCurrentPageSuccess(payload));
}

function* workSetCurrentFilter({ payload }) {
    yield put(setCurrentFilterSuccess(payload));
}

function* querySagas() {
    yield takeEvery(actionRequestType.SET_QUERY_REQUEST, workSetQuery);
    yield takeEvery(
        actionRequestType.SET_CURRENT_PAGE_REQUEST,
        workSetCurrentPage,
    );
    yield takeEvery(
        actionRequestType.SET_CURRENT_FILTER_REQUEST,
        workSetCurrentFilter,
    );
}

export default querySagas;
