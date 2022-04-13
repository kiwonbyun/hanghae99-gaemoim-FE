import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import axiosInstance from "../../shared/request";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import { RESP } from "../../shared/response";

import jwt_decode from "jwt-decode";


// 액션 
const SET_USER = "SET_USER";
const GET_USER = "GET_USER";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const LOGIN_CHECK = "LOGIN_CHECK";


// 액션 생성
const setUser = createAction(SET_USER, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const logIn = createAction(LOG_IN, (user) => ({ user }))
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const loginCheck = createAction(LOGIN_CHECK, (loginCheck) => ({loginCheck}))

// initialState
const initialState = {
  user: null,
}

const user_initial = {
  username: "",
  nickName: "",
  position: "",
}

// 미들웨어 

const signUpDB = (user_info) => {
  return async function (dispatch, getState, { history }) {
    // console.log(signUpDB : user_info);
  axiosInstance
      .post("/api/register", {
        username: user_info.username,
        nickName: user_info.nickName,
        password: user_info.password,
        passwordCheck: user_info.passwordCheck,
        position: user_info.position,
      })
      .then((res) => {
        // console.log("signUpDB : response",res);
        if(res.data.result === true) {
          dispatch(setUser(res));
          history.push("/");
        }
      }).catch((error) => {
        console.log(error);
      })
  }
}


const logInDB = (username, password) => {
  return function (dispatch, getState, { history }) {

    axiosInstance
    .post("/api/login", {
      username: username,
      password: password,
    })
    .then((res) => {
      // 응답 데이터 받아서 할 작업 
      const token = res.headers.authorization;
      localStorage.setItem("token", token);
      const user_data = jwt_decode(token);
      // console.log("loginDB : response", res);
      // console.log("loginDB : token", token)
      // console.log("loginDB : user_data", user_data)
      if(token){
        dispatch(logIn(user_data));
        history.push("/");
      }
    }).catch((error) => {
        console.log(error.response)
    })
  }
}


const loginCheckDB = () => {
  return function (dispatch, getState, {history}) {
  axiosInstance
    .post("/api/islogin")
    .then((res) => {
      // 응답 데이터 받아서 할 작업 
      // console.log("loginCheckDB : response", res);
      dispatch(getUser({
        username: res.data.username,
        nickName: res.data.nickName,
        position: res.data.position,
      }));
    }).catch((error) => {
      console.log(error.response);
    })
  }
}


const logoutDB = () => {
  return function (dispatch, getState, {history}) {
    dispatch(logOut());
    history.replace('/');
      // 로그아웃된 유저를 로그인 전용 페이지에 머무를 수 없게 하기 위해 push 대신 replace 사용.
  }
}




// 리듀서

export default handleActions(
  {
    [SET_USER]: (state, action) => produce(state, (draft) => {
      draft.list = { ...action.payload };
    }),
    [GET_USER]: (state, action) => produce(state, (draft) => {
      setCookie("is_login", "success");
      draft.usergu = action.payload.user;
      draft.is_login = true;
    }),
    [LOG_IN]: (state, action) => produce(state, (draft) => {
      setCookie("is_login", "success");
      draft.userli = { ...action.payload };
      draft.is_login = true;
    }),
    [LOG_OUT]: (state, action) => produce(state, (draft) => {
      deleteCookie("is_login");
      draft.user = null;
      draft.is_login = false;
    }),

  }, initialState
)

const actionCreators = {
  setUser,
  getUser,
  logIn,
  logOut,
  loginCheck,
  signUpDB,
  logInDB,
  loginCheckDB,
  logoutDB,
}

export { actionCreators };