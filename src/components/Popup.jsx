import React from "react";
import { render } from "react-dom";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";

import NewSth from "./NewSth.jsx";
import TodoInfo from "./TodoInfo.jsx";
import GroupInfo from "./GroupInfo.jsx";
import InitialPage from "./InitialPage.jsx";
import GlobalStyle from "../shared/GlobalStyle.js";

const Popup = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/groups/:groupId" element={<GroupInfo />} />
        <Route path="/todos/:todoId" element={<TodoInfo />} />
        <Route path="/new" element={<NewSth />} />
      </Routes>
    </Router>
  );
};

render(
  <>
    <GlobalStyle />
    <Popup />
  </>,
  document.getElementById("root")
);
