import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import * as api from "../api/api";
import IM from "../constants/interactionMessage";

const TodoInfo = () => {
  const navigate = useNavigate();
  const [todo] = useState(useLocation()?.state.item);
  const [groupId] = useState(useLocation()?.state.id);
  const [status] = useState(useLocation()?.state.status);
  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(todo.content);

  const titleOnChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const contentOnChange = (e) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const onSubmit = (todo, status) => {
    switch (status) {
      case IM.TODOS:
        api.updateTodo(todo._id, { title, content });
        return navigate("/", { state: false });

      case IM.TODOS_FROM_GROUP:
        api.updateGroupTodo(groupId, todo._id, { title, content });
        return navigate("/", { state: true });
    }
  };

  const onDelete = (todo, status) => {
    switch (status) {
      case IM.TODOS:
        api.deleteTodo(todo._id);
        return navigate("/", { state: false });

      case IM.TODOS_FROM_GROUP:
        api.deleteGroupTodo(groupId, todo._id);
        return navigate("/", { state: true });
    }
  };

  return (
    <TodoInfoStyle>
      <Nav>
        <span className="back" onClick={() => navigate(-1)}>
          back
        </span>
        <input className="title" value={title} onChange={titleOnChange} />
        <div className="blank" />
      </Nav>
      <ButtonWrapper hasDone={todo.isCompleted}>
        <button className="edit" onClick={() => onSubmit(todo, status)}>
          Submit
        </button>
        <button className="delete" onClick={() => onDelete(todo, status)}>
          Delete
        </button>
      </ButtonWrapper>
      <Content value={content} onChange={contentOnChange} />
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
    width: 170px;
    height: 30px;
  }

  .edit {
    pointer-events: ${({ hasDone }) => (hasDone ? "none" : "initial")};
  }
`;

const Content = styled.textarea`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  flex-direction: column;
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

export default TodoInfo;
