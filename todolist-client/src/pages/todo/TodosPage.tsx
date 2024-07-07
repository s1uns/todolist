import styled from "@emotion/styled";
import { Button, List, Typography } from "@mui/material";
import { useState } from "react";
import emptyTodosList from "../../assets/EmptyTodosList.png";
import Input from "../../components/common/Input";
import ToDoItem from "../../components/todo/ToDoItem";
import { TodoItem } from "../../types/todo/TodoItem";

const TodosPage = () => {
  // const { list, totalTodos, activeTodos } = useSelector(getTodos);

  const [list, setList] = useState<TodoItem[]>([
    {
      id: "1",
      creatorId: "123",
      title: "1",
      isCompleted: false,
      isUpdated: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: "Author Author"
    },
    {
      id: "2",
      creatorId: "123",
      title: "1",
      isCompleted: false,
      isUpdated: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: "Author Author"
    }
  ]);

  return (
    <PageContainer>
      <FunctionsPanel>
        <InputContainer>
          <Input placeholder="Search todo..." />
        </InputContainer>
        <PanelButtons>
          <PanelButton>All</PanelButton>
          <PanelButton>Share</PanelButton>
          <PanelButton>Log Out</PanelButton>
        </PanelButtons>
      </FunctionsPanel>
      <TodosList>
        {list.length ? (
          list.map((todo) => (
            <ToDoItem
              id={todo.id}
              creatorId={todo.creatorId}
              title={todo.title}
              isCompleted={todo.isCompleted}
              isUpdated={todo.isUpdated}
              createdAt={todo.createdAt}
              updatedAt={todo.updatedAt}
              author={todo.author}
            />
          ))
        ) : (
          <ImgContainer>
            <EmptyListImg src={emptyTodosList} alt="empty todos list" />
            <Typography variant="h4">The todos list is empty</Typography>
          </ImgContainer>
        )}
      </TodosList>
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
  gap: 1.5rem;
`;

const PanelButton = styled(Button)`
  display: flex;
  flex-direction: row;
  margin: 0;
  font-size: 1.2rem;
  width: 8rem;
  height: 55%;
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
