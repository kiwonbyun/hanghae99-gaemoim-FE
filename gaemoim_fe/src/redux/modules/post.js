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
const GETPAGE = "GETPAGE";

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
const frontJoin = createAction(FEJOIN, (join) => ({ join }));
const backJoin = createAction(BEJOIN, (join) => ({ join }));
const getPage = createAction(GETPAGE, (page) => ({page}));

//middleware




const getPostDB = () => {
  return async function (dispatch, getState, { history }) {
      const response = await axiosInstance.get("/api/post")
    
    console.log("getPostDB : reponse", response);
    if (response.data.content) {
      dispatch(getPost(response.data.content));
      return;
    }
  };
};

const getPageDB = (params) => {
  return async function (dispatch, getState, {history}) {
    const response = await axiosInstance.get(`/api/post?page=${params}`)
    
    console.log("ㅇㄹㅇㄹㅇ", response)
    if(response) {
      dispatch(getPage(response.data));
    }
  }
}




const getDetailPostDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    const numPostId = parseInt(postId);
    const response = await axiosInstance.get(`/api/post/detail/${numPostId}`);
    // console.log("getDetailPostDB : response", response.data)
    dispatch(getDetailPost(response.data));
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
      window.alert("게시물이 작성되었습니다.");
      dispatch(
        addPost({
          postId: 9999,
          title,
          nickName: user_info.nickName,
          position,
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
      const response = await axiosInstance.delete(`/api/post/${parsedPostId}`);
      // const response = RESP.POSTPOSTIDDELETE;
      window.alert("게시물이 삭제되었습니다.");
      if (response.data.result === true) {
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
      const response = await axiosInstance.put(`/api/post/${postId}`, {
        postId,
        title,
        frontNum: FEnum,
        backNum: BEnum,
        post_content: content,
        completed: false,
      });
      // const response = RESP.POSTPOSTIDPPUT;
      console.log(response);
      if (response.data.result === true) {
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
      const response = await axiosInstance.post(`/api/front/${postId}`, username);

      // 로그인사용자 클릭 여부 / 총 카운트 / 달성여부
      console.log("뭐가 올까요?", response.data)
      dispatch(frontJoin(response.data))
      // if (response.bool === true) {
      //   dispatch(frontJoin(response.data));
      // } else if (response.bool === false) {
      //   dispatch(frontJoin());
      // }
    } catch (err) {
      console.error(err);
    }
  };
};


const backJoinDB = (username, postId) => {
  return async function (dispatch, getState, { history }) {
    console.log("참여!", username, postId);
    try {
      const response = await axiosInstance.post(`/api/back/${postId}`, username);

      // 로그인사용자 클릭 여부 / 총 카운트 / 달성여부
      console.log("뭐가 올까요?", response.data)
      dispatch(backJoin(response.data))
      // if (response.bool === true) {
      //   dispatch(frontJoin(response.data));
      // } else if (response.bool === false) {
      //   dispatch(frontJoin());
      // }
    } catch (err) {
      console.error(err.response);
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
    [GETDETAILPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.detailPost = action.payload.post;
        draft.is_loading = true;
      }),
    [ADDPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [GETPAGE]: (state, action) => produce(state, (draft) => {
      draft.page = action.payload.page;
    }),
    [FEJOIN]: (state, action) => produce(state, (draft) => {
      console.log("넨네네", action.payload.join)
      draft.fjoin = action.payload.join;
    }),
    [BEJOIN]: (state, action) => produce(state, (draft) => {
      console.log("넨네네", action.payload.join)
      draft.bjoin = action.payload.join;
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
  getPage,
  getPageDB,
};

export { actionCreators2 };
