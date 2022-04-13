import React, { useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators3 } from "../redux/modules/comments";
import { Permit } from "../elements";



const CommentInput = (props) => {
  const dispatch = useDispatch();
  const contentref = useRef();
  const postId = parseInt(props.postId);
  const user = useSelector((state) => state.user.user);
  const commentBtnClick = () => {
    console.log(user)

    const username = user.username;
    const nickName = user.nickName;
    const position = user.position;
    const comment_content = contentref.current.value;
    if (comment_content === "") {
      window.alert("댓글을 작성해주세요");
      return;
    }

    const data = {
      postId,
      username,
      nickName,
      position,
      comment_content,
    }


    dispatch(
      actionCreators3.addCommentDB(data)
    );
    contentref.current.value = "";
  };

  return (
    <Container>
      <Permit>
        <textarea placeholder="댓글을 입력해주세요!" ref={contentref}></textarea>
        <button onClick={commentBtnClick}>작성하기</button>
      </Permit>
    </Container>
  );
};

const Container = styled.div`

  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  position: relative;
  textarea {
    font-family: 'Pretendard-Regular';

    margin: 20px 0px;
    padding: 10px;

    height: 100px;    
    resize: none;

    border-radius: none;
    font-size: 1.2em;
    &:focus {
      outline: none;
    }

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
