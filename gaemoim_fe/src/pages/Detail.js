import React from "react";
import styled from "styled-components";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators2 } from "../redux/modules/post";
import { useHistory } from "react-router-dom";

import { Badge, Button, Grid, Input, Permit, Text } from "../elements";
import { CommentInput, Comments } from "../components";

const Detail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.postid;
  const post = useSelector((state) => state.post.detailPost);
  const login_user = useSelector((state) => state.user.user);
  const completed = useSelector((state) => state.post.detailPost.completed)



  React.useEffect(() => {
    dispatch(actionCreators2.getDetailPostDB(postId));
  }, []);

  const deleteBtnClick = () => {
    dispatch(actionCreators2.deletePostDB(postId));
  };
  const FEjoinBtnClick = () => {
    dispatch(actionCreators2.frontJoinDB(login_user?.username, post?.postId));
  };
  const BEjoinBtnClick = () => {
    dispatch(actionCreators2.backJoinDB(login_user?.username, post?.postId));
  };


  if (!post) {
    return <div></div>;
  }
  return (
    <Container>
      <Grid is_flex>
        {/* <Badge>모집중</Badge>
        <Badge type="모집완료">모집완료</Badge> */}
        {completed ? (<Badge type="모집완료">모집완료</Badge>) : (<Badge>모집중</Badge>)}        
      </Grid>
      <Grid is_flex>
        <Grid>
          <Grid margin="8px 0">
            <Text size="L">{post.title}</Text>
          </Grid>
          <Grid margin="4px 0">
            <Text>프론트엔드 {post.frontNum}명 | 백엔드 {post.backNum}명</Text>
          </Grid>
        </Grid>
        
        <Grid width="fit-content" is_flex>

          <Grid width="10vw" margin="0 5px">
            <Text bold align="right">{post.nickName}</Text>
          </Grid>
          <Permit>
            <Grid is_flex>
              <Grid width="fit-content" margin="0 5px">
                <Button size="XS" onClick={() => { history.push(`/write/edit/${postId}`); }}>수정</Button>
              </Grid>
              <Grid>
                <Button size="XS" color="light" onClick={deleteBtnClick}>삭제</Button>
              </Grid>
            </Grid>
          </Permit>
        </Grid>
      </Grid>
      <hr />
      <Grid>
        <Grid margin="20px 0">
          <Box>
            <Text>{post.post_content}</Text>
          </Box>
        </Grid>
        <Grid width="fit-content" margin="40px auto">
          <Permit>
            {login_user?.position === "프론트엔드" ? (
              <Button type="circle" onClick={FEjoinBtnClick}>FE참여하기</Button>
            ) : (
              <Button type="circle" onClick={BEjoinBtnClick}>BE참여하기</Button>
            )}
          </Permit>
        </Grid>
        <hr />
      </Grid>
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
const Box = styled.div`
  min-height: 100px;
`;


export default Detail;
