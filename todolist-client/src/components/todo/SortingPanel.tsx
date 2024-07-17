import styled from "@emotion/styled";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { setSortingRequest } from "../../store/actions/queryActions";
import { RootState, useAppDispatch } from "../../store/store";
import {
  SORT_CREATED_AT,
  SORT_TITLE,
  SORT_UPDATED_AT
} from "../../utils/constants";

const sortingOptions = [
  { value: SORT_CREATED_AT, label: "Creation time" },
  { value: SORT_UPDATED_AT, label: "Last update time" },
  { value: SORT_TITLE, label: "Title" }
];

interface SortingItemProps {
  value: number;
  label: string;
}

const SortingItem = (props: SortingItemProps) => {
  const { value, label } = props;

  const { sortBy, isAscending } = useSelector(
    (state: RootState) => state.query
  );
  const isSelected = useMemo(() => value === sortBy, [sortBy]);

  const dispatch = useAppDispatch();

  const handleSetSortingItem = () => {
    dispatch(setSortingRequest(value));
  };

  return (
    <StyledSortingItem onClick={handleSetSortingItem} isSelected={isSelected}>
      {label} {isSelected && (isAscending ? "↑" : "↓")}
    </StyledSortingItem>
  );
};

const SortingPanel = () => {
  return (
    <>
      {sortingOptions.map((option) => (
        <SortingItem
          key={option.value}
          value={option.value}
          label={option.label}
        />
      ))}
    </>
  );
};

export default SortingPanel;

interface StyledSortingItemProps {
  isSelected: boolean;
}

const StyledSortingItem = styled.div`
  width: 100%;
  border: ${(props: StyledSortingItemProps) =>
    props.isSelected ? ".05rem solid blue" : ".05rem solid transparent"};
  height: 2rem;
  padding: 1rem;
  text-align: center;
  font-size: 1.5rem;
  background-color: #6b63ff;
  color: white;
  margin-bottom: 0.2rem;
  border-radius: 0.5rem;

  &:hover {
    cursor: pointer;
  }
`;
