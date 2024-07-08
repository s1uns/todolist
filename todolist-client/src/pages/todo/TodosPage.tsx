import styled from "@emotion/styled";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Button,
  List,
  Menu,
  MenuItem,
  MenuProps,
  Typography
} from "@mui/material";
import { MouseEvent, useState } from "react";
import emptyTodosList from "../../assets/EmptyTodosList.png";
import Input from "../../components/common/Input";
import ToDoItem from "../../components/todo/ToDoItem";
import { logoutUserRequest } from "../../store/actions/authActions";
import { useAppDispatch } from "../../store/store";
import { TodoItem } from "../../types/todo/TodoItem";

const filterOptions = {
  0: "All",
  1: "Active",
  2: "Completed"
};

const TodosFilterMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentFilter, setCurrentFilter] = useState<0 | 1 | 2>(0);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSetFilter = (value: 0 | 1 | 2) => {
    setCurrentFilter(value);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <FilterSelectorContainer>
      <PanelButton
        id="menu-button"
        aria-controls={open ? "menu-list" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {filterOptions[currentFilter]}
      </PanelButton>
      <StyledMenu
        id="menu-list"
        aria-labelledby="menu-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
      >
        <MenuItem onClick={() => handleSetFilter(0)}>
          {filterOptions[0]}
        </MenuItem>
        <MenuItem onClick={() => handleSetFilter(1)}>
          {filterOptions[1]}
        </MenuItem>
        <MenuItem onClick={() => handleSetFilter(2)}>
          {filterOptions[2]}
        </MenuItem>
      </StyledMenu>
    </FilterSelectorContainer>
  );
};

const TodosPage = () => {
  const dispatch = useAppDispatch();
  // const { list, totalTodos, activeTodos } = useSelector(getTodos);

  const handleLogout = () => {
    dispatch(logoutUserRequest());
  };

  const [list, setList] = useState<TodoItem[]>([
    {
      id: "1",
      creatorId: "9a6b80b0-d33b-447c-bb10-54e63190b681",
      title: "1",
      isCompleted: true,
      isUpdated: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: "Author Author"
    },
    {
      id: "3",
      creatorId: "9a6b80b0-d33b-447c-bb10-54e63190b681",
      title: "1",
      isCompleted: false,
      isUpdated: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: "Author Author"
    },
    {
      id: "2",
      creatorId: "123",
      title: "1",
      isCompleted: false,
      isUpdated: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: "Author Author"
    }
  ]);

  return (
    <PageContainer>
      <FunctionsPanel>
        <InputContainer>
          <Input placeholder="" />
        </InputContainer>
        <PanelButtons>
          <TodosFilterMenu />
          <PanelButton>Share</PanelButton>
          <PanelButton onClick={handleLogout}>Log Out</PanelButton>
        </PanelButtons>
      </FunctionsPanel>
      <TodosList>
        {list.length ? (
          list.map((todo) => (
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
            />
          ))
        ) : (
          <ImgContainer>
            <EmptyListImg src={emptyTodosList} alt="empty todos list" />
            <Typography variant="h4">The todos list is empty</Typography>
          </ImgContainer>
        )}
      </TodosList>
      <AddButton />
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
  position: absolute;
  color: #6b63ff;
  font-size: 3rem;
  stroke: transparent;
  stroke-width: 0.05rem;
  right: 25%;
  top: 75%;

  &:hover {
    cursor: pointer;
    border-radius: 100%;
    padding: 0;
    stroke: #271cfa;
    stroke-width: 0.05rem;
    color: #544bfc;
  }
`;

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right"
    }}
    {...props}
  />
))(() => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    border: ".1rem solid #6b63ff",
    color: "#6b63ff",
    marginTop: "4.5rem",
    zIndex: 1000000,
    minWidth: 50,

    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0"
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18
      }
    }
  }
}));

const FilterSelectorContainer = styled.div`
  height: 100%;
`;
