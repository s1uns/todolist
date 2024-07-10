import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import logger from "redux-logger";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/es/storage";
import createSagaMiddleware from "redux-saga";
import authReducer from "./slices/authSlice";
import queryReducer from "./slices/querySlice";
import todosReducer from "./slices/todosSlice";

const rootReducer = combineReducers({
  user: authReducer,
  todos: todosReducer,
  query: queryReducer
});

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, authReducer);
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { user: persistedReducer, todos: todosReducer, query: queryReducer },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
      .concat(logger)
      .concat(sagaMiddleware)
});
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const useAppDispatch: () => AppDispatch = useDispatch;

export { persistor, sagaMiddleware, store, useAppDispatch };
