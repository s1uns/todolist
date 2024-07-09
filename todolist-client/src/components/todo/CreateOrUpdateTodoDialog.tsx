import styled from "@emotion/styled";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import {
  createTodoRequest,
  updateTodoRequest
} from "../../store/actions/todoActions";
import { useAppDispatch } from "../../store/store";
import Input from "../common/Input";

interface DialogProps {
  todoId?: string;
  oldTitle?: string;
  onClose: () => void;
}

const CreateOrUpdateTodoDialog = ({
  todoId,
  oldTitle,
  onClose
}: DialogProps) => {
  const dispatch = useAppDispatch();
  const [inputErrors, setInputErrors] = useState<string>("");
  const [todoTitle, setTodoTitle] = useState<string>(oldTitle ? oldTitle : "");

  const handleUpdateTodo = (todoId: string, dialogText: string) => {
    dispatch(updateTodoRequest({ todoId: todoId, title: dialogText }));
    onClose();
  };

  const handleAddTodo = (dialogText: string) => {
    dispatch(createTodoRequest(dialogText));
    onClose();
  };

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTodoTitle(e.target.value);
  };

  const handleSubmit = () => {
    const dialogText = todoTitle.trim();

    if (dialogText) {
      if (todoId) {
        if (dialogText != oldTitle) {
          handleUpdateTodo(todoId, dialogText);
        } else {
          setInputErrors("Update something in the title first!");
        }
      } else {
        handleAddTodo(dialogText);
      }
    } else {
      setInputErrors("Enter something first!");
    }
  };

  return (
    <div>
      <StyledDialogBox open={true} onClose={onClose}>
        <DialogTitle>{todoId ? "Update todo" : "Create todo"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the {todoId ? "new" : ""} todos title
          </DialogContentText>
          <Input
            value={todoTitle}
            onChange={handleChange}
            error={inputErrors}
          />
        </DialogContent>
        <DialogActions>
          <DialogButton onClick={onClose}>Cancel</DialogButton>
          <DialogButton onClick={handleSubmit}>
            {todoId ? "Update" : "Create"} todo
          </DialogButton>
        </DialogActions>
      </StyledDialogBox>
    </div>
  );
};

export default CreateOrUpdateTodoDialog;

const StyledDialogBox = styled(Dialog)`
  z-index: 10000;

  & .MuiDialogContent-root {
    width: 90%;
  }
  & .MuiPaper-root {
    width: 100%;
  }
`;

const DialogButton = styled(Button)`
  font-size: 1rem;
  width: 10rem;
`;
