import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import List from "./List.jsx";
import { getUserInfo } from "../api/api";
import FM from "../constants/filterMethod";
import IM from "../constants/interactionMessage";

const InitialPage = () => {
  const [shouldShowGroup, setShouldShowGroup] = useState(useLocation()?.state);
  const [shouldShowTodo, setShouldShowTodo] = useState(true);
  const [filterMethod, setFilterMethod] = useState("");
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

  const onSelectChange = (e) => {
    setFilterMethod(e.target.value);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <InitialPageStyle>
      <NameWrapper>
        <div />
        <Name>{userData?.name}</Name>
        {shouldShowTodo && !shouldShowGroup ? (
          <select id={FM.METHOD} value={filterMethod} onChange={onSelectChange}>
            <option value={FM.DEFAULT}>Default</option>
            <option value={FM.LATEST}>Latest</option>
            <option value={FM.DONE}>Done</option>
            <option value={FM.ONGOING}>Ongoing</option>
          </select>
        ) : (
          <div />
        )}
      </NameWrapper>
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
            <List
              items={userData.todos}
              status={IM.TODOS}
              filterMethod={filterMethod}
              isVisible={1}
            />
          ) : (
            <List items={userData.groups} status={IM.GROUPS} isVisible={0} />
          ))}
      </ListWrapper>
    </InitialPageStyle>
  );
};

const NameWrapper = styled.div`
  display: flex;
  align-items: center;

  div,
  select {
    width: 75px;
  }
`;

const InitialPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 350px;
  height: 500px;
`;

const Name = styled.h1`
  width: 200px;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  text-align: center;
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
