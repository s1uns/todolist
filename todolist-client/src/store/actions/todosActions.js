import { actionRequestType } from "./constants";
import { actionSuccessType } from "./constants";

const createTodoRequest = (payload) => ({
    type: actionRequestType.ADD_TODO_REQUEST,
    payload: payload,
});

const createTodoSuccess = (payload) => ({
    type: actionSuccessType.ADD_TODO_SUCCESS,
    payload: payload,
});

const editTodoRequest = (payload) => ({
    type: actionRequestType.EDIT_TODO_REQUEST,
    payload: payload,
});

const editTodoSuccess = (payload) => ({
    type: actionSuccessType.EDIT_TODO_SUCCESS,
    payload: payload,
});

const deleteTodoRequest = (payload) => ({
    type: actionRequestType.DELETE_TODO_REQUEST,
    payload: payload,
});

const deleteTodoSuccess = (payload) => ({
    type: actionSuccessType.DELETE_TODO_SUCCESS,
    payload: payload,
});

const checkTodoRequest = (payload) => ({
    type: actionRequestType.CHECK_TODO_REQUEST,
    payload: payload,
});

const checkTodoSuccess = (payload) => ({
    type: actionSuccessType.CHECK_TODO_SUCCESS,
    payload: payload,
});

const getTodosRequest = (payload) => ({
    type: actionRequestType.GET_TODOS_REQUEST,
    payload: payload,
});

const setTodosSuccess = (payload) => ({
    type: actionSuccessType.SET_TODOS_SUCCESS,
    payload: payload,
});

const clearCompletedRequest = () => ({
    type: actionRequestType.CLEAR_COMPLETED_REQUEST,
});

const clearCompletedSuccess = () => ({
    type: actionSuccessType.CLEAR_COMPLETED_SUCCESS,
});

const clearTodosSuccess = () => ({
    type: actionSuccessType.CLEAR_TODOS_SUCCESS,
});

export {
    createTodoRequest,
    createTodoSuccess,
    editTodoRequest,
    editTodoSuccess,
    deleteTodoRequest,
    deleteTodoSuccess,
    checkTodoRequest,
    checkTodoSuccess,
    getTodosRequest,
    setTodosSuccess,
    clearCompletedRequest,
    clearCompletedSuccess,
    clearTodosSuccess,
};
