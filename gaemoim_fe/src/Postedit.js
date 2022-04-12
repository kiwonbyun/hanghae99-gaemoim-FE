import React, { useRef } from "react";
import styled from "styled-components";
import Button from "./elements/Button";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators2 } from "./redux/modules/post";
import { useParams } from "react-router-dom";
const Postedit = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const postId = parseInt(params.postid);
  const titleref = useRef();
  const FEnumref = useRef();
  const BEnumref = useRef();
  const contentref = useRef();
  const post = useSelector((state) => state.post.detailPost);
  console.log(post);
  React.useEffect(() => {
    dispatch(actionCreators2.getDetailPostDB(postId));
  }, []);
  const editBtnClick = () => {
    const title = titleref.current.value;
    const FEnum = FEnumref.current.value;
    const BEnum = BEnumref.current.value;
    const content = contentref.current.value;
    dispatch(actionCreators2.editPostDB(postId, title, FEnum, BEnum, content));
  };

  if (!post) {
    return <div></div>;
  }
  return (
    <Container>
      <Titlediv>
        <span>제목</span>
        <input
          placeholder="프로젝트 팀원 구합니다~!"
          ref={titleref}
          defaultValue={post.title}
        ></input>
      </Titlediv>
      <Positiondiv>
        <div>
          <label htmlFor="fe">프론트엔드</label>
          <select id="fe" ref={FEnumref} defaultValue={post.frontNum}>
            <option value="0">선택해주세요</option>
            <option value="1">1명</option>
            <option value="2">2명</option>
            <option value="3">3명</option>
            <option value="4">4명</option>
          </select>
        </div>
        <div>
          <label htmlFor="be">백엔드</label>
          <select id="be" ref={BEnumref} defaultValue={post.backNum}>
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
          defaultValue={post.post_content}
        ></textarea>
      </Contentdiv>
      <Buttondiv>
        <Button onClick={editBtnClick}>수정하기</Button>
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
export default Postedit;
