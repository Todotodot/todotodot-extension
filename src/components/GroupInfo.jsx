import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import List from "./List.jsx";
import * as api from "../api/api";
import IM from "../constants/interactionMessage.js";

const GroupInfo = () => {
  const navigate = useNavigate();
  const [groupData] = useState(useLocation()?.state.item);
  const [groupTitle, setGroupTitle] = useState(groupData?.title);

  const onTitleChange = (e) => {
    e.preventDefault();
    setGroupTitle(e.target.value);
  };

  const onSubmit = (groupData, groupTitle) => {
    api.updateGroup(groupData._id, { title: groupTitle });
    navigate("/", { state: true });
  };

  const onDelete = (groupData) => {
    api.deleteGroup(groupData._id);
    navigate("/", { state: true });
  };

  return (
    <GroupInfoStyle>
      <Nav>
        <span className="back" onClick={() => navigate("/", { state: true })}>
          back
        </span>
        <input value={groupTitle} onChange={onTitleChange} />
        <div className="buttonWrapper">
          <p className="submit" onClick={() => onSubmit(groupData, groupTitle)}>
            submit
          </p>
          <p className="delete" onClick={() => onDelete(groupData)}>
            delete
          </p>
        </div>
      </Nav>
      <MembersWrapper>
        <div className="memberContent">
          {groupData.members.map((member) => (
            <p key={member._id}>{member.name}</p>
          ))}
        </div>
      </MembersWrapper>
      <ListWrapper>
        <List
          items={groupData.todos}
          status={IM.TODOS_FROM_GROUP}
          groupData={groupData}
        />
      </ListWrapper>
    </GroupInfoStyle>
  );
};

const GroupInfoStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 350px;
  height: 500px;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 0.3px solid gray;

  .back {
    box-sizing: border-box;
    width: 75px;
    padding-left: 15px;
    text-decoration: underline;
    cursor: pointer;
  }

  input {
    width: 200px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    border: none;
    outline: none;

    :active {
      border: none;
      outline: none;
    }
  }
  .buttonWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    .submit,
    .delete {
      box-sizing: border-box;
      width: 75px;
      text-align: right;
      margin: 2px 0px;
      padding-right: 15px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const MembersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .memberContent {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 350px;
    height: 50px;
  }

  .button {
    width: 170px;
    height: 30px;
  }
`;

const ListWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 350px;
  height: 400px;
  overflow: scroll;
`;

export default GroupInfo;
