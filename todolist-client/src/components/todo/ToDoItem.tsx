import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Avatar, ListItem, Typography } from "@mui/material";
import { FC, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkTodoRequest,
  deleteTodoRequest
} from "../../store/actions/todoActions";
import { getUser } from "../../store/slices/authSlice";
import CheckBox from "../common/CheckBox";

interface TodoItemProps {
  id: string;
  creatorId: string;
  title: string;
  isCompleted: boolean;
  isUpdated: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  onOpenUpdateModal: (todoId: string, title: string) => void;
}

const ToDoItem: FC<TodoItemProps> = ({
  id,
  title,
  isCompleted,
  isUpdated,
  creatorId,
  author,
  onOpenUpdateModal
}: TodoItemProps) => {
  const dispatch = useDispatch();
  const { userId } = useSelector(getUser);

  const isAuthor = creatorId === userId;

  const deleteTodo = () => {
    dispatch(deleteTodoRequest(id));
  };

  const checkTodo = () => {
    dispatch(checkTodoRequest(id));
  };

  const handleOpenUpdateModal = useCallback(() => {
    onOpenUpdateModal(id, title);
  }, [id, title]);

  const authorInitials = useMemo(() => {
    const fullName = author.split(" ");
    return `${fullName[0][0]} ${fullName[1][0]}`;
  }, [author]);

  return (
    <TodoItemContainer
      id={id}
      isAuthor={isAuthor}
      className={isCompleted ? "completed" : ""}
    >
      <StyledCheckBox isChecked={isCompleted} onChange={checkTodo} />
      <TodoTitle>{title}</TodoTitle>
      <UpdateButton onClick={handleOpenUpdateModal} />

      <DeleteButton onClick={deleteTodo} />
      {isUpdated ? <UpdatedText>updated</UpdatedText> : null}
      {isAuthor ? (
        ""
      ) : (
        <AuthorAvatar title={author}>{authorInitials}</AuthorAvatar>
      )}
    </TodoItemContainer>
  );
};

export default ToDoItem;

type TodoItemContainerProps = {
  isAuthor: boolean;
};

const TodoItemContainer = styled(ListItem)<TodoItemContainerProps>(
  ({ isAuthor }) => ({
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
  })
);

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
