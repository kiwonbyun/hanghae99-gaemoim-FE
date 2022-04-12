import React, { useRef } from "react";
import styled from "styled-components";
import Button from "./elements/Button";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators3 } from "./redux/modules/comments";

const CommentInput = (props) => {
  const dispatch = useDispatch();
  const contentref = useRef();
  const postId = parseInt(props.postId);
  const user = useSelector((state) => state.user.user);
  const user_position = user?.position;
  const commentBtnClick = () => {
    const username = user.username;
    const nickName = user.nickName;
    const comment_content = contentref.current.value;
    if (comment_content === "") {
      window.alert("댓글을 작성해주세요");
      return;
    }
    dispatch(
      actionCreators3.addCommentDB(
        postId,
        username,
        nickName,
        comment_content,
        user_position
      )
    );
    contentref.current.value = "";
  };

  return (
    <Container>
      <textarea placeholder="댓글을 입력해주세요!" ref={contentref}></textarea>
      <button onClick={commentBtnClick}>작성하기</button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
  position: relative;
  textarea {
    margin: 20px 0px;
    font-size: 17px;
  }
  button {
    position: absolute;
    right: 8px;
    top: 30px;
    background-color: #e6d5b8;
    border: none;
    border-radius: 9999px;
    padding: 5px 9px;
    color: white;
    transition: 0.2s;
    &:hover {
      background-color: #fa9b27;
    }
  }
`;

export default CommentInput;
