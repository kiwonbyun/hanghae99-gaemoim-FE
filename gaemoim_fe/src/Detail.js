import React from "react";
import styled from "styled-components";
import CommentInput from "./CommentInput";
import Comments from "./Comments";
import Button from "./elements/Button";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators2 } from "./redux/modules/post";
import { useHistory } from "react-router-dom";
import Permit from "./elements/Permit";

const Detail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.postid;
  const post = useSelector((state) => state.post.detailPost);
  const login_user = useSelector((state) => state.user.user);
  let frontComplete;
  let backComplete;
  if (post?.frontNum === post?.frontCnt) {
    frontComplete = true;
  } else {
    frontComplete = false;
  }
  if (post?.backNum === post?.backCnt) {
    backComplete = true;
  } else {
    backComplete = false;
  }

  React.useEffect(() => {
    dispatch(actionCreators2.getDetailPostDB(postId));
  }, []);

  const deleteBtnClick = () => {
    dispatch(actionCreators2.deletePostDB(postId));
  };
  const FEjoinBtnClick = () => {
    dispatch(actionCreators2.frontJoinDB(post.postId));
  };
  const BEjoinBtnClick = () => {
    dispatch(actionCreators2.backJoinDB(post.postId));
  };

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
          <Posttitle>{post.title}</Posttitle>
          <span>
            프론트엔드 {post.frontNum}명 | 백엔드 {post.backNum}명
          </span>
          <span style={{ marginLeft: "90px" }}>{post.createdAt}</span>
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
          <h2>
            {post.nickName}/{post.position}
          </h2>
        </div>
      </Titlediv>
      <Contentdiv>
        <p>{post.post_content}</p>
        <div>
          {frontComplete ? (
            <Button onClick={FEjoinBtnClick} color="light">
              FE마감
            </Button>
          ) : (
            <Button onClick={FEjoinBtnClick}>FE참여하기</Button>
          )}
          {backComplete ? (
            <Button onClick={BEjoinBtnClick} color="light">
              BE마감
            </Button>
          ) : (
            <Button onClick={BEjoinBtnClick}>BE참여하기</Button>
          )}
        </div>
      </Contentdiv>
      <Permit>
        <CommentInput postId={postId} />
      </Permit>
      <Comments postId={postId} />
    </Container>
  );
};
const Posttitle = styled.h1`
  display: flex;
`;

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
      h1 {
        text-align: center;
      }
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
  width: 50px;
  height: 34px;
  border-radius: 20px;
  border: none;
  color: white;
  font-size: 16px;
  transition: 0.3s;
  margin-bottom: -5px;
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
  /* border-bottom: 1px solid black; */
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.05);
  p {
    font-size: 17px;
    height: 180px;
  }
  button {
    /* background-color: #ff9b26; */
    border: none;
    border-radius: 9999px;
    width: 100px;
    height: 100px;
    color: white;
    font-weight: 800;
    font-size: 18px;
    margin: auto;
    margin-bottom: 10px;
  }
  div {
    display: flex;
  }
`;
export default Detail;
