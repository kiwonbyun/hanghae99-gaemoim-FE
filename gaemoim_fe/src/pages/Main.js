import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { actionCreators2 } from "../redux/modules/post";

import { Button } from "../elements";


const Main = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const post_list = useSelector((state) => state.post.list);
  React.useEffect(() => {
    dispatch(actionCreators2.getPostDB());
  }, []);

  if (is_login) {
    return (
      <Container>
        {post_list.map((p, idx) => {
          return (
            <Postbox
              key={p.postId}
              onClick={() => {
                history.push(`/detail/${p.postId}`);
              }}
            >
              <div>
                <p>{p.title}</p>
                <span>
                  프론트엔드 {p.frontNum} | 백엔드 {p.backNum}
                </span>
              </div>
              <div>
                <span>{p.nickName}</span>
                {p.completed ? (
                  <Button color="light">모집완료</Button>
                ) : (
                  <Button>모집중</Button>
                )}
              </div>
            </Postbox>
          );
        })}

        <Addbutton
          onClick={() => {
            history.push("/write");
          }}
        >
          글쓰기
        </Addbutton>
      </Container>
    );
  }
  return (
    <Container>
      {post_list.map((p, idx) => {
        return (
          <Postbox
            key={p.postId}
            onClick={() => {
              history.push(`/detail/${p.postId}`);
            }}
          >
            <div>
              <p>{p.title}</p>
              <span>
                프론트엔드 {p.frontNum} | 백엔드 {p.backNum}
              </span>
            </div>
            <div>
              <span>{p.nickName}</span>
              {p.completed ? (
                <Button color="light">모집완료</Button>
              ) : (
                <Button>모집중</Button>
              )}
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
      margin-right: 20px;
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
  cursor: pointer;
`;

export default Main;
