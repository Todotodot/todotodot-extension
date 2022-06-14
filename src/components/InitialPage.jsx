import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import List from "./List.jsx";
import { getUserInfo } from "../api/api";
import IM from "../constants/interactionMessage";

const InitialPage = () => {
  const [shouldShowGroup, setShouldShowGroup] = useState(useLocation()?.state);
  const [shouldShowTodo, setShouldShowTodo] = useState(true);
  const [userData, setUserData] = useState({});

  const showTodo = (e) => {
    e.preventDefault();
    setShouldShowTodo(true);
    setShouldShowGroup(false);
  };

  const showGroups = (e) => {
    e.preventDefault();
    setShouldShowTodo(false);
    setShouldShowGroup(true);
  };

  const getUser = async () => {
    const result = await getUserInfo();

    setUserData(result.data.user);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <InitialPageStyle>
      <Name>{userData?.name}</Name>
      <ButtonWrapper>
        <button className="button" onClick={showTodo}>
          Todo
        </button>
        <button className="button" onClick={showGroups}>
          Group
        </button>
      </ButtonWrapper>
      <ListWrapper>
        {Object.keys(userData).length !== 0 &&
          (shouldShowTodo && !shouldShowGroup ? (
            <List items={userData.todos} status={IM.TODOS} />
          ) : (
            <List items={userData.groups} status={IM.GROUPS} />
          ))}
      </ListWrapper>
    </InitialPageStyle>
  );
};

const InitialPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 350px;
  height: 500px;
`;

const Name = styled.h1`
  height: 50px;
  line-height: 50px;
  font-size: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 350px;
  height: 50px;

  .button {
    width: 170px;
    height: 30px;
  }
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: 400px;
  overflow: scroll;
`;

export default InitialPage;
