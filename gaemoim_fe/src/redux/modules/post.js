import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";

import moment from "moment";

import { RESP } from "../../shared/response";



//action
const GETPOST = "getPost";
const GETDETAILPOST = "getDetailPost";
const ADDPOST = "addPost";
const DELETEPOST = "deletePost";
const EDITPOST = "editPost";
const FEJOIN = "Frontjoin";
const BEJOIN = "Backjoin";

//initial
const initialState = {
  is_loading: false,
  list: [
    {
      postId: 4,
      title: "",
      nickName: "",
      createdAt: "",
      frontNum: 2,
      backNum: 3,
      completed: false,
    },
  ],
};

//actionCreator
const getPost = createAction(GETPOST, (post_list) => ({ post_list }));
const getDetailPost = createAction(GETDETAILPOST, (post) => ({ post }));
const addPost = createAction(ADDPOST, (post) => ({ post }));
const deletePost = createAction(DELETEPOST, () => ({}));
const editPost = createAction(EDITPOST, (post) => ({ post }));
const frontJoin = createAction(FEJOIN, (info) => ({ info }));
const backJoin = createAction(BEJOIN, (info) => ({ info }));

//middleware
const getPostDB = () => {
  return async function (dispatch, getState, { history }) {
    //   const response = await axiosInstance.get("/api/post")
    const response = RESP.POSTGET;
    if (response) {
      dispatch(getPost(response));
      return;
    }
  };
};
const getDetailPostDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    const numPostId = parseInt(postId);
    console.log("여긴미들웨어");
    // const response = await axiosInstance.get(`/api/post/${numPostId}`);
    const response = RESP.POSTPOSTIDGET;
    dispatch(getDetailPost(response));
  };
};
const addPostDB = (title, frontNum, backNum, content) => {
  return async function (dispatch, getState, { history }) {
    try {
      const user_info = getState().user.user;
      // const response = await axiosInstance.post("/api/post", {
      //   title: title,
      //   username: user_info.username,
      //   nickName: user_info.nickName,
      //   frontNum: frontNum,
      //   backNum: backNum,
      //   post_content: content,
      //   completed: false,
      // });
      const response = RESP.POSTPOST;
      window.alert("게시물이 작성되었습니다.");
      dispatch(
        addPost({
          postId: 9999,
          title,
          nickName: user_info.nickName,
          frontNum: frontNum,
          backNum: backNum,
          completed: false,
        })
      );
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };
};
const deletePostDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const parsedPostId = parseInt(postId);
      // const response = await axiosInstance.delete(`/api/post/${parsedPostId}`);
      const response = RESP.POSTPOSTIDDELETE;
      window.alert("게시물이 삭제되었습니다.");
      if (response.result === true) {
        history.replace("/");
      }
    } catch (err) {
      console.error(err);
    }
  };
};
const editPostDB = (postId, title, FEnum, BEnum, content) => {
  return async function (dispatch, getState, { history }) {
    try {
      // const response = await axiosInstance.put(`/api/post/${postId}`, {
      //   postId,
      //   title,
      //   frontNum: FEnum,
      //   backNum: BEnum,
      //   post_content: content,
      //   completed: false,
      // });
      const response = RESP.POSTPOSTIDPPUT;
      if (response.result === true) {
        window.alert("게시물이 수정되었습니다.");
        history.replace("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
};
const frontJoinDB = (username, postId) => {
  return async function (dispatch, getState, { history }) {
    console.log("참여!", username, postId);
    try {
      // const response = await axiosInstance.post(`/api/front/${postId}`, {
      //   username,
      //   postId,
      // });
      const response = RESP.FRONTPOSTIDPOST;
      if (response.bool === true) {
        dispatch(frontJoin());
      } else if (response.bool === false) {
        dispatch(frontJoin());
      }
    } catch (err) {
      console.error(err);
    }
  };
};
const backJoinDB = (username, postId) => {
  return function (dispatch, getState, { history }) {};
};

//reducer
export default handleActions(
  {
    [GETPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
        draft.is_loading = true;
      }),
    [GETDETAILPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.detailPost = action.payload.post;
        draft.is_loading = true;
      }),
    [ADDPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
  },
  initialState
);

const actionCreators2 = {
  getPost,
  getPostDB,
  getDetailPostDB,
  addPostDB,
  deletePostDB,
  editPostDB,
  frontJoinDB,
  backJoinDB,
};

export { actionCreators2 };
