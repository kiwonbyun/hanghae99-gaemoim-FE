import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";
import { RESP } from "../../shared/response";


// 액션 
const ADD_POST = "ADD_POST";
const GET_POST = "GET_POST";
const GET_DTPOST = "GET_DTPOST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";


// 액션 생성 함수 
const addPost = createAction(ADD_POST, (post) => ({ post }));
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));
const getDetailPost = createAction(GET_DTPOST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post) => ({ post }));
const deletePost = createAction(DELETE_POST, (postId) => ({ postId }));


// 초기값
const initialState = {
  list: [],
}

const initialPost = {
  title: "",
  frontNum: 0,
  backNum: 0,
  post_content: "",
}

// 미들웨어


// 포스트 목록 가져오기
const getPostDB = () => {
  return async function (dispatch, getState, { history }) {
    axiosInstance
      .get("/api/post")
      .then((res) => {
        // console.log("getPostDB : response ", res.data.content);
        dispatch(getPost(res.data.content));
      }).catch((error) => {
        console.log(error)
      })
  }
}


// 상세페이지 포스트 가져오기
const getDetailPostDB = (params) => {
  return async function (dispatch, getState, { history }) {
    axiosInstance
      .get("/api/post/detail/" + params)
      .then((res) => {
        // console.log("getDetailPostDB : response ", res.data);
        dispatch(getDetailPost(res.data));
      }).catch((error) => {
        console.log(error);
      })
  }
}


// 포스트 추가
const addPostDB = (post_data) => {
  return async function (dispatch, getState, { history }) {

    const _post = {
      ...post_data,
      frontNum: Number(post_data.frontNum),
      backNum: Number(post_data.backNum),
      completed: false,
    }
    // console.log("addPostDB : post_data",post_data)
    // console.log("addPostDB : _post", _post)

    axiosInstance
      .post("/api/post", _post)
      .then((res) => {
        console.log("addPostDB : response", res)
        if (res.data.result === true) {
          window.alert("성공적으로 작성되었습니다!");
          history.push("/");
        }
      }).catch((error) => {
        console.log(error);
      })

  }
}

const deletePostDB = (postid) => {
  return function (dispatch, getState, { history }) {
    
    // console.log("deletePostDB : postid ", postid)

    axiosInstance
    .delete(`/api/post/${postid}`)
    .then((res) => {
      // console.log("deletePostDB : res", res);
      if(res.data.result === true) {
        dispatch(deletePost(postid));
        history.replace("/");
      }
    }).catch((error) => {
      console.log("deletePostDB : error", error);
    })
  }
}


const editPostDB = (post_data) => {
  return function (dispatch, getState, { history }) {
    console.log("editPostDB : post_data", post_data );
    axiosInstance
      .put(`/api/post/${post_data.postId}`, post_data)
      .then((res) => {
        console.log("editPostDB : response", res);
        if(res.data.result === true) {
        dispatch(editPost(res));
        history.push(`/post/${post_data.postId}`)
        }
      }).catch((error) => {
        console.log(error);
      })

  }
}




// 리듀서 
export default handleActions(
  {
    [ADD_POST]: (state, action) => produce(state, (draft) => {
      // console.log("ADD_POST", action.payload.post);
      draft.list.unshift(action.payload.post);
    }),
    [GET_POST]: (state, action) => produce(state, (draft) => {
      // console.log("GET_POST", action.payload.post_list);
      draft.list = action.payload.post_list;
    }),
    [GET_DTPOST]: (state, action) => produce(state, (draft) => {
      // console.log("GET_DTPOST : detail_post ", action.payload.post);
      draft.dtPost = action.payload.post;
    }),
    [EDIT_POST]: (state, action) => produce(state, (draft) => {
      // console.log("EDIT_POST", action.payload.post);
      let idx = draft.list.findIndex((post) => post.postId === action.payload.postId);
      draft.list[idx] = {...draft.list[idx], ...action.payload.post}
    }),
    [DELETE_POST]: (state, action) => produce(state, (draft) => {
      // console.log("DELETE : action.payload", action.payload);
      draft.list = draft.list.filter((post) => post.postId !== action.payload.postId);
    }),
  }, initialState
)


const actionCreators = {
  addPost,
  getPost,
  getDetailPost,
  editPost,
  deletePost,
  addPostDB,
  getPostDB,
  getDetailPostDB,
  editPostDB,
  deletePostDB,
}

export { actionCreators };