import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Grid } from "../elements";




const MyPage = () => {

    const user = useSelector((state) => state.user.user);

    console.log(user);


    return (
        <React.Fragment>
            <Box>
            <Grid margin="auto" width="fit-content" align="center">
                <P>아이디 : {user.username}</P>
                <P>닉네임 : {user.nickName}</P>
                <P>포지션 : {user.position}</P>
            </Grid>
            </Box>
        </React.Fragment>
    );
}

const P = styled.p`
    font-family: "Pretendard-Regular";
    font-size: 1.3em;
    text-align: center;
`


const Box = styled.div`
    margin: auto;    
    

    width:300px;
    height:120px;

    border: 2px solid #FF9B26;
    border-radius: 10px;
`


export default MyPage;