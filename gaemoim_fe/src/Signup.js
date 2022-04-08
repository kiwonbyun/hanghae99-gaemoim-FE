import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "./elements/Button";
import user, { actionCreators } from "./redux/modules/user";

const Signup = () => {
  const dispatch = useDispatch();
  const idref = useRef();
  const nicknameref = useRef();
  const pwref = useRef();
  const pwconfirmref = useRef();
  const positionref = useRef();

  const signupClick = () => {
    const id = idref.current.value;
    const nickname = nicknameref.current.value;
    const pw = pwref.current.value;
    const pwCf = pwconfirmref.current.value;
    const position = positionref.current.value;
    if (id === "" || nickname === "" || pw === "" || pwCf === "") {
      window.alert("아이디,닉네임,비밀번호는 필수입니다.");
      return;
    }
    if (id.length > 12 || id.length < 4) {
      window.alert("아이디는 4~12자로 입력해주세요.");
    }
    if (pw < 6) {
      window.alert("비밀번호는 6자리 이상으로 입력해주세요");
      return;
    }
    if (pw !== pwCf) {
      window.alert("비밀번호 확인이 틀립니다.");
      return;
    }
    if (position.length < 2) {
      window.alert("지원하는 포지션을 선택해주세요.");
      return;
    }

    dispatch(actionCreators.signUpDB(id, nickname, pw, pwCf, position));
  };

  return (
    <Container>
      <div>
        <label htmlFor="ID">아이디</label>
        <input
          id="ID"
          placeholder="영문,숫자 조합 4~12자리"
          ref={idref}
        ></input>
        <label htmlFor="nickname">닉네임</label>
        <input id="nickname" ref={nicknameref}></input>
        <label htmlFor="PW">비밀번호</label>
        <input
          id="PW"
          placeholder="영문,숫자 조합 6자리 이상"
          ref={pwref}
        ></input>
        <label htmlFor="PWConfirm">비밀번호 확인</label>
        <input id="PWConfirm" ref={pwconfirmref}></input>
      </div>
      <div>
        <select ref={positionref}>
          <option value="0">포지션을 선택해주세요</option>
          <option value="프론트엔드">프론트엔드</option>
          <option value="백엔드">백엔드</option>
        </select>
      </div>
      <div>
        <Button onClick={signupClick}>가입하기</Button>
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
