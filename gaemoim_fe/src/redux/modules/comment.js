import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";
import { RESP } from "../../response";




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
  // const response = 
  // axiosInstance
  //     .get("/api/comment/" + params, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       }
  //     })
  //     .then((res) => {
  //       
  //       const comment_data = { ...res }
  //       console.log(res);
  //       console.log(comment_data)
  //       dispatch(getComment(comment_data));
  //     }).catch((error) => {
  //       const errorMessage = error.message;
  //       const errorCode = error.code;
  //       console.log(errorMessage, errorCode);
  //       window.alert(errorMessage);
  //     })

    const response = RESP.COMMENTSPOSTIDGET;

    console.log("getCommentDB : response", response);

    dispatch(getComment(response));
  }
}

const addCommentDB = (comment) => {
  return async function (dispatch, getState, { history }) {
    console.log("addCommentDB : comment", comment);
// const response = 
// axiosInstance
//       .post("/api/comment", {...comment}, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       })
//       .then((res) => {

//         console.log(res); //result:true/false
//         history.push("/");

//       }).catch((error)=> {
//         console.log(error);
//       })
  const response = RESP.COMMENTSPOSTIDPOST;

    dispatch(addComment(comment));

    if (response.result === "success") {
      window.alert("성공적으로 작성되었습니다!");
    }
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