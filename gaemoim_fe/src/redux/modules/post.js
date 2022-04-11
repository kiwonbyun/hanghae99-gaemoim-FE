import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";
import { RESP } from "../../response";


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
    //const response = 
    // axiosInstance
    //   .get("/api/post", {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     }
    //   })
    //   .then((res) => {
    //     // 데이터 받아서 할 작업 
    //     const post_list = { ...res };
    //     console.log(res);
    //     console.log(post_list);
    //     dispatch(getPost(post_list));
    //   }).catch((error) => {
    //     const errorMessage = error.message;
    //     const errorCode = error.code;
    //     console.log(errorMessage, errorCode);
    //     window.alert(errorMessage);
    //   })

    const response = RESP.POSTPOSTIDGET;
    console.log("getPostDB : response", response);

    dispatch(getPost(response));
  }
}



// 상세페이지 포스트 가져오기
const getDetailPostDB = (params) => {
  return async function (dispatch, getState, { history }) {
    //const response = 
    // axiosInstance
    //   .get("/api/post/" + params, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     }
    //   })
    //   .then((res) => {
    //     // 데이터 받아서 할 작업 
    //     const post_data = { ...res }

    //     console.log(res);
    //     console.log(post_data);
    //     dispatch(getDetailPost(post_data));
    //   }).catch((error) => {
    //     const errorMessage = error.message;
    //     const errorCode = error.code;
    //     console.log(errorMessage, errorCode);
    //     window.alert(errorMessage);
    //   })


    const response = RESP.POSTPOSTIDGET;
    console.log("상세페이지 포스트", response[0])

    dispatch(getDetailPost(response[0]));

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

    console.log("addPostDB : _post", _post)


    //const response = 
    // axiosInstance
    //   .post("/api/post", _post, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     }
    //   })
    //   .then((res) => {
    //     //res = result:true / false
    //     console.log(res)
    //     history.push("/");
    //   }).catch((error) => {
    //     console.log(error);
    //   })


    const response = RESP.POSTPOST;
    console.log("addPostDB : response", response);

    dispatch(addPost(_post));

    if (response.result === "success") {
      window.alert("성공적으로 작성되었습니다!");
      history.push("/");
    }
  }
}

const deletePostDB = (postid) => {
  return function (dispatch, getState, { history }) {
    console.log("deletePostDB : postid ", postid)
    console.log("삭제하기")
    // const response = 
    // axiosInstance
    // .delete(`/api/post/${postid}`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // })
    // .then((res) => {
    //   //result : true / false
    //   console.log(res);
    //   dispatch(deletePost(params));
    // }).catch((error) => {
    //   console.log("deletePostDB : error", error);
    // })
  }
}


const editPostDB = (post_data) => {
  return function (dispatch, getState, { history }) {
    console.log("editPostDB : post_data", post_data );

    // const response = 
    // axiosInstance
    //   .put(`/api/post/${post_data.userId}`, post_data, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     }
    //   }).then((res) => {
    //     console.log(res);
    //     dispatch(editPost(res));
    //   }).catch((error) => {
    //     console.log(error);
    //   })

  }
}




// 리듀서 
export default handleActions(
  {
    [ADD_POST]: (state, action) => produce(state, (draft) => {
      console.log("ADD_POST", action.payload.post);
      draft.list.unshift(action.payload.post);
    }),
    [GET_POST]: (state, action) => produce(state, (draft) => {
      console.log("GET_POST", action.payload.post_list);
      draft.list = action.payload.post_list;
    }),
    [GET_DTPOST]: (state, action) => produce(state, (draft) => {
      console.log("GET_DTPOST : detail_post ", action.payload.post);
      draft.dtPost = action.payload.post;
    }),
    [EDIT_POST]: (state, action) => produce(state, (draft) => {
      console.log("EDIT_POST", action.payload.post);
      let idx = draft.list.findIndex((post) => post.postId === action.payload.postId);
      draft.list[idx] = {...draft.list[idx], ...action.payload.post}
    }),
    [DELETE_POST]: (state, action) => produce(state, (draft) => {
      console.log("DELETE : action.payload", action.payload);
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