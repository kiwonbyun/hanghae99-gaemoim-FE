import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";
import { RESP } from "../../shared/response";




// 액션
const GET_COMMENT = "GET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";


// 액션 생성 
const getComment = createAction(GET_COMMENT, (comment_list) => ({ comment_list }));
const addComment = createAction(ADD_COMMENT, (comment) => ({ comment }));


// 초기값 
const initialState = {
  list: [],
}

// const initialComment = {
//   postId: 0,
//   username: "",
//   nickName: "",
//   comment_content: "",
// }


// 미들웨어 

const getCommentDB = (params) => {
  return async function (dispatch, getState, { history }) {
  const postId = parseInt(params)
    axiosInstance
      .get(`/api/comments/${postId}`)
      .then((res) => {
        console.log("getCommentDB : response", res);
        dispatch(getComment(res.data.content));
      }).catch((error) => {
        window.alert(error.response);
      })
  }
}

const addCommentDB = (comment, params) => {
  return async function (dispatch, getState, { history }) {
    console.log("addCommentDB : comment", comment);
    const postId = parseInt(params);
    console.log(postId)

    axiosInstance
      .post(`/api/comments/${postId}`, comment)
      .then((res) => {

        console.log("addCommentDB : response", res); 
        dispatch(addComment(comment));

      }).catch((error) => {
        console.log(error.response);
      })
  }
}


// 리듀서

export default handleActions(
  {
    [GET_COMMENT]: (state, action) => produce(state, (draft) => {
      console.log("GET_COMMENT", action.payload.comment_list);
      draft.list = action.payload.comment_list;
    }),
    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
      console.log("ADD_COMMENT", action.payload.comment);
      draft.list.unshift(action.payload.comment);
    }),
  }, initialState
)



const actionCreators = {
  getCommentDB,
  addCommentDB,
}

export { actionCreators };