import { takeEvery, put } from "redux-saga/effects";
import { actionRequestType, } from "../actions/constants";
import { addToastSuccess, dismissToastSuccess } from "../actions/toastsActions";

function* workAddToast({ payload }) {
    yield put(addToastSuccess(payload));
}

function* workDismissToast({ payload }) {
    yield put(dismissToastSuccess(payload));
}

function* toastsSagas() {
    yield takeEvery(
        actionRequestType.ADD_TOAST_REQUEST,
        workAddToast
    );
    yield takeEvery(
        actionRequestType.DISMISS_TOAST_REQUEST,
        workDismissToast
    );
}

export default toastsSagas;
