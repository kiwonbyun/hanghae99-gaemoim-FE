import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import { RESP } from "../../response";
import Login from "../../Login";


// 액션 
const SET_USER = "SET_USER";
const GET_USER = "GET_USER";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";



// 액션 생성
const setUser = createAction(SET_USER, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const logIn = createAction(LOG_IN, (user) => ({ user }))
const logOut = createAction(LOG_OUT, (user) => ({ user }));


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
// const response = 

    // axiosInstance
    //   .post("/api/register", {
    //     username: user_info.username,
    //     nickName: user_info.nickName,
    //     password: user_info.password,
    //     passwordCheck: user_info.passwordCheck,
    //     position: user_info.position,
    //   })
    //   .then((res) => {
    //     // 응답 데이터 받아서 할 작업 
    //     // result : true / false
    //     console.log(res);
    //     dispatch(setUser(res));
    //   }).catch((error) => {
    //     const errorMessage = error.message;
    //     const errorCode = error.code;
    //     console.log(errorMessage, errorCode);
    //     window.alert(errorMessage);
    //   })

      const response = RESP.REGISTERPOST;
      console.log("signUpDB : user_info", user_info);
      console.log("signUpDB : response.result", response.result);
      

    if (response.result === "success") {
      window.alert("가입이 완료되었습니다!")
      history.push("/login");
    }
  }
}


const logInDB = (username, password) => {
  return function (dispatch, getState, { history }) {
// const response = 

    // axiosInstance
    // .post("/api/login", {
    //   username: username,
    //   password: password,
    // })
    // .then((res) => {
    //   // 응답 데이터 받아서 할 작업 
    //   const token = res.headers.authorization;
    //   TokenToCookie(accessToken);
    //   sessionStorage.setItem("token", accessToken);
    //   const user_data = {
    //     username: "토큰 디코딩",
    //     nickName: "토큰 디코딩",
    //     position: "토큰 디코딩",
    //   }
    //   console.log(res);
    //   console.log(user_data);
    //   if(token){
    //     dispatch(logIn(user_data));
    //     history.push("/");
    //   }
    // }).catch((error) => {
    //   const errorMessage = error.message;
    //   const errorCode = error.code;
    //   console.log(errorMessage, errorCode);
    //   window.alert(errorMessage);
    // })
    const response = RESP.REGISTERPOST;
    const user = RESP.ISLOGINGET;
    
    if(response.result === "success" ) {
      dispatch(logIn(user));
      history.replace("/");
    }
    
  }
}


const loginCheckDB = () => {
  return function (dispatch, getState, {history}) {
// const response = 

    // axiosInstance
    // .get("/api/islogin", {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // })
    // .then((res) => {
    //   // 응답 데이터 받아서 할 작업 
    //   const token = res.headers.authorization;
    //   TokenToCookie(accessToken);
    //   sessionStorage.setItem("token", accessToken);
    //   const user_data = {
    //     ...user_initial,
    //     username: "토큰 디코딩",
    //     nickName: "토큰 디코딩",
    //     position: "토큰 디코딩",
    //   }
    //   console.log(res);
    //   console.log(user_data)
    //   dispatch(getUser(user_data));
    // }).catch((error) => {
    //   const errorMessage = error.message;
    //   const errorCode = error.code;
    //   console.log(errorMessage, errorCode);
    //   window.alert(errorMessage);
    // })


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
      draft.user = action.payload.user;
    }),
    [LOG_IN]: (state, action) => produce(state, (draft) => {
      setCookie("is_login", "success", 3);
      draft.user = { ...action.payload };
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
  signUpDB,
  logInDB,
  loginCheckDB,
  logoutDB,
}

export { actionCreators };