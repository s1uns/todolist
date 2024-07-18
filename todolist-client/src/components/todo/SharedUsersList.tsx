import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getTodosSharers } from "../../api/user";
import useDebounce from "../../hooks/common/useDebounce";
import { handleSharedUserRequest } from "../../store/actions/queryActions";
import { getUser } from "../../store/slices/authSlice";
import { RootState, useAppDispatch } from "../../store/store";
import { TodosSharersCollection } from "../../types/user/TodosSharersCollection";
import CheckBox from "../common/CheckBox";
import Input from "../common/Input";
import IntersectionObserverComponent from "../common/IntersectionObserverComponent";

interface UserInfoProps {
  userId: string;
  username: string;
  fullName: string;
}

const UserInfoContainer = (props: UserInfoProps) => {
  const { userId, username, fullName } = props;
  const { selectedSharers } = useSelector((state: RootState) => state.query);
  const dispatch = useAppDispatch();

  const handleCheckUser = () => {
    dispatch(handleSharedUserRequest(userId));
  };

  const isChecked = useMemo(
    () => selectedSharers.indexOf(userId) > -1,
    [selectedSharers]
  );

  return (
    <UserInfoDiv>
      <CheckBox
        label={`${username} (${fullName})`}
        isChecked={isChecked}
        onChange={handleCheckUser}
      />
    </UserInfoDiv>
  );
};

const SharedUsersContainer = () => {
  const { userId, username } = useSelector(getUser);
  const [searchValue, setSearchValue] = useState<string>("");
  const [sharedUsers, setSharedUsers] = useState<TodosSharersCollection>({
    list: [],
    totalUsers: 0
  });

  const debouncedQuery = useDebounce(searchValue);
  ``;
  const handleChangeSearchQuery = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const searchQuery = e.target.value.trim();
    setSearchValue(searchQuery);
  };

  const fetchMoreUsers = async (overwrite?: boolean) => {
    const newUsers = await getTodosSharers(
      overwrite ? 0 : sharedUsers.list.length,
      debouncedQuery
    );
    if (newUsers.data) {
      setSharedUsers((oldUsers) =>
        overwrite
          ? {
              list: newUsers.data!.list,
              totalUsers: newUsers.data!.totalUsers
            }
          : {
              list: [...oldUsers.list, ...newUsers.data!.list],
              totalUsers: newUsers.data!.totalUsers
            }
      );
    }
  };

  useEffect(() => {
    fetchMoreUsers(true);
  }, [debouncedQuery]);

  const hasMore = useMemo(
    () => sharedUsers.list.length < sharedUsers.totalUsers,
    [sharedUsers]
  );
  return (
    <StyledSharedUsersContainer>
      <Input
        placeholder="Start entering the username..."
        endAdornment={<SearchIcon />}
        ignoreErrors={true}
        value={searchValue}
        onChange={handleChangeSearchQuery}
        autoFocus={true}
      />
      <UsersListContainer>
        <div>
          {sharedUsers.list.map((user) => (
            <UserInfoContainer
              key={user.id}
              userId={user.id}
              username={user.username}
              fullName={user.fullName}
            />
          ))}
          <IntersectionObserverComponent
            hasMore={hasMore}
            fetchMore={fetchMoreUsers}
          />
        </div>
      </UsersListContainer>
    </StyledSharedUsersContainer>
  );
};

export default SharedUsersContainer;

const StyledSharedUsersContainer = styled.div`
  margin-top: 1rem;
  min-width: 17rem;
  height: 15rem;
  display: flex;
  flex-direction: column;
`;

const UsersListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const UserInfoDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
