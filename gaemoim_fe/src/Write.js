import React, { useRef } from "react";
import styled from "styled-components";
import Button from "./elements/Button";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators2 } from "./redux/modules/post";
const Write = () => {
  const dispatch = useDispatch();
  const titleref = useRef();
  const FEnumref = useRef();
  const BEnumref = useRef();
  const contentref = useRef();
  const login_user = useSelector((state) => state.user.user);

  const position = login_user?.position;
  const writeBtnClick = () => {
    const frontNum = FEnumref.current.value;
    const title = titleref.current.value;
    const backNum = BEnumref.current.value;
    const content = contentref.current.value;
    if (title === "") {
      window.alert("제목은 필수 입력입니다.");
      return;
    }
    if (frontNum === "0" || backNum === "0") {
      window.alert("필요한 팀원을 선택해주세요");
      return;
    }
    if (content === "") {
      window.alert("내용은 필수 입력입니다.");
      return;
    }

    dispatch(
      actionCreators2.addPostDB(title, frontNum, backNum, content, position)
    );
  };
  return (
    <Container>
      <Titlediv>
        <span>제목</span>
        <input placeholder="프로젝트 팀원 구합니다~!" ref={titleref}></input>
      </Titlediv>
      <Positiondiv>
        <div>
          <label htmlFor="fe">프론트엔드</label>
          <select id="fe" ref={FEnumref}>
            <option value="0">선택해주세요</option>
            <option value="1">1명</option>
            <option value="2">2명</option>
            <option value="3">3명</option>
            <option value="4">4명</option>
          </select>
        </div>
        <div>
          <label htmlFor="be">백엔드</label>
          <select id="be" ref={BEnumref}>
            <option value="0">선택해주세요</option>
            <option value="1">1명</option>
            <option value="2">2명</option>
            <option value="3">3명</option>
            <option value="4">4명</option>
          </select>
        </div>
      </Positiondiv>
      <Contentdiv>
        <span>내용</span>
        <textarea
          placeholder="리액트 고수 구합니다 :)"
          ref={contentref}
        ></textarea>
      </Contentdiv>
      <Buttondiv>
        <Button onClick={writeBtnClick}>작성하기</Button>
      </Buttondiv>
    </Container>
  );
};

const Container = styled.div`
  width: 70%;
  margin: auto;
`;
const Titlediv = styled.div`
  font-size: 25px;
  input {
    width: 100%;
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
`;
const Positiondiv = styled.div`
  display: flex;
  font-size: 18px;
  margin-top: 20px;
  div {
    &:first-child {
      margin-right: 20px;
      select {
        border: none;
        width: 120px;
        height: 28px;
        background-color: #e6d5b8;
        border-radius: 10px;
      }
    }
    &:last-child {
      select {
        border: none;
        width: 120px;
        height: 28px;
        background-color: #e6d5b8;
        border-radius: 10px;
      }
    }
  }
`;
const Contentdiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 25px;
  margin-top: 20px;
  textarea {
    font-size: 20px;
    height: 300px;
    border: 2px solid #e6d5b8;
    transition: 0.2s;
    &:focus {
      outline: none;
      border: 3px solid #ff9b26;
    }
  }
`;
const Buttondiv = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  button {
    margin: auto;
  }
`;
export default Write;
