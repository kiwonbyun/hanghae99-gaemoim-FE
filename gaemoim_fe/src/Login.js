import React, { useRef } from "react";
import styled from "styled-components";
import Button from "./elements/Button";
import { useDispatch } from "react-redux";
import { actionCreators } from "./redux/modules/user";

const Login = () => {
  const dispatch = useDispatch();
  const idref = useRef();
  const pwref = useRef();

  const loginClick = () => {
    const id = idref.current.value;
    const pw = pwref.current.value;

    if (id === "" || pw === "") {
      window.alert("아이디 혹은 비밀번호가 공란입니다. 채워주세요");
      return;
    }
    if (id.length > 12 || id.length < 4) {
      window.alert("아이디는 4~12자 입니다.");
      return;
    }
    if (pw < 6) {
      window.alert("비밀번호는 6자리 이상입니다.");
      return;
    }
    dispatch(actionCreators.logInDB(id, pw));
  };
  return (
    <Container>
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1920px-Google_2015_logo.svg.png"></img>
      </div>
      <div>
        <label htmlFor="ID">아이디</label>
        <input id="ID" placeholder="아이디를 입력해주세요" ref={idref}></input>
        <label htmlFor="PW">비밀번호</label>
        <input
          id="PW"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          ref={pwref}
        ></input>
      </div>
      <div>
        <Button onClick={loginClick}>로그인</Button>
        <Button color="light">가입하기</Button>
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
