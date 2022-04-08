import React from "react";
import styled from "styled-components";
import Button from "./elements/Button";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "./redux/modules/user";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const is_login = useSelector((state) => state.user.is_login);
  const user = useSelector((state) => state.user);
  const logoutClick = () => {
    sessionStorage.removeItem("token");
    dispatch(actionCreators.deleteUser());
  };
  if (is_login) {
    return (
      <Container>
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1920px-Google_2015_logo.svg.png"></img>
        </div>
        <div>
          <span>{user.user.nickName}님 안녕하세요!</span>
          <Button size="S">내정보</Button>
          <Button size="S" onClick={logoutClick}>
            로그아웃
          </Button>
        </div>
      </Container>
    );
  }
  return (
    <Container>
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1920px-Google_2015_logo.svg.png"></img>
      </div>
      <div>
        <Button
          size="S"
          onClick={() => {
            history.push("/login");
          }}
        >
          로그인
        </Button>
        <Button
          size="S"
          onClick={() => {
            history.push("/signup");
          }}
        >
          회원가입
        </Button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
  div {
    &:first-child {
      img {
        width: 200px;
      }
    }
    &:last-child {
      button {
        margin-left: 20px;
      }
      span {
        font-size: 15px;
      }
    }
  }
`;
export default Header;
