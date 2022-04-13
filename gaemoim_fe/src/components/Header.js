import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userAction } from "../redux/modules/user";
import { Button, Grid, Text } from "../elements";



const Header = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.user.user?.user)
  const is_login = useSelector((state) => state.user.is_login);
  // console.log("Header : user", user, is_login);
  
  const logout = () => {
    sessionStorage.removeItem("token");
    dispatch(userAction.logoutDB());
  };


  if (is_login) {
    return (
      <Container>
        <div>
        </div>
        <div>
          <Grid is_flex width="fit-content" align="right">
            <Text bold >🧡{user.NICK_NAME}</Text>
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
