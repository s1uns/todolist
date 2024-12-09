import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useEffect, useState } from "react";
import useDebounce from "../../hooks/common/useDebounce";
import { setSearchQueryRequest } from "../../store/actions/queryActions";
import { useAppDispatch } from "../../store/store";
import Input from "../common/Input";

const SearchTodoInput = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedQuery = useDebounce(inputValue);
  const dispatch = useAppDispatch();

  const handleChangeSearchQuery = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const searchQuery = e.target.value.trim();
    setInputValue(searchQuery);
  };

  useEffect(() => {
    dispatch(setSearchQueryRequest(inputValue));
  }, [debouncedQuery]);

  return (
    <Input
      endAdornment={<SearchIcon />}
      ignoreErrors={true}
      value={inputValue}
      onChange={handleChangeSearchQuery}
    />
  );
};

export default SearchTodoInput;
