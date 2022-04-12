import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";
import { RESP } from "../../shared/response";

//action
const GETCOMMENTS = "getComments";
const ADDCOMMENT = "addComment";
const DELETECOMMENT = "deleteComment";
const GETDETAILCOMMENT = "getDetailComment";
const EDITCOMMENT = "editComment";
//initialState
const initialState = {
  comment_is_loading: false,
  list: [
    {
      postId: 1,
      username: "bkw9603",
      nickName: "닉네임",
      comment_content: "init",
      commentId: 1,
    },
  ],
};
//action creators
const getComments = createAction(GETCOMMENTS, (comment_list) => ({
  comment_list,
}));
const addComment = createAction(ADDCOMMENT, (comment) => ({ comment }));
const deleteComment = createAction(DELETECOMMENT, (commentId) => ({
  commentId,
}));
const getDetailComment = createAction(GETDETAILCOMMENT, (comment) => ({
  comment,
}));
const editComment = createAction(EDITCOMMENT, (comment) => ({ comment }));
//middlewares
const getCommentsDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    const parsedPostId = parseInt(postId);
    try {
      //   const response = await axiosInstance.get(`/api/comments/${parsedPostId}`);
      const response = RESP.COMMENTSPOSTIDGET;
      dispatch(getComments(response));
    } catch (err) {
      console.error(err);
    }
  };
};
const addCommentDB = (postId, username, nickName, comment_content) => {
  return async function (dispatch, getState, { history }) {
    try {
      // const response = await axiosInstance.post(`/api/comments/${postId}`, {
      //   postId,
      //   username,
      //   nickName,
      //   comment_content,
      // });
      const response = RESP.COMMENTSPOSTIDPOST;
      if (response.result === true) {
        dispatch(
          addComment({
            postId: postId,
            username,
            nickName,
            comment_content,
            commentId: Date.now(),
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
};
const deleteCommentDB = (commentId) => {
  return async function (dispatch, getState, { history }) {
    try {
      //   const response = await axiosInstance.delete(`/api/comments/${commentId}`);
      const response = RESP.COMMENTSIDDELETE;
      if (response.result === true) {
        dispatch(deleteComment(commentId));
      }
    } catch (error) {
      console.errer(error);
    }
  };
};
const getDetailCommentDB = (commentId) => {
  return async function (dispatch, getState, { history }) {
    console.log(commentId);
    try {
      //   const response = await axiosInstance.get(`/api/comments/${commentId}`);
      const response = RESP.COMMENTSIDGET;
      dispatch(getDetailComment(response));
    } catch (err) {
      console.error(err);
    }
  };
};
const editCommentDB = (username, nickName, comment_content, commentId) => {
  return async function (dispatch, getState, { history }) {
    try {
      // const response = await axiosInstance.put(`/api/comments/${commentId}`, {
      //   username,
      //   nickName,
      //   comment_content,
      // });
      const response = RESP.COMMENTSIDPUT;
      if (response.result === true) {
        window.alert("댓글이 수정되었습니다.");
        dispatch(
          editComment({
            commentId,
            username,
            nickName,
            comment_content,
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  };
};

//reducer
export default handleActions(
  {
    [GETCOMMENTS]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.comment_list;
        draft.comment_is_loading = true;
      }),
    [ADDCOMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.comment);
      }),
    [DELETECOMMENT]: (state, action) =>
      produce(state, (draft) => {
        const new_comment_list = draft.list.filter((c) => {
          return c.commentId !== parseInt(action.payload.commentId);
        });
        draft.list = [...new_comment_list];
      }),
    [GETDETAILCOMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.editingComment = action.payload.comment;
      }),
    [EDITCOMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list.map((c) => {
          if (c.commentId === action.payload.comment.commentId) {
            c.comment_content = action.payload.comment.comment_content;
          }
        });
      }),
  },
  initialState
);

const actionCreators3 = {
  getCommentsDB,
  addCommentDB,
  deleteCommentDB,
  getDetailCommentDB,
  editCommentDB,
};

export { actionCreators3 };
