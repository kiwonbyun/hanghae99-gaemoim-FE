import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators3 } from "./redux/modules/comments";
import CommentEdit from "./CommentEdit";
import axiosInstance from "./shared/request";
import { RESP } from "./response";

const Comments = (props) => {
  const dispatch = useDispatch();
  const postId = props.postId;
  const all_comment_list = useSelector((state) => state.comment.list);
  const comment_list = all_comment_list.filter((c) => {
    return parseInt(c.postId) === parseInt(postId);
  });
  const login_user = useSelector((state) => state.user.user);

  const [editing, setEditing] = useState(false);

  const deleteBtnClick = (e) => {
    const commentId = e.target.value;
    dispatch(actionCreators3.deleteCommentDB(commentId));
  };
  const editBtnClick = (e) => {
    console.log(e.target.value);
    dispatch(actionCreators3.getDetailCommentDB(e.target.value));
    setEditing((curr) => !curr);
  };

  React.useEffect(() => {
    dispatch(actionCreators3.getCommentsDB(postId));
  }, []);
  return (
    <div>
      {editing ? <CommentEdit setEditing={setEditing} /> : null}
      {comment_list.map((v) => {
        return (
          <OnecommentBox key={v.commentId}>
            <div>
              <h2>{v.nickName}</h2>
              <p>{v.comment_content}</p>
            </div>
            {v.username === login_user?.username ? (
              <div>
                <button onClick={editBtnClick} value={v.commentId}>
                  수정 ✏️
                </button>
                <button onClick={deleteBtnClick} value={v.commentId}>
                  삭제 ❌
                </button>
              </div>
            ) : null}
          </OnecommentBox>
        );
      })}
    </div>
  );
};
const OnecommentBox = styled.div`
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    &:first-child {
      display: flex;
      align-items: center;
      h2 {
        font-size: 16px;
        margin-right: 30px;
      }
      p {
        font-size: 16px;
      }
    }
    &:last-child {
      button {
        cursor: pointer;
      }
    }
  }
  button {
    background-color: white;
    border: none;
  }
`;
export default Comments;
