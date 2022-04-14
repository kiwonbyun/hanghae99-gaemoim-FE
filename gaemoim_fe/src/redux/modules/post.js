import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";
import { RESP } from "../../response";
import moment from "moment";

//action
const GETPOST = "getPost";
const GETDETAILPOST = "getDetailPost";
const ADDPOST = "addPost";
const DELETEPOST = "deletePost";
const EDITPOST = "editPost";
const FEJOIN = "Frontjoin";
const BEJOIN = "Backjoin";
const PAGEGETPOST = "PagegetPost";

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
const getPagePost = createAction(PAGEGETPOST, (post_list) => ({ post_list }));
const getDetailPost = createAction(GETDETAILPOST, (post) => ({ post }));
const addPost = createAction(ADDPOST, (post) => ({ post }));
const deletePost = createAction(DELETEPOST, () => ({}));
const editPost = createAction(EDITPOST, (post) => ({ post }));
const frontJoin = createAction(FEJOIN, (info) => ({ info }));
const backJoin = createAction(BEJOIN, (info) => ({ info }));

//middleware
const getPostpageDB = (page) => {
  return async function (dispatch, getState, { history }) {
    const response = await axiosInstance.get(`/api/post?page=${page - 1}`);

    if (response.status === 200) {
      dispatch(getPagePost(response.data));
    }
  };
};

const getPostDB = () => {
  return async function (dispatch, getState, { history }) {
    const response = await axiosInstance.get(`/api/post`);
    // const response = RESP.POSTGET;
    if (response.status === 200) {
      dispatch(getPost(response.data));
      return;
    }
  };
};
const getDetailPostDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const numPostId = parseInt(postId);
      const response = await axiosInstance.get(`/api/post/detail/${numPostId}`);
      // const response = RESP.POSTPOSTIDGET;
      if (response.status === 200) {
        dispatch(
          getDetailPost({
            ...response.data,
            frontTotalJoin: 0,
            backTotalJoin: 0,
          })
        );
      }
    } catch (err) {}
  };
};
const addPostDB = (title, frontNum, backNum, content, position) => {
  return async function (dispatch, getState, { history }) {
    try {
      const user_info = getState().user.user;
      const response = await axiosInstance.post("/api/post", {
        title: title,
        username: user_info.username,
        nickName: user_info.nickName,
        position,
        frontNum: frontNum,
        backNum: backNum,
        post_content: content,
        completed: false,
      });
      // const response = RESP.POSTPOST;
      if (response.status === 200) {
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
      }
    } catch (error) {}
  };
};
const deletePostDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const parsedPostId = parseInt(postId);
      const response = await axiosInstance.delete(`/api/post/${parsedPostId}`);
      // const response = RESP.POSTPOSTIDDELETE;
      if (response.status === 200) {
        window.alert("게시물이 삭제되었습니다.");
        history.replace("/");
      }
    } catch (err) {}
  };
};
const editPostDB = (postId, title, FEnum, BEnum, content) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await axiosInstance.put(`/api/post/${postId}`, {
        postId,
        title,
        frontNum: FEnum,
        backNum: BEnum,
        post_content: content,
        completed: false,
      });
      // const response = RESP.POSTPOSTIDPPUT;
      if (response.data.result === true) {
        window.alert("게시물이 수정되었습니다.");
        history.replace("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
};
const frontJoinDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await axiosInstance.post(
        `/api/front/${postId}`,
        {},
        {
          headers: { Authorization: sessionStorage.getItem("token") },
        }
      );
      // const response = RESP.FRONTPOSTIDPOST;
      if (response.data.join === true) {
        window.alert("프론트엔드로 프로젝트 참여했습니다.");
        dispatch(frontJoin(response));
      } else if (response.data === "이미 백엔드에 참여를 하셨습니다.") {
        window.alert("이미 백엔드에 참여를 하셨습니다.");
        return;
      } else if (response.data.join === false) {
        window.alert("프론트엔트 참여가 취소되었습니다.");
        dispatch(frontJoin(response));
      }
    } catch (err) {
      if (err.response) {
        window.alert("참여가 마감되었거나, 백엔드로 이미 참여하셨습니다.");
      }
    }
  };
};
const backJoinDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await axiosInstance.post(
        `/api/back/${postId}`,
        {},
        {
          headers: { Authorization: sessionStorage.getItem("token") },
        }
      );
      // const response = RESP.BACKPOSTIDPOST;
      if (response.data.join === true) {
        window.alert("백엔드로 프로젝트 참여했습니다.");
        dispatch(backJoin(response));
      } else if (response.data === "이미 프론트엔드에 참여를 하셨습니다.") {
        window.alert("이미 프론트엔드에 참여를 하셨습니다.");
        return;
      } else if (response.data.join === false) {
        window.alert("백엔트 참여가 취소되었습니다.");
        dispatch(frontJoin(response));
      }
    } catch (err) {
      console.log(err.response);
      window.alert("참여가 마감되었거나, 프론트엔드로 이미 참여하셨습니다.");
    }
  };
};

//reducer
export default handleActions(
  {
    [GETPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
        draft.is_loading = true;
      }),
    [PAGEGETPOST]: (state, action) =>
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
        // draft.list.unshift(action.payload.post);
      }),
    [FEJOIN]: (state, action) =>
      produce(state, (draft) => {
        draft.detailPost.frontCnt = action.payload.info.data.frontCnt;
      }),
    [BEJOIN]: (state, action) =>
      produce(state, (draft) => {
        draft.detailPost.backCnt = action.payload.info.data.backCnt;
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
  getPostpageDB,
};

export { actionCreators2 };
