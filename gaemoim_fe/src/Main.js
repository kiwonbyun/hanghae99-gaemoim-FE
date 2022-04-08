import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Button from "./elements/Button";

const Main = () => {
  const is_login = useSelector((state) => state.user.is_login);
  console.log(is_login);
  if (is_login) {
    return (
      <Container>
        <Postbox>
          <div>
            <p>토이프로젝트 팀원 구인합니다!</p>
            <span>프론트엔드 2 | 백엔드 3</span>
          </div>
          <div>
            <span>작성자</span>
            <Button>모집중</Button>
          </div>
        </Postbox>
        <Addbutton>글쓰기</Addbutton>
      </Container>
    );
  }
  return (
    <Container>
      <Postbox>
        <div>
          <p>토이프로젝트 팀원 구인합니다!</p>
          <span>프론트엔드 2 | 백엔드 3</span>
        </div>
        <div>
          <span>작성자</span>
          <Button>모집중</Button>
        </div>
      </Postbox>
    </Container>
  );
};

const Container = styled.div`
  width: 70%;
  margin: auto;
`;
const Postbox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  align-items: center;
  padding: 25px 0px;
  border-bottom: 2px solid #e6d5b8;
  margin-bottom: 20px;
  div {
    &:first-child {
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        font-size: 25px;
        margin-top: -5px;
      }
      span {
        margin-top: -10px;
      }
    }
    &:last-child {
      display: flex;
      flex-direction: column;
      align-items: center;
      button {
        margin-top: 10px;
        font-size: 15px;
        width: 70px;
        height: 25px;
      }
    }
  }
`;
const Addbutton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 9999px;
  border: none;
  color: white;
  background-color: #e45826;
  position: fixed;
  bottom: 70px;
  right: 70px;
`;

export default Main;
