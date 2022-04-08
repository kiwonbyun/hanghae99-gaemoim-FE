import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";
import { RESP } from "../../response";

//action
const SETUSER = "Setuser";
const GETUSER = "Getuser";
const DELETEUSER = "Deleteuser";

//initialState

const initialState = {
  user: null,
  is_login: false,
};

//action creators
const setUser = createAction(SETUSER, (user) => ({ user }));
const getUser = createAction(GETUSER, (user) => ({ user }));
const deleteUser = createAction(DELETEUSER, (user) => ({ user }));

//middlewares
const signUpDB = (id, nickname, pw, pwCf, position) => {
  return async function (dispatch, getState, { history }) {
    console.log("여기는 signUpDB 미들웨어요");
    //  const response =  await axiosInstance.post("/api/register", {})
    const response = RESP.REGISTERPOST;
    console.log(response.result);
    if (response.result === "success") {
      window.alert("환영합니다! 로그인 해주세요 :)");
      history.replace("/login");
    }
  };
};
const logInDB = (id, pw) => {
  return async function (dispatch, getState, { history }) {
    console.log("여기는 logInDB 미들웨어입니다.");
    //   const response = await axiosInstance.post("/api/login", {})
    const response = RESP.LOGINPOST;
    console.log(response);
    if (response.result === "success") {
      const accessToken = response.token;
      sessionStorage.setItem("token", accessToken);
      dispatch(
        getUser({
          userId: response.userId,
          nickName: response.nickName,
          position: response.position,
        })
      );
      window.alert("환영합니다!");
      history.replace("/");
    } else {
      window.alert("아이디 혹은 비밀번호가 잘못되었습니다!");
      return;
    }
  };
};
const userCheckDB = () => {
  return async function (dispatch, getState, { history }) {
    console.log("여기는 userCheckDB 입니다.");
    //   const response = await axiosInstance.get("/api/islogin")
    const response = RESP.ISLOGINGET;
    console.log(response);
    if (response.nickName) {
      dispatch(
        getUser({
          userId: response.userId,
          nickName: response.nickName,
          position: response.position,
        })
      );
    }
  };
};

//reducer

export default handleActions(
  {
    [SETUSER]: (state, action) => produce(state, (draft) => {}),
    [GETUSER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [DELETEUSER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
      }),
  },

  initialState
);

const actionCreators = {
  setUser,
  signUpDB,
  logInDB,
  userCheckDB,
  deleteUser,
};

export { actionCreators };
