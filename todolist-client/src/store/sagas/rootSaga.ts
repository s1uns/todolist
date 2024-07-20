import { all } from "redux-saga/effects";
import userSagas from "./authSagas";
import notificationsSagas from "./notificationsSagas";
import querySagas from "./querySagas";
import sharersSagas from "./sharersSagas";
import todosSagas from "./todoSagas";
import usersSagas from "./usersSagas";

export default function* rootSaga() {
  yield all([
    userSagas(),
    todosSagas(),
    querySagas(),
    notificationsSagas(),
    usersSagas(),
    sharersSagas()
  ]);
}
