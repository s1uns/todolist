import { all } from "redux-saga/effects";
import todosSagas from "./todosSagas";
import querySagas from "./querySagas";
import userSagas from "./userSagas";
import toastsSagas from "./toastsSagas";
import notificationsSagas from "./notificationsSagas";

export default function* rootSaga() {
    yield all([
        todosSagas(),
        querySagas(),
        userSagas(),
        toastsSagas(),
        notificationsSagas(),
    ]);
}
