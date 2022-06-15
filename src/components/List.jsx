import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import FM from "../constants/filterMethod";
import IM from "../constants/interactionMessage";

const List = React.memo(
  ({ items, status, groupData, filterMethod, isVisible }) => {
    const navigate = useNavigate();

    const clickItem = (item, status, groupData) => {
      switch (status) {
        case IM.TODOS:
          return navigate(`/todos/${item._id}`, { state: { item, status } });

        case IM.GROUPS:
          return navigate(`/groups/${item._id}`, { state: { item, status } });

        case IM.TODOS_FROM_GROUP:
          return navigate(`/todos/${item._id}`, {
            state: { item, status, id: groupData._id },
          });
      }
    };

    const addSTH = (status, groupData) => {
      switch (status) {
        case IM.TODOS:
          return navigate("/new", { state: { type: IM.NEW_TODO } });

        case IM.GROUPS:
          return navigate("/new", { state: { type: IM.NEW_GROUP } });

        case IM.TODOS_FROM_GROUP:
          return navigate("/new", {
            state: { type: IM.NEW_TODO_FROM_GROUP, groupId: groupData._id },
          });
      }
    };

    const filterByMethod = (method, items) => {
      const doneTodoSortedByDate = items.done().sortByDate();
      const onGoingTodoSortedByDate = items.onGoing().sortByDate();

      switch (method) {
        case FM.LATEST:
          return items.sortByDate();

        case FM.DONE:
          return doneTodoSortedByDate;

        case FM.ONGOING:
          return onGoingTodoSortedByDate;

        case FM.DEFAULT:
        default:
          return [...onGoingTodoSortedByDate, ...doneTodoSortedByDate];
      }
    };

    const onClickToComplete = (e, todo) => {
      e.stopPropagation();
      switch (status) {
        case IM.TODOS:
          return chrome.tabs.create({
            url: `http://localhost:3000/inGame/todos/${todo._id}`,
          });

        case IM.TODOS_FROM_GROUP:
          return chrome.tabs.create({
            url: `http://localhost:3000/inGame/${groupData._id}/todos/${todo._id}`,
          });
      }
    };

    return (
      <>
        <AddButton onClick={() => addSTH(status, groupData)}>+</AddButton>
        <ul>
          {filterByMethod(filterMethod, items).map((item) => (
            <Li
              hasDone={item.isCompleted}
              visibility={isVisible}
              key={item._id}
              onClick={() => clickItem(item, status, groupData)}
            >
              {item.title}
              <div
                type="checkbox"
                className="checkbox"
                onClick={(e) => onClickToComplete(e, item)}
              />
            </Li>
          ))}
        </ul>
      </>
    );
  }
);

const AddButton = styled.div`
  position: relative;
  width: 350px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 0.1px solid gray;
  border-radius: 5px;
  margin: 3px;
  cursor: pointer;
`;

const Li = styled.li`
  position: relative;
  width: 350px;
  height: 30px;
  text-align: right;
  line-height: 30px;
  border: 0.1px solid gray;
  border-radius: 5px;
  margin: 3px;
  cursor: pointer;
  background-color: ${({ hasDone }) => (hasDone ? "gray" : "none")};

  .checkbox {
    border: 1px solid black;
    position: absolute;
    top: 7.5px;
    left: 7.5px;
    width: 14px;
    height: 14px;
    pointer-events: ${({ hasDone }) => (hasDone ? "none" : "initial")};
    background-color: ${({ hasDone }) => (hasDone ? "darkgray" : "none")};
    visibility: ${({ visibility }) => (visibility ? "visible" : "hidden")};
  }
`;

Array.prototype.sortByDate = function () {
  return this.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
};

Array.prototype.done = function () {
  return this.filter((item) => item.isCompleted);
};

Array.prototype.onGoing = function () {
  return this.filter((item) => !item.isCompleted);
};

export default List;
