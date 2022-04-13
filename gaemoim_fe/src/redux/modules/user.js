import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";
import { RESP } from "../../shared/response";
import jwt_decode from 'jwt-decode';

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
      })
      console.log(response)
      console.log(response.data.result)
      if (response.data.result === true) {
        
        dispatch(idCheck(response.data.result));
      } else {
        window.alert(response.data.errormessage)
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

      console.log("ㄴㅇㅁㄴㅇㄹㄴㅇㄹ", response)
      if (response.data.result === true) {
        window.alert("환영합니다! 로그인 해주세요 :)");
        history.replace("/login");
      } else if (response.data.result === false) {
        window.alert(response.data.errormessage);
        return;
      }
    } catch (error) {
      console.error("에러어어어어", error);
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

      console.log(response)
      if (!response.data.result) {
        const accessToken = response.headers.authorization;
        sessionStorage.setItem("token", accessToken);
        // const userdata = JSON.parse(atob(accessToken.split(".")[1])),
        const _data = jwt_decode(accessToken);
        const user_data = {
          username : _data.USER_NAME,
          nickName : _data.NICK_NAME,
          position : _data.POSITION,
        }

        console.log(user_data);

        dispatch(
          getUser(user_data)
        );

        window.alert("환영합니다!");
        history.replace("/");
      } else if (response.data.result === false) {
        window.alert(response.data.errormessage);
        return;
      }
    } catch (err) {
      console.log(err.response.data);
      console.log(err);
      // window.alert(err.response.data.exception);
      window.alert("입력 정보를 확인해주세요!");
    }
  };
};




const userCheckDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await axiosInstance.post("/api/islogin")
      console.log("똔똔",response)
      if (response.data.nickName) {
        dispatch(
          getUser({
            username: response.data.username,
            nickName: response.data.nickName,
            position: response.data.position,
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  };
};

//reducer

export default handleActions(
  {
    [SETUSER]: (state, action) => produce(state, (draft) => { }),
    [GETUSER]: (state, action) =>
      produce(state, (draft) => {
        // console.log("똔똔똔",action.payload.user)
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
