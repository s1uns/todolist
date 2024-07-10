import styled from "@emotion/styled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button, Menu, MenuItem, MenuProps } from "@mui/material";
import { MouseEvent, useState } from "react";
import { useSelector } from "react-redux";
import { setFilterRequest } from "../../store/actions/queryActions";
import { getCurrentFilter } from "../../store/slices/querySlice";
import { useAppDispatch } from "../../store/store";
import {
  FILTER_ACTIVE,
  FILTER_ALL,
  FILTER_COMPLETED
} from "../../utils/constants";

const filterOptions = [
  { value: FILTER_ALL, label: "All" },
  { value: FILTER_ACTIVE, label: "Active" },
  { value: FILTER_COMPLETED, label: "Completed" }
];

const TodosFilterMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const currentFilter = useSelector(getCurrentFilter);
  const dispatch = useAppDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSetFilter = (value: number) => {
    dispatch(setFilterRequest(value));
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
        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      >
        {filterOptions[currentFilter].label}
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
        {filterOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleSetFilter(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </StyledMenu>
    </FilterSelectorContainer>
  );
};

export default TodosFilterMenu;

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
  display: flex;
  align-items: center;
`;

const PanelButton = styled(Button)`
  display: flex;
  flex-direction: row;
  margin: 0;
  min-width: 10rem;
  padding: 1rem;
  font-size: 1rem;
`;
