import styled from "@emotion/styled";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Button, List, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import emptyTodosList from "../../assets/EmptyTodosList.png";
import IntersectionObserverComponent from "../../components/common/IntersectionObserverComponent";
import Sidebar from "../../components/common/Sidebar";
import CreateOrUpdateTodoDialog from "../../components/todo/CreateOrUpdateTodoDialog";
import SearchTodoInput from "../../components/todo/SearchTodoInput";
import SharedUsersList from "../../components/todo/SharedUsersList";
import ShareTodosModal from "../../components/todo/ShareTodosModal";
import SortingPanel from "../../components/todo/SortingPanel";
import ToDoItem from "../../components/todo/ToDoItem";
import TodosFilterMenu from "../../components/todo/TodosFilterMenu";
import { logoutUserRequest } from "../../store/actions/authActions";
import {
  clearCompletedRequest,
  getTodosRequest
} from "../../store/actions/todoActions";
import { getTodos } from "../../store/slices/todosSlice";
import { RootState, useAppDispatch } from "../../store/store";
import { UpdateTodo } from "../../types/todo/UpdateTodo";
const TodosPage = () => {
  const dispatch = useAppDispatch();
  const { currentFilter, searchQuery, sortBy, isAscending, selectedSharers } =
    useSelector((state: RootState) => state.query);
  const { list, totalTodos } = useSelector(getTodos);
  const [openTodoModal, setOpenTodoModal] = useState(false);
  const [openUsersModal, setOpenUsersModal] = useState(false);
  const [openSortingToolbar, setOpenSortingToolbar] = useState(false);

  const [todoForEdit, setTodoForEdit] = useState<UpdateTodo | null>(null);
  const todosContainerRef = useRef<HTMLDivElement>(null);

  const handleOpenUpdateTodoModal = (todoId: string, title: string) => {
    setTodoForEdit({ todoId: todoId, title: title });
  };

  const handleOpenTodoModal = () => setOpenTodoModal(true);
  const handleOpenUsersModal = () => setOpenUsersModal(true);
  const handleOpenSortingToolbar = () => setOpenSortingToolbar(true);

  const handleCloseTodoModal = () => {
    setOpenTodoModal(false);
    setTodoForEdit(null);
  };

  const handleCloseUsersModal = () => {
    setOpenUsersModal(false);
  };

  const handleCloseSortingToolbar = () => {
    setOpenSortingToolbar(false);
  };

  const handleClearCompleted = () => {
    dispatch(clearCompletedRequest());
  };

  const handleLogout = () => {
    dispatch(logoutUserRequest());
  };

  const fetchMoreTodos = () => {
    dispatch(getTodosRequest());
  };

  useEffect(() => {
    todosContainerRef.current?.scroll(0, 0);

    dispatch(getTodosRequest());
  }, [currentFilter, searchQuery, sortBy, isAscending, selectedSharers]);

  const hasMore = useMemo(() => list.length < totalTodos, [list, totalTodos]);

  return (
    <PageContainer>
      <FunctionsPanel>
        <InputContainer>
          <SearchTodoInput />
        </InputContainer>
        <PanelButtons>
          <TodosFilterMenu />
          <PanelButton onClick={handleClearCompleted}>
            Clear completed
          </PanelButton>

          <PanelButton onClick={handleOpenUsersModal}>Share</PanelButton>
          <PanelButton onClick={handleLogout}>Log Out</PanelButton>
          <SortButton onClick={handleOpenSortingToolbar} />
        </PanelButtons>
      </FunctionsPanel>

      <ListContainer ref={todosContainerRef}>
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
      {openTodoModal || todoForEdit ? (
        <CreateOrUpdateTodoDialog
          todoId={todoForEdit?.todoId}
          oldTitle={todoForEdit?.title}
          onClose={handleCloseTodoModal}
        />
      ) : null}
      {openUsersModal ? (
        <ShareTodosModal
          open={openUsersModal}
          onClose={handleCloseUsersModal}
        />
      ) : null}

      <Sidebar
        anchor="right"
        isOpen={openSortingToolbar}
        onClose={handleCloseSortingToolbar}
      >
        <SortingPanel />
        <SharedUsersList />
      </Sidebar>
    </PageContainer>
  );
};

export default TodosPage;

const SortButton = styled(FilterAltIcon)`
  position: absolute;
  right: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 2rem;
  background-color: #6b63ff;
  fill: white;

  &:hover {
    font-size: 3rem;
    padding: 0.5rem;
    cursor: pointer;
  }
`;
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
  position: relative;
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
