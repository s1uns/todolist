import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { connectionRefreshAction } from "./notifications/notificationActions";
import LoginPage from "./pages/auth/LoginPage";
import RegistrationPage from "./pages/auth/RegistrationPage";
import TodosPage from "./pages/todo/TodosPage";
import { useAppDispatch } from "./store/store";
import withAuth from "./utils/HOCs/withAuth";

function App() {
  const LoginWithAuth = withAuth(LoginPage, false);
  const RegisterWithAuth = withAuth(RegistrationPage, false);
  const TodoListWithAuth = withAuth(TodosPage, true);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(connectionRefreshAction());
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginWithAuth />} />
      <Route path="/registration" element={<RegisterWithAuth />} />
      <Route path="/" element={<TodoListWithAuth />} />
    </Routes>
  );
}

export default App;
