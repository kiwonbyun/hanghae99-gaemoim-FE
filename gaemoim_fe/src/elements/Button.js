import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { size, color, children } = props;

  return (
    <React.Fragment>
      <Btn {...props}>{children}</Btn>
    </React.Fragment>
  );
};

Button.defaultProps = {
  children: null,
  size: "",
};

const Btn = styled.button`
  font-family: "Pretendard-Regular";
  width: ${(props) => (props.size == "S" ? "100px;" : "150px")};
  height: ${(props) => (props.size == "S" ? "30px;" : "50px")};
  border: none;
  border-radius: 20px;
  color: #fff;
  font-size: ${(props) => (props.size == "S" ? "1.2em;" : "1.7em")};
  font-weight: 800;
  background-color: ${(props) =>
    props.color == "light" ? "#E6D5B8" : "#FF9B26"};
  transition: 0.3s;
  &:hover {
    background-color: ${(props) =>
      props.color == "light" ? "#C2B08F" : "#FF7A00"};
  }
`;

export default Button;
