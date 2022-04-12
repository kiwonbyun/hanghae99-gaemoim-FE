import React from "react";
import styled from "styled-components";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators2 } from "../redux/modules/post";
import { useHistory } from "react-router-dom";

import { Button, Permit } from "../elements";
import { CommentInput, Comments } from "../components";

const Detail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.postid;
  const post = useSelector((state) => state.post.detailPost);
  const login_user = useSelector((state) => state.user.user);

  React.useEffect(() => {
    dispatch(actionCreators2.getDetailPostDB(postId));
  }, []);

  const deleteBtnClick = () => {
    dispatch(actionCreators2.deletePostDB(postId));
  };
  const FEjoinBtnClick = () => {
    dispatch(actionCreators2.frontJoinDB(login_user?.username, post?.postId));
  };
  const BEjoinBtnClick = () => { };
  dispatch(actionCreators2.backJoinDB(login_user?.username, post?.postId));

  if (!post) {
    return <div></div>;
  }
  return (
    <Container>
      <div>
        <Button size="S" color={post.completed ? "light" : null}>
          모집중
        </Button>
        <Button size="S" color={post.completed ? null : "light"}>
          모집완료
        </Button>
      </div>
      <Titlediv>
        <div>
          <h1>{post.title}</h1>
          <span>
            프론트엔드 {post.frontNum}명 | 백엔드 {post.backNum}명
          </span>
        </div>
        <div>
          {login_user?.nickName === post.nickName ? (
            <SmallBtndiv>
              <Smallbutton
                onClick={() => {
                  history.push(`/write/edit/${postId}`);
                }}
              >
                수정
              </Smallbutton>
              <Smallbutton onClick={deleteBtnClick}>삭제</Smallbutton>
            </SmallBtndiv>
          ) : null}
          <h2>{post.nickName}</h2>
        </div>
      </Titlediv>
      <Contentdiv>
        <p>{post.post_content}</p>
        <Permit>
          {login_user?.position === "프론트엔드" ? (
            <button onClick={FEjoinBtnClick}>FE참여하기</button>
          ) : (
            <button onClick={BEjoinBtnClick}>BE참여하기</button>
          )}
        </Permit>
      </Contentdiv>

      <CommentInput postId={postId} />
      <Comments postId={postId} />
    </Container>
  );
};

const Container = styled.div`
  width: 70%;
  margin: auto;
`;
const Titlediv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  div {
    &:first-child {
      span {
        font-size: 15px;
      }
    }
    &:last-child {
      padding-top: 22px;
    }
  }
`;
const Smallbutton = styled.button`
  background-color: #e6d5b8;
  width: 40px;
  height: 25px;
  border-radius: 15px;
  border: none;
  color: white;
  transition: 0.3s;
  &:hover {
    background-color: #ff9b26;
  }
`;
const SmallBtndiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Contentdiv = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  p {
    font-size: 17px;
    height: 180px;
  }
  button {
    background-color: #ff9b26;
    border: none;
    border-radius: 9999px;
    width: 100px;
    height: 50px;
    color: white;
    font-weight: 800;
    font-size: 18px;
    margin: auto;
    margin-bottom: 10px;
  }
`;
export default Detail;
