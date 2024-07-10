import styled from "@emotion/styled";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Button, List, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import emptyTodosList from "../../assets/EmptyTodosList.png";
import Input from "../../components/common/Input";
import IntersectionObserverComponent from "../../components/common/IntersectionObserverComponent";
import CreateOrUpdateTodoDialog from "../../components/todo/CreateOrUpdateTodoDialog";
import ToDoItem from "../../components/todo/ToDoItem";
import TodosFilterMenu from "../../components/todo/TodosFilterMenu";
import { logoutUserRequest } from "../../store/actions/authActions";
import {
  incrementPageRequest,
  setSearchQueryRequest
} from "../../store/actions/queryActions";
import { getTodosRequest } from "../../store/actions/todoActions";
import { getTodos } from "../../store/slices/todosSlice";
import { RootState, useAppDispatch } from "../../store/store";
import { UpdateTodo } from "../../types/todo/UpdateTodo";
import { TODOS_LIMIT } from "../../utils/constants";

const TodosPage = () => {
  const dispatch = useAppDispatch();
  const { currentFilter, currentPage, searchQuery } = useSelector(
    (state: RootState) => state.query
  );
  const { list, totalTodos, activeTodos } = useSelector(getTodos);
  const [open, setOpen] = useState(false);
  const [todoForEdit, setTodoForEdit] = useState<UpdateTodo | null>(null);

  const handleChangeSearchQuery = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const searchQuery = e.target.value.trim();

    dispatch(setSearchQueryRequest(searchQuery));
  };

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

  const fetchMoreTodos = () => {
    dispatch(incrementPageRequest());
  };

  useEffect(() => {
    dispatch(getTodosRequest());
  }, [currentFilter, currentPage, searchQuery]);

  const hasMore = useMemo(
    () => currentPage < Math.ceil(totalTodos / TODOS_LIMIT),
    [currentPage, totalTodos]
  );

  return (
    <PageContainer>
      <FunctionsPanel>
        <InputContainer>
          <Input
            endAdornment={<SearchIcon />}
            ignoreErrors={true}
            value={searchQuery}
            onChange={handleChangeSearchQuery}
          />
        </InputContainer>
        <PanelButtons>
          <TodosFilterMenu />
          <PanelButton>Clear completed</PanelButton>
          <PanelButton>Share</PanelButton>
          <PanelButton onClick={handleLogout}>Log Out</PanelButton>
        </PanelButtons>
      </FunctionsPanel>

      <ListContainer>
        <TodosList>
          {list.length ? (
            list.map((todo, index) => (
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
            ))
          ) : (
            <ImgContainer>
              <EmptyListImg src={emptyTodosList} alt="empty todos list" />
              <Typography variant="h4">The todos list is empty</Typography>
            </ImgContainer>
          )}
          <IntersectionObserverComponent
            hasMore={hasMore}
            fetchMore={fetchMoreTodos}
          />
        </TodosList>
      </ListContainer>
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: hidden;
`;

const PanelButtons = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

const PanelButton = styled(Button)`
  display: flex;
  flex-direction: row;
  margin: 0;
  font-size: 1rem;
`;

const FunctionsPanel = styled.div`
  margin-top: 1rem;
  width: 100%;
  max-height: 100px;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const ListContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  overflow-y: scroll;
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
