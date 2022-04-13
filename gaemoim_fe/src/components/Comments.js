import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators3 } from "../redux/modules/comments";

import axiosInstance from "../shared/request";
import { RESP } from "../shared/response";

import CommentEdit from "./CommentEdit";
import { Badge, Grid, Text } from "../elements";




const Comments = (props) => {
  const dispatch = useDispatch();
  const postId = props.postId;
  const all_comment_list = useSelector((state) => state?.comment?.list);
  console.log(all_comment_list)
  // let comment_list = all_comment_list.filter((c) => {
  //       return parseInt(c?.postId) === parseInt(postId);
  //     });

  const login_user = useSelector((state) => state.user.user);

  // console.log(login_user.position)

  const [editing, setEditing] = useState(false);

  const deleteBtnClick = (e) => {
    const commentId = e.target.value;
    dispatch(actionCreators3.deleteCommentDB(commentId));
  };
  const editBtnClick = (e) => {
    console.log(e.target.value);
    dispatch(actionCreators3.getCommentsDB(postId));
    dispatch(actionCreators3.getDetailCommentDB(e.target.value));
    setEditing((curr) => !curr);
  };

  React.useEffect(() => {
    dispatch(actionCreators3.getCommentsDB(postId));
  }, []);


  return (
    <div>
      {editing ? <CommentEdit setEditing={setEditing} /> : null}

      {all_comment_list?.map((v) => {
        return (
          <Grid padding="10px 0">
            <OnecommentBox key={v.commentId}>
              <Grid>
                <Grid margin="5px">
                  <Text bold>{v.nickName}</Text>
                  {login_user?.position === "프론트엔드" ? <Badge>FE</Badge> : <Badge>BE</Badge>}
                  <Grid margin="0 10px">
                    <Text>{v.comment_content}</Text>
                  </Grid>
                </Grid>
              </Grid>

              {v.username === login_user?.username ? (
                <Grid width="fit-content" margin="auto">
                  <Grid width="fit-content">
                    <button onClick={editBtnClick} value={v.commentId}>
                      수정 ✏️
                    </button>
                    <button onClick={deleteBtnClick} value={v.commentId}>
                      삭제 ❌
                    </button>
                  </Grid>
                </Grid>
              ) : null}
            </OnecommentBox>
            <hr />
          </Grid>

        );
      })}

    </div>
  );
};
const OnecommentBox = styled.div`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  min-height: 30px;
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
        width: 70px;
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
