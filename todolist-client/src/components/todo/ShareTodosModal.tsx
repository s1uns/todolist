import { ChangeEvent, useEffect, useState } from "react";

import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  List,
  ListItem,
  Modal,
  Pagination,
  Typography
} from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { manageShared } from "../../api/shared";
import useDebounce from "../../hooks/common/useDebounce";
import {
  getAvailableUsersRequest,
  setCurrentPageRequest,
  setSearchQueryRequest
} from "../../store/actions/userActions";
import { RootState, useAppDispatch } from "../../store/store";
import Input from "../common/Input";

interface ShareTodosModalProps {
  open: boolean;
  onClose: () => void;
}

interface SharedUserProps {
  id: string;
  fullName: string;
  username: string;
  isShared: boolean;
  onClose: () => void;
}

const SharedUser = (props: SharedUserProps) => {
  const { id, username, isShared, onClose, fullName } = props;

  const manageSharedWithUser = async () => {
    const response = await manageShared(id);

    if (response.success) {
      toast.success(response.data);
    } else {
      toast.error(response.data);
    }
  };

  return (
    <UserInfoContainer onClick={manageSharedWithUser}>
      {username} ({fullName}){isShared ? <SharedIcon>shared</SharedIcon> : null}
    </UserInfoContainer>
  );
};

const ShareTodosModal = ({ open, onClose }: ShareTodosModalProps) => {
  const dispatch = useAppDispatch();

  const { currentPage, searchQuery, totalPages, list } = useSelector(
    (state: RootState) => state.availableUsers
  );
  const [inputValue, setInputValue] = useState("");
  const debouncedQuery = useDebounce(inputValue);

  const handleChangeSearchQuery = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const searchQuery = e.target.value.trim();
    setInputValue(searchQuery);
  };

  useEffect(() => {
    if (open) {
      dispatch(getAvailableUsersRequest());
    }
  }, [open, currentPage, searchQuery]);

  useEffect(() => {
    dispatch(setSearchQueryRequest(debouncedQuery));
  }, [debouncedQuery]);

  const handleChangePage = (e: ChangeEvent<unknown>, newPage: number) => {
    dispatch(setCurrentPageRequest(newPage));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ShareWithUserModal>
        <Typography id="modal-modal-title" variant="h3" component="h2">
          Share your todos
        </Typography>
        <Typography id="modal-modal-description" variant="h5" sx={{ mt: 2 }}>
          Select the user to share your todos with from the list below
        </Typography>
        <Input
          placeholder="Start entering the username..."
          endAdornment={<SearchIcon />}
          ignoreErrors={true}
          value={inputValue}
          onChange={handleChangeSearchQuery}
          autoFocus={true}
        />
        <UsersList>
          {list.map((user) => (
            <SharedUser
              key={user.id}
              id={user.id}
              fullName={user.fullName}
              username={user.username}
              isShared={user.isShared ? user.isShared : false}
              onClose={onClose}
            />
          ))}
        </UsersList>
        <UsersPagination
          size="large"
          count={totalPages}
          page={currentPage}
          variant="outlined"
          shape="rounded"
          onChange={handleChangePage}
        />
      </ShareWithUserModal>
    </Modal>
  );
};

export default ShareTodosModal;

const ShareWithUserModal = styled(Box)`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 30rem;
  background-color: white;
  border: 2px solid #000;
  border-radius: 2rem;
  box-shadow: 24;
  padding: 2rem;
`;

const UsersList = styled(List)({
  marginTop: "2rem",
  width: "100%",
  fontSize: "2rem"
});

const UserInfoContainer = styled(ListItem)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  border: ".03rem solid black",
  marginBottom: ".3rem",

  "&:hover": {
    backgroundColor: "#F5F5F5",
    cursor: "pointer",
    transform: "translateY(-.1rem)"
  }
});

const UsersPagination = styled(Pagination)({
  position: "absolute",
  bottom: "2rem",
  display: "flex",
  justifyContent: "center",
  width: "100%"
});

const SharedIcon = styled(Typography)`
  position: absolute;
  top: 0;
  right: 0.5rem;
  font-size: 1rem;
  opacity: 0.6;
`;
