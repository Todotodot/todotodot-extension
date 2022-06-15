import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import IM from "../constants/interactionMessage";

const List = ({ items, status, groupData }) => {
  const navigate = useNavigate();

  const clickItem = (item, status, groupData) => {
    switch (status) {
      case IM.TODOS:
        navigate(`/todos/${item._id}`, { state: { item, status } });
        break;

      case IM.GROUPS:
        navigate(`/groups/${item._id}`, { state: { item, status } });
        break;

      case IM.TODOS_FROM_GROUP:
        navigate(`/todos/${item._id}`, {
          state: { item, status, id: groupData._id },
        });
        break;
    }
  };

  const addSTH = (status, groupData) => {
    switch (status) {
      case IM.TODOS:
        navigate("/new", { state: { type: IM.NEW_TODO } });
        break;

      case IM.GROUPS:
        navigate("/new", { state: { type: IM.NEW_GROUP } });
        break;

      case IM.TODOS_FROM_GROUP:
        navigate("/new", {
          state: { type: IM.NEW_TODO_FROM_GROUP, groupId: groupData._id },
        });
        break;
    }
  };

  return (
    <ul>
      {items.map((item) => (
        <Li key={item._id} onClick={() => clickItem(item, status, groupData)}>
          {item.title}
        </Li>
      ))}
      <Li onClick={() => addSTH(status, groupData)}>+</Li>
    </ul>
  );
};

const Li = styled.li`
  width: 350px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 0.1px solid gray;
  border-radius: 5px;
  margin: 3px;
  cursor: pointer;
`;

export default List;
