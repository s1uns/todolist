import { all } from "redux-saga/effects";
import userSagas from "./authSagas";

export default function* rootSaga() {
  yield all([userSagas()]);
}
