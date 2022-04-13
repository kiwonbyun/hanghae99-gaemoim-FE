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
    axiosInstance
      .get("/api/comment/"+params)
      .then((res) => {
        console.log("getCommentDB : response", res);
        // dispatch(getComment(res));
      }).catch((error) => {
        // window.alert(error);
      })
  }
}

const addCommentDB = (comment, postId) => {
  return async function (dispatch, getState, { history }) {
    console.log("addCommentDB : comment", comment);
    axiosInstance
      .post(`/api/comment/${postId}`, { ...comment })
      .then((res) => {

        console.log("addCommentDB : response", res); 
        dispatch(addComment(res.data));

      }).catch((error) => {
        console.log(error);
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