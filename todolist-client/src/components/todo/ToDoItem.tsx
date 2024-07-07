import styled from "@emotion/styled";
import { Avatar, ClickAwayListener, ListItem, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/slices/authSlice";
import { TodoItem } from "../../types/todo/TodoItem";
import CheckBox from "../common/CheckBox";

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
      // isAuthor={isAuthor}
      className={isCompleted ? "completed" : ""}
    >
      <StyledCheckBox
        isChecked={isCompleted}
        onChange={checkTodo}
      />

      {isEditing ? (
        <ClickAwayListener onClickAway={toggleEditing}>
          <div>
            Editing
            {/* <UpdateTodoInput
              autoFocus
              defaultValue={title}
              onKeyDown={updateTodo}
            /> */}
          </div>
        </ClickAwayListener>
      ) : (
        <TodoTitle onDoubleClick={toggleEditing}>{title}</TodoTitle>
      )}
      <DeleteButton onClick={deleteTodo}>✖️</DeleteButton>
      {isUpdated ? <UpdatedIcon>🖊</UpdatedIcon> : ""}
      {isAuthor ? (
        ""
      ) : (
        <AuthorAvatar title={author}>{getTodoAuthor(author)}</AuthorAvatar>
      )}
    </TodoItemContainer>
  );
};

export default ToDoItem;

// const UpdateTodoInput = styled(Input)({
//     "& .MuiInputBase-input": {
//         marginLeft: "4rem",
//         fontSize: "3rem",
//         width: "100%",
//         height: "100%",
//     },
// });

const AuthorAvatar = styled(Avatar)({
  position: "absolute",
  top: ".5rem",
  right: ".5rem",
  fontSize: ".5rem",
  width: "1.5rem",
  height: "1.5rem"
});

const TodoItemContainer = styled(ListItem)(`
  padding: 5;
  position: relative;
  display: flex;
  flexDirection: row;
  alignItems: center;
  borderRadius: 0.5rem;
  width: 100%;
  border: 0.05rem dotted black;
  backgroundColor: ${(props: { isAuthor: boolean }) => (props.isAuthor ? "white" : "#F5F5F5")};
  height: ${(props: { isAuthor: boolean }) => (props.isAuthor ? "5rem" : "7rem")};

  &:not(:last-child): {
    marginBottom: "0.5rem"
  }
`);

const DeleteButton = styled(Typography)({
  position: "absolute",
  right: "0.5rem",
  fontSize: "2rem",
  zIndex: 500,

  "&:hover": { cursor: "pointer", fontSize: "2.1rem" }
});

const StyledCheckBox = styled(CheckBox)({
  "& .MuiSvgIcon-root": {
    width: "3rem",
    height: "3rem",
    fontSize: "50rem"
  },
  position: "absolute",
  marginRight: "1.5rem",
  zIndex: 500,
  border: "none",

  "& .Mui-checked": {
    color: "red"
  }
});

const TodoTitle = styled(Typography)({
  paddingLeft: "4rem",
  fontSize: "3rem",
  width: "100%",

  ".completed &": {
    backgroundColor: "rgb(236, 235, 235)",
    opacity: 0.2,
    textDecoration: "line-through"
  }
});

const UpdatedIcon = styled(Typography)({
  paddingLeft: "4rem",
  fontSize: "3rem",
  position: "absolute",
  left: "75%",
  ".completed &": {
    opacity: 0.5
  }
});
