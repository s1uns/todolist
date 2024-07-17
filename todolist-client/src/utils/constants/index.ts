// gender
const GENDER_MALE = 0;
const GENDER_FEMALE = 1;
const GENDER_OTHER = 2;

// heard from
const HEARD_FROM_FRIEND = 1;
const HEARD_FROM_INTERNET = 2;
const HEARD_FROM_ADVERTISEMENT = 3;
const HEARD_FROM_OTHER = 4;

// requests
const POST_REQUEST = "POST";
const PUT_REQUEST = "PUT";
const GET_REQUEST = "GET";
const PATCH_REQUEST = "PATCH";
const DELETE_REQUEST = "DELETE";

// limits
const TODOS_LIMIT = 10;
const USERS_LIMIT = 3;

// filters
const FILTER_ALL = 0;
const FILTER_ACTIVE = 1;
const FILTER_COMPLETED = 2;

//sort by
const SORT_CREATED_AT = 0;
const SORT_UPDATED_AT = 1;
const SORT_TITLE = 2;

//todo handler action
const CREATE_TODO = 0;
const UPDATE_TODO = 1;
const CHECK_TODO = 2;

// socket actions

const SOCKET_ACTION = "SOCKET_ACTION";
const SOCKET_USER_AUTHORIZATION = "USER_AUTHORIZATION";
const SOCKET_USER_LOGOUT = "USER_LOGOUT";
const SOCKET_TODO_CREATION = "TODO_CREATION";
const SOCKET_TODO_UPDATE = "TODO_UPDATE";
const SOCKET_TODO_CHECK = "TODO_CHECK";
const SOCKET_TODO_DELETE = "TODO_DELETE";
const SOCKET_TODO_CLEAR_COMPLETED = "TODO_CLEAR_COMPLETED";
const SOCKET_CONNECTION_REFRESH = "CONNECTION_REFRESH";
const SOCKET_SHARE_TODOS = "SHARE_TODOS";

export {
  CHECK_TODO,
  CREATE_TODO,
  DELETE_REQUEST,
  FILTER_ACTIVE,
  FILTER_ALL,
  FILTER_COMPLETED,
  GENDER_FEMALE,
  GENDER_MALE,
  GENDER_OTHER,
  GET_REQUEST,
  HEARD_FROM_ADVERTISEMENT,
  HEARD_FROM_FRIEND,
  HEARD_FROM_INTERNET,
  HEARD_FROM_OTHER,
  PATCH_REQUEST,
  POST_REQUEST,
  PUT_REQUEST,
  SOCKET_ACTION,
  SOCKET_CONNECTION_REFRESH,
  SOCKET_SHARE_TODOS,
  SOCKET_TODO_CHECK,
  SOCKET_TODO_CLEAR_COMPLETED,
  SOCKET_TODO_CREATION,
  SOCKET_TODO_DELETE,
  SOCKET_TODO_UPDATE,
  SOCKET_USER_AUTHORIZATION,
  SOCKET_USER_LOGOUT,
  SORT_CREATED_AT,
  SORT_TITLE,
  SORT_UPDATED_AT,
  TODOS_LIMIT,
  UPDATE_TODO,
  USERS_LIMIT
};
