import { handleActions } from "redux-actions";
import { actionSuccessType } from "../actions/constants";

const todosReducer = handleActions(
    {
        [actionSuccessType.ADD_TODO_SUCCESS]: (state, { payload }) => {
            const newList = [payload, ...state.list];

            return {
                list: newList,
                totalTodos: ++state.totalTodos,
                activeTodos: ++state.activeTodos,
            };
        },

        [actionSuccessType.DELETE_TODO_SUCCESS]: (state, { payload }) => {
            let wasCompleted;
            const newList = state.list.filter((todo) => {
                if (todo.id == payload) {
                    wasCompleted = todo.isCompleted;
                    return false;
                }

                return true;
            });

            return {
                list: newList,
                totalTodos: --state.totalTodos,
                activeTodos: wasCompleted
                    ? state.activeTodos
                    : --state.activeTodos,
            };
        },

        [actionSuccessType.CHECK_TODO_SUCCESS]: (state, { payload }) => {
            const newList = state.list.map((todo) =>
                todo.id === payload.id
                    ? {
                          ...todo,
                          isCompleted: payload.isCompleted,
                          isUpdated: payload.isUpdated,
                          updatedAt: payload.updatedAt,
                      }
                    : todo,
            );

            return {
                list: newList,
                totalTodos: state.totalTodos,
                activeTodos: payload.isCompleted
                    ? --state.activeTodos
                    : ++state.activeTodos,
            };
        },

        [actionSuccessType.EDIT_TODO_SUCCESS]: (state, { payload }) => {
            const newList = state.list.map((todo) =>
                todo.id === payload.id
                    ? {
                          ...todo,
                          title: payload.title,
                          isUpdated: payload.isUpdated,
                          updatedAt: payload.updatedAt,
                      }
                    : todo,
            );

            return {
                list: newList,
                totalTodos: state.totalTodos,
                activeTodos: state.activeTodos,
            };
        },

        [actionSuccessType.SET_TODOS_SUCCESS]: (state, { payload }) => {
            return {
                list: payload.list,
                totalTodos: payload.totalTodos ? payload.totalTodos : 1,
                activeTodos: payload.activeTodos ? payload.activeTodos : 0,
            };
        },

        [actionSuccessType.CLEAR_TODOS_SUCCESS]: (state) => ({
            list: [],
            totalTodos: 1,
            activeTodos: 0,
        }),
    },
    { list: [], totalTodos: 1, activeTodos: 0 },
);

export default todosReducer;
