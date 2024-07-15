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
import { toast } from "react-toastify";
import { manageShared } from "../../api/shared";
import { getAvailableUsers as getAvailableUsersAsync } from "../../api/user";
import useDebounce from "../../hooks/common/useDebounce";
import { UserInfo } from "../../types/user/UserInfo";
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
      onClose();
    } else {
      toast.error(response.data);
    }
  };

  return (
    <UserInfoContainer onClick={manageSharedWithUser}>
      {username} ({fullName}){isShared ? <SharedIcon>shared</SharedIcon> : ""}
    </UserInfoContainer>
  );
};

const ShareTodosModal = ({ open, onClose }: ShareTodosModalProps) => {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
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
      getAvailableUsers(currentPage, debouncedQuery);
    }
  }, [open, currentPage, debouncedQuery]);

  const handleChangePage = (e: ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  const getAvailableUsers = async (page: number, searchQuery: string) => {
    const response = await getAvailableUsersAsync(page, searchQuery);

    if (response.success) {
      const { list, totalPages } = response.data!;

      setUsers(list);
      setTotalPages(totalPages);
    } else {
      toast.error(response.message);
    }
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
          {users.map((user) => (
            <SharedUser
              key={user.id}
              id={user.id}
              fullName={user.fullName}
              username={user.username}
              isShared={user.isShared}
              onClose={onClose}
            />
          ))}
        </UsersList>
        <UsersPagination
          size="large"
          count={totalPages}
          defaultPage={1}
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
