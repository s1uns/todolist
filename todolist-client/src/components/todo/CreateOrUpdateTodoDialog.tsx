import styled from "@emotion/styled";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { ChangeEvent, ElementType, useState } from "react";
import Input from "../common/Input";

interface DialogProps {
  todoId?: string;
  oldTitle?: string;

  onSubmit: (value: string) => void;
  OpenButton: ElementType;
}

const CreateOrUpdateTodoDialog = ({
  todoId,
  oldTitle,
  onSubmit,
  OpenButton
}: DialogProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTodoTitle(oldTitle ? oldTitle : "");
  };
  const [inputErrors, setInputErrors] = useState<string>("");
  const [todoTitle, setTodoTitle] = useState<string>(oldTitle ? oldTitle : "");

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTodoTitle(e.target.value);
  };

  const handleSubmit = () => {
    if (todoTitle) {
      onSubmit(todoTitle);
      if (!todoId) {
        setTodoTitle("");
      }
      setOpen(false);
      setInputErrors("");
    } else {
      setInputErrors("Enter something first!");
    }
  };

  return (
    <div>
      <OpenButton onClick={handleOpen} />
      <StyledDialogBox open={open} onClose={handleClose}>
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
          <DialogButton onClick={handleClose}>Cancel</DialogButton>
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
