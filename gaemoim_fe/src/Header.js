import React from "react";
import styled from "styled-components";
import Button from "./elements/Button";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Text } from "./elements";
import { actionCreators as userAction } from "./redux/modules/user";

const Header = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.user.user)
  const is_login = useSelector((state) => state.user.is_login);
  console.log("Header : user", user, is_login);
  
  const logout = () => {
    sessionStorage.removeItem("token");
    dispatch(userAction.logoutDB());
  };


  if (is_login) {
    return (
      <Container>
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1920px-Google_2015_logo.svg.png"></img>
        </div>
        <div>
          <Grid is_flex width="fit-content" align="right">
            <Text bold >🧡{user.user.nickName}</Text>
            <Text>님 안녕하세요!</Text>
            <Button size="S" onClick={() => { logout(); history.push("/"); }}>로그아웃</Button>
            {/* <Button size="S" color="light" onClick={() => { history.push("/signup"); }}>회원가입</Button> */}
          </Grid>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1920px-Google_2015_logo.svg.png"></img>
      </div>
      <div>
        <Button size="S" onClick={() => { history.push("/login"); }}>로그인</Button>
        <Button size="S" color="light" onClick={() => { history.push("/signup"); }}>회원가입</Button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
  div {
    &:first-child {
      img {
        width: 200px;
      }
    }
    &:last-child {
      button {
        margin-left: 8px;
      }
      span {
        font-size: 15px;
      }
    }
  }
`;
export default Header;
