import React from "react";
import styled from "styled-components";
import Button from "./elements/Button";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators as userAction } from "./redux/modules/user";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const id = React.useRef(null);
  const pwd = React.useRef(null);

  const login = () => {
    const username = id.current.value;
    const password = pwd.current.value;

    const check = /^[a-z0-9]{4,12}$/;

    if (!check.test(username)) {
      return window.alert(" 아이디는 4~12자 이내의 영문 소문자와 숫자만 입력 가능합니다.  ")
    }
    if (password.length < 6) {
      return window.alert(" 6자 이상의 비밀번호를 입력해주세요. ")
    }
    if (password.search(username) > -1) {
      return window.alert("비밀번호에 아이디가 포함되어있습니다.")
    }

    console.log("Login : user_data ", username, "/" , password);
    dispatch(userAction.logInDB(username, password))
  }


  return (
    <Container>
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1920px-Google_2015_logo.svg.png"></img>
      </div>
      <div>
        <label htmlFor="ID">아이디</label>
        <input id="ID" placeholder="아이디를 입력해주세요" ref={id}></input>
        <label htmlFor="PW">비밀번호</label>
        <input
          id="PW"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          ref={pwd}
        ></input>
      </div>
      <div>
        <Button onClick={login}>로그인</Button>
        <Button color="light" onClick={() => {
          history.push("/");
        }}>가입하기</Button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    &:first-child {
      img {
        width: 350px;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-direction: column;
      width: 50%;
      font-size: 20px;
      input {
        margin-top: 5px;
        font-size: 20px;
        border: none;
        border-bottom: 2px solid #e6d5b8;
        outline: none;
        transition: 0.2s;
        &:focus {
          border-bottom: 3px solid #ff9b26;
        }
      }
      label {
        margin-top: 25px;
      }
    }
    &:last-child {
      margin: auto;
      margin-top: 50px;
      width: 400px;
      display: flex;
      justify-content: space-around;
    }
  }
`;

export default Login;
