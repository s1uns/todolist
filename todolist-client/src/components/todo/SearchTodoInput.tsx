import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useState } from "react";
import { setSearchQueryRequest } from "../../store/actions/queryActions";
import { useAppDispatch } from "../../store/store";
import useDebounce from "../../utils/hooks/useDebounce";
import Input from "../common/Input";

const SearchTodoInput = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleChangeSearchQuery = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const searchQuery = e.target.value.trim();
    setInputValue(searchQuery);
    sendRequest();
  };

  const updateInputValue = () => {
    dispatch(setSearchQueryRequest(inputValue));
  };

  const sendRequest = useDebounce(updateInputValue, 300);

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
