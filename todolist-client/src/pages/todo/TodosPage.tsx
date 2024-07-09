import styled from "@emotion/styled";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Button, List, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import emptyTodosList from "../../assets/EmptyTodosList.png";
import Input from "../../components/common/Input";
import CreateOrUpdateTodoDialog from "../../components/todo/CreateOrUpdateTodoDialog";
import ToDoItem from "../../components/todo/ToDoItem";
import TodosFilterMenu from "../../components/todo/TodosFilterMenu";
import { logoutUserRequest } from "../../store/actions/authActions";
import { getTodosRequest } from "../../store/actions/todoActions";
import { clearTodosSuccess, getTodos } from "../../store/slices/todosSlice";
import { useAppDispatch } from "../../store/store";
import { UpdateTodo } from "../../types/todo/UpdateTodo";
import { TODOS_LIMIT } from "../../utils/constants";

const TodosPage = () => {
  const dispatch = useAppDispatch();
  const { list, totalTodos, activeTodos } = useSelector(getTodos);
  const [open, setOpen] = useState(false);
  const [todoForEdit, setTodoForEdit] = useState<UpdateTodo | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1); //move to redux store
  const observerTarget = useRef(null);

  const handleOpenUpdateTodoModal = (todoId: string, title: string) => {
    setTodoForEdit({ todoId: todoId, title: title });
  };
  const handleOpenTodoModal = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setTodoForEdit(null);
  };

  const handleLogout = () => {
    dispatch(logoutUserRequest());
  };

  useEffect(() => {
    dispatch(clearTodosSuccess());
    fetchMoreTodos();
  }, []);

  const fetchMoreTodos = () => {
    dispatch(getTodosRequest({ currentPage: currentPage, currentFilter: 0 }));
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log("Entries: ", entries);
        if (entries[0].isIntersecting) {
          console.log("HEY");
          dispatch(
            getTodosRequest({ currentPage: currentPage, currentFilter: 0 })
          );
          setCurrentPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  return (
    <PageContainer>
      <FunctionsPanel>
        <InputContainer>
          <Input endAdornment={<SearchIcon />} />
        </InputContainer>
        <PanelButtons>
          <TodosFilterMenu />
          <PanelButton>Clear completed</PanelButton>
          <PanelButton>Share</PanelButton>
          <PanelButton onClick={handleLogout}>Log Out</PanelButton>
        </PanelButtons>
      </FunctionsPanel>

      <TodosList>
        {list.length ? (
          <InfiniteScroll
            style={{ overflowY: "hidden" }}
            dataLength={list.length}
            next={fetchMoreTodos}
            hasMore={currentPage < Math.ceil(totalTodos / TODOS_LIMIT)}
            loader={<div>Loading...</div>}
          >
            {list.map((todo) => (
              <ToDoItem
                key={todo.id}
                id={todo.id}
                creatorId={todo.creatorId}
                title={todo.title}
                isCompleted={todo.isCompleted}
                isUpdated={todo.isUpdated}
                createdAt={todo.createdAt}
                updatedAt={todo.updatedAt}
                author={todo.author}
                onOpenUpdateModal={handleOpenUpdateTodoModal}
              />
            ))}
          </InfiniteScroll>
        ) : (
          <ImgContainer>
            <EmptyListImg src={emptyTodosList} alt="empty todos list" />
            <Typography variant="h4">The todos list is empty</Typography>
          </ImgContainer>
        )}
      </TodosList>
      <AddButton onClick={handleOpenTodoModal} />
      {open || todoForEdit ? (
        <CreateOrUpdateTodoDialog
          todoId={todoForEdit?.todoId}
          oldTitle={todoForEdit?.title}
          onClose={handleClose}
        />
      ) : null}
    </PageContainer>
  );
};

export default TodosPage;

const PageContainer = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  padding-top: 15rem;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const PanelButtons = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.5rem;
`;

const PanelButton = styled(Button)`
  display: flex;
  flex-direction: row;
  margin: 0;
  font-size: 1rem;
  width: 9rem;
  height: 75%;
`;

const FunctionsPanel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const InputContainer = styled.div`
  width: 30%;
`;

const TodosList = styled(List)`
  width: 35%;
`;

const ImgContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyListImg = styled.img`
  width: 100%;
`;

const AddButton = styled(AddCircleOutlinedIcon)`
  position: fixed;
  color: #6b63ff;
  font-size: 3rem;
  stroke: transparent;
  stroke-width: 0.05rem;
  right: 25%;
  top: 90%;

  &:hover {
    cursor: pointer;
    border-radius: 100%;
    padding: 0;
    stroke: #271cfa;
    stroke-width: 0.05rem;
    color: #544bfc;
  }
`;
