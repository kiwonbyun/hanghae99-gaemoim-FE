import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";
import { RESP } from "../../response";
import jwt_decode from "jwt-decode";

//action
const SETUSER = "Setuser";
const GETUSER = "Getuser";
const DELETEUSER = "Deleteuser";
const IDCHECK = "idCheck";

//initialState

const initialState = {
  user: null,
  is_login: false,
};

//action creators
const setUser = createAction(SETUSER, (user) => ({ user }));
const getUser = createAction(GETUSER, (user) => ({ user }));
const deleteUser = createAction(DELETEUSER, (user) => ({ user }));
const idCheck = createAction(IDCHECK, (result) => ({ result }));

//middlewares
const idCheckDB = (id) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await axiosInstance.post("/api/idCheck", {
        username: id,
      });
      // const response = RESP.IDCHECKPOST;
      if (response.data.result === true) {
        dispatch(idCheck(response.data.result));
      } else {
        window.alert("중복된 아이디가 있습니다. 수정해주세요");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };
};

const signUpDB = (id, nickName, pw, pwCf, position) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await axiosInstance.post("/api/register", {
        username: id,
        nickName,
        password: pw,
        passwordCheck: pwCf,
        position,
      });
      // const response = RESP.REGISTERPOST;
      if (response.data.result === true) {
        window.alert("환영합니다! 로그인 해주세요 :)");
        history.replace("/login");
      } else if (response.data.result === false) {
        window.alert(response.errormessage);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };
};
const logInDB = (id, pw) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await axiosInstance.post("/api/login", {
        username: id,
        password: pw,
      });
      // const response = RESP.LOGINPOST;
      if (response.status === 200) {
        const accessToken = response.headers.authorization;
        let decoded = jwt_decode(accessToken);
        sessionStorage.setItem("token", accessToken);
        dispatch(
          getUser({
            username: decoded.USER_NAME,
            nickName: decoded.NICK_NAME,
            position: decoded.POSITION,
            // username: "bkw9604",
            // nickName: "카이저쏘제",
            // position: "프론트엔드",
          })
        );
        window.alert("환영합니다!");
        history.replace("/");
        return;
      } else if (response.result === false) {
        window.alert(response.errormessage);
        return;
      }
    } catch (err) {
      if (err.response.status === 401) {
        window.alert("비밀번호를 확인해주세요.");
      }
      return;
    }
  };
};
const userCheckDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await axiosInstance.post("/api/islogin");
      // const response = RESP.ISLOGINGET;
      if (response.data.nickName) {
        dispatch(
          getUser({
            username: response.data.username,
            nickName: response.data.nickName,
            position: response.data.position,
          })
        );
      } else {
        return;
      }
    } catch (err) {
      console.log(err.response);
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
    [IDCHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.id_Check = action.payload.result;
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
  idCheckDB,
};

export { actionCreators };
