import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import * as api from "../api/api";
import IM from "../constants/interactionMessage";

const NewSth = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type] = useState(useLocation()?.state.type);
  const [groupId] = useState(useLocation()?.state.groupId);

  const onTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const onContentChange = (e) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const onSubmit = async (type, title, content) => {
    switch (type) {
      case IM.NEW_TODO:
        await api.createTodo({ title, content });
        navigate("/", { state: false });
        break;

      case IM.NEW_GROUP:
        await api.createGroup({ title, content });
        navigate("/", { state: true });
        break;

      case IM.NEW_TODO_FROM_GROUP:
        await api.createGroupTodo(groupId, { title, content });
        navigate("/", { state: true });
        break;
    }
  };

  return (
    <TodoInfoStyle>
      <Nav>
        <span className="back" onClick={() => navigate(-1)}>
          back
        </span>
        <input className="title" value={title} onChange={onTitleChange} />
        <div className="blank" />
      </Nav>
      <ButtonWrapper>
        <button onClick={() => onSubmit(type, title, content)}>Submit</button>
      </ButtonWrapper>
      <Content value={content} onChange={onContentChange} />
    </TodoInfoStyle>
  );
};
const TodoInfoStyle = styled.div`
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

  .title {
    width: 200px;
    text-align: center;
    height: 50px;
    border: none;
    outline: none;
    line-height: 50px;
    font-size: 20px;

    :active {
      border: none;
      outline: none;
    }
  }

  .blank {
    width: 75px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 350px;
  height: 50px;

  button {
    width: 340px;
    height: 30px;
  }
`;

const Content = styled.textarea`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 350px;
  height: 400px;
  overflow: scroll;
  border: none;
  outline: none;
  padding: 10px;

  :active {
    border: none;
    outline: none;
  }
`;

export default NewSth;
