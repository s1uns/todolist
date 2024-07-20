import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useDebounce from "../../hooks/common/useDebounce";
import { handleSharedUserRequest } from "../../store/actions/queryActions";
import {
  getSharersRequest,
  setSearchQueryRequest
} from "../../store/actions/sharersActions";
import { RootState, useAppDispatch } from "../../store/store";
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
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState<string>("");
  const { list, totalUsers, searchQuery } = useSelector(
    (state: RootState) => state.sharers
  );
  const sharersContainerRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(searchValue);
  ``;
  const handleChangeSearchQuery = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const searchQuery = e.target.value.trim();
    setSearchValue(searchQuery);
  };

  const fetchMoreUsers = async () => {
    dispatch(getSharersRequest());
  };

  useEffect(() => {
    dispatch(setSearchQueryRequest(debouncedQuery));
  }, [debouncedQuery]);

  useEffect(() => {
    sharersContainerRef.current?.scroll(0, 0);
    dispatch(getSharersRequest(true));
  }, [searchQuery]);

  const hasMore = useMemo(() => list.length < totalUsers, [list, totalUsers]);
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
      <UsersListContainer ref={sharersContainerRef}>
        <div>
          {list.map((user) => (
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
