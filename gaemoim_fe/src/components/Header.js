import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/user";
import { Button } from "../elements";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const is_login = useSelector((state) => state.user.is_login);
  const user = useSelector((state) => state.user);
  const logoutClick = () => {
    sessionStorage.removeItem("token");
    dispatch(actionCreators.deleteUser());
    history.replace("/");
  };
  if (is_login) {
    return (
      <Container>
        <div>
          <img
            src="https://blog.kakaocdn.net/dn/uuLiH/btry9n1iMIt/1HgIlc2lE9chKhBBxUVBR0/img.png"
            onClick={() => {
              history.push("/0");
            }}
          />
        </div>
        <div>
          <span>{user.user.nickName}님 안녕하세요!</span>
          <Button size="S" onClick={() => {
            history.push("/mypage");
          }
          }>내정보</Button>
          <Button size="S" color="light" onClick={logoutClick}>
            로그아웃
          </Button>
        </div>
      </Container>
    );
  }
  return (
    <Container>
      <div>
        <img
          onClick={() => {
            history.push("/0");
          }}
          src="https://blog.kakaocdn.net/dn/uuLiH/btry9n1iMIt/1HgIlc2lE9chKhBBxUVBR0/img.png"
        />
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
          color="light"
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

  margin: auto;
  padding: 0px 10px;

  width: 70vw;

  align-items: center;
  justify-content: space-between;
  div {
    &:first-child {
      img {
        width: 150px;
        height: 140px;
      }
    }
    &:last-child {
      button {
        margin-left: 5px;
      }
      span {
        font-size: 15px;
      }
    }
  }
`;
export default Header;
