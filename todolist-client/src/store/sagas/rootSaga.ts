import { all } from "redux-saga/effects";
import userSagas from "./authSagas";
import querySagas from "./querySagas";
import todosSagas from "./todoSagas";

export default function* rootSaga() {
  yield all([userSagas(), todosSagas(), querySagas()]);
}
