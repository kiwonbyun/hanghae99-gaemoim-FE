import React from "react";
import styled from "styled-components";

import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { Button } from "../elements";



const Main2 = (props) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  console.log("파람파람", params);
  const post_list = useSelector((state) => state.post.list);

  console.log("Main : post_list", post_list)

  const user = useSelector((state) => state.user.user)
  const is_login = useSelector((state) => state.user.is_login);
  console.log("Main : user", user, is_login);

  React.useEffect(() => {
    dispatch(postActions.getPostDB());
  }, [dispatch])

  if (is_login) {
    return (
      <Container>
        {post_list.map((post, idx) => {
          return (
            <Postbox key={idx} onClick={() => {
              history.push("/post/" + post.postId)
            }}>
              <div>
                <p>{post.title}</p>
                <span>프론트엔드 {post.frontNum}명 | 백엔드 {post.backNum}명 </span>
              </div>
              <div>
                <span>{post.nickName}</span>
                <Button>모집중</Button>
              </div>
            </Postbox>
          );
        })}
        <Button type="circle" size="S" onClick={() => {
          history.push("/write");
        }}>+</Button>
      </Container>
    );
  }

  return (
    <Container>
      {post_list.map((post, idx) => {
        return (
          <Postbox key={idx} onClick={() => {
            history.push("/post/" + post.postId)
          }}>
            <div>
              <p>{post.title}</p>
              <span>프론트엔드 {post.frontNum}명 | 백엔드 {post.backNum}명 </span>
            </div>
            <div>
              <span>{post.nickName}</span>
              <Button>모집중</Button>
            </div>
          </Postbox>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  width: 70%;
  margin: auto;
`;
const Postbox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  align-items: center;
  padding: 25px 0px;
  border-bottom: 2px solid #e6d5b8;
  margin-bottom: 20px;
  div {
    &:first-child {
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        font-size: 25px;
        margin-top: -5px;
      }
      span {
        margin-top: -10px;
      }
    }
    &:last-child {
      display: flex;
      flex-direction: column;
      align-items: center;
      button {
        margin-top: 10px;
        font-size: 15px;
        width: 70px;
        height: 25px;
      }
    }
  }
`;
const Addbutton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 9999px;
  border: none;
  color: white;
  background-color: #e45826;
  position: fixed;
  bottom: 70px;
  right: 70px;
`;

export default Main2;
