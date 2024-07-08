import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Avatar, ListItem, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/slices/authSlice";
import { TodoItem } from "../../types/todo/TodoItem";
import CheckBox from "../common/CheckBox";
import Input from "../common/Input";
const ToDoItem: FC<TodoItem> = ({
  id,
  title,
  isCompleted,
  isUpdated,
  creatorId,
  author
}: TodoItem) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const { userId } = useSelector(getUser);

  const isAuthor = creatorId === userId;

  const toggleEditing = () => {
    if (!isCompleted) {
      setIsEditing((isEditing) => !isEditing);
    }
  };

  const deleteTodo = () => {
    // dispatch(deleteTodoRequest(id));
  };

  const getTodoAuthor = (authorFullname: string) => {
    const fullName = authorFullname.split(" ");
    return `${fullName[0][0]} ${fullName[1][0]}`;
  };

  // const updateTodo = (e: ChangeEvent<HTMLInputElement>) => {
  //     if (e.key === "Enter") {
  //         const trimmedString = e.target.value.trim();
  //         if (trimmedString.length === 0) {
  //             // dispatch(
  //             //     addToastRequest({
  //             //         id: new Date(Date.now()),
  //             //         message: "Enter something first!",
  //             //     }),
  //             // );
  //             return;
  //         }

  //         const newTodo = {
  //             id: id,
  //             title: trimmedString,
  //         };

  //         if (title !== trimmedString) {
  //             // dispatch(editTodoRequest(newTodo));
  //         }
  //         toggleEditing();
  //     }
  // };

  const checkTodo = () => {
    if (!isEditing) {
      // dispatch(checkTodoRequest(id));
    } else {
      // dispatch(
      //     addToastRequest({
      //         id: new Date(Date.now()),
      //         message: "Finish editing the todo first!",
      //     }),
      // );
      return;
    }
  };

  return (
    <TodoItemContainer
      id={id}
      isAuthor={isAuthor}
      className={isCompleted ? "completed" : ""}
    >
      <StyledCheckBox isChecked={isCompleted} onChange={checkTodo} />
      <TodoTitle>{title}</TodoTitle>
      <UpdateButton />
      <DeleteButton onClick={deleteTodo} />
      {isUpdated ? <UpdatedText>updated</UpdatedText> : ""}
      {isAuthor ? (
        ""
      ) : (
        <AuthorAvatar title={author}>{getTodoAuthor(author)}</AuthorAvatar>
      )}
    </TodoItemContainer>
  );
};

export default ToDoItem;

const UpdateTodoInput = styled(Input)({
  "& .MuiInputBase-input": {
    marginLeft: "4rem",
    fontSize: "3rem",
    width: "100%",
    height: "100%"
  }
});

type TodoItemProps = {
  isAuthor: boolean;
};

const TodoItemContainer = styled(ListItem)<TodoItemProps>(({ isAuthor }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  borderBottom: ".08rem solid #6b63ff",
  backgroundColor: isAuthor ? "white" : "#F5F5F5",
  height: isAuthor ? "4rem" : "6rem",
  padding: 5,
  "&:not(:last-child)": {
    marginBottom: "0.5rem"
  }
}));

const AuthorAvatar = styled(Avatar)({
  position: "absolute",
  top: ".5rem",
  right: ".5rem",
  fontSize: ".5rem",
  width: "1.5rem",
  height: "1.5rem"
});

const DeleteButton = styled(DeleteIcon)(`
  position: absolute;
  right: 0.5rem;
  font-size: 1.5rem;
  z-index: 1500;

  &:hover {
    cursor: pointer;
    color: red;
    font-size: 1.7rem;
  }
`);

const StyledCheckBox = styled(CheckBox)(`
    background-color: red;
  & .MuiSvgIcon-root {
    width: 30rem;
    height: 30rem;
    fontSize: 500rem;
  }
`);

const TodoTitle = styled(Typography)({
  fontSize: "3rem",
  width: "100%",

  ".completed &": {
    backgroundColor: "rgb(236, 235, 235)",
    opacity: 0.2,
    textDecoration: "line-through"
  }
});

const UpdateButton = styled(ModeEditOutlineOutlinedIcon)(`
  position: absolute;
  right: 3rem;
  font-size: 1.5rem;
  z-index: 1500;

  &:hover {
    cursor: pointer;
    color: #6b63ff;
    font-size: 1.7rem;
  }
`);

const UpdatedText = styled(Typography)(`
  font-size: 0.7rem;
  position: absolute;
  bottom: 0;
  right: 0;
  opacity: 0.5;
  .completed &: {
    opacity: 0.3;
  }
`);
