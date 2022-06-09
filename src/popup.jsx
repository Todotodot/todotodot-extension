import React from "react";
import { render } from "react-dom";
import styled from "styled-components";

const Popup = () => {
  return (
    <div>
      <h2>Hello World!</h2>
      <H>Hello world!</H>
    </div>
  );
};

const H = styled.div`
  font-size: 50px;
  color: teal;
`;

render(<Popup />, document.getElementById("root"));
