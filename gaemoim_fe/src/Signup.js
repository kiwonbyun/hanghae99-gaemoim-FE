import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import user, { actionCreators as userAction } from "./redux/modules/user";

import styled from "styled-components";
import Button from "./elements/Button";

const Signup = () => {
  const dispatch = useDispatch();
  
  const username = React.useRef(null);
  const nickName = React.useRef(null);
  const password = React.useRef(null);
  const passwordCheck = React.useRef(null);
  const position = React.useRef(null);

  const signUp = () => {
    const user_data = {
      username: username.current.value,
      nickName: nickName.current.value,
      password: password.current.value,
      passwordCheck: passwordCheck.current.value,
      position: position.current.value,
    }

    if ( user_data.username === "" || user_data.nickName === "" || user_data.password === "" || user_data.passwordCheck === "") {
      return window.alert("항목을 모두 입력해주세요!");
    }
    if ( user_data.position === "0") {
      return window.alert("포지션을 선택해주세요!");
    }
    if ( user_data.password !== user_data.passwordCheck ) {
      return window.alert("비밀번호가 다릅니다!");
    }

    console.log("SignUp : user_data", user_data);
    dispatch(userAction.signUpDB(user_data));
  }


  return (
    <Container>
      <div>
        <label htmlFor="ID" >아이디</label>
        <input
          id="ID"
          placeholder="영문,숫자 조합 4~12자리"
          ref={username}
        ></input>
        <label htmlFor="nickname" >닉네임</label>
        <input id="nickname" ref={nickName}></input>
        <label htmlFor="PW" >비밀번호</label>
        <input
          id="PW"
          placeholder="영문,숫자 조합 6자리 이상"
          ref={password}
        ></input>
        <label htmlFor="PWConfirm" >비밀번호 확인</label>
        <input id="PWConfirm" ref={passwordCheck}></input>
      </div>
      <div>
        <select ref={position}>
          <option value="0">포지션을 선택해주세요</option>
          <option value="프론트엔드">프론트엔드</option>
          <option value="백엔드">백엔드</option>
        </select>
      </div>
      <div>
        <Button onClick={signUp}>가입하기</Button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    margin-top: 50px;
    &:first-child {
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
    &:nth-child(2) {
      select {
        border: none;
        width: 200px;
        height: 40px;
        font-size: 20px;
        background-color: #e6d5b8;
        border-radius: 10px;
      }
    }
  }
`;

export default Signup;
