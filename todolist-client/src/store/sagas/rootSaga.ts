import { all } from "redux-saga/effects";
import userSagas from "./authSagas";
import todosSagas from "./todoSagas";

export default function* rootSaga() {
  yield all([userSagas(), todosSagas()]);
}
