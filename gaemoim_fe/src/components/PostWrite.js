import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import { Button, Grid, Input, Text } from "../elements";
import Select from "../elements/select";
import { useParams } from "react-router-dom";


const PostWrite = (props) => {
  const dispatch = useDispatch();
  const params = useParams();

  const postid = params.postId
  const is_edit = postid ? true : false;

  const title = React.useRef(null);
  const post_content = React.useRef(null);
  const frontNum = React.useRef(null);
  const backNum = React.useRef(null);



  const user = useSelector((state) => state.user.usergu)
  const post = useSelector((state) => state.post.dtPost)
  // console.log("PostWrite : post",post)

  const addPost = () => {
    const post_data = {
      title: title.current.value,
      username: user.username,
      nickName: user.nickName,
      post_content: post_content.current.value,
      frontNum: frontNum.current.value,
      backNum: backNum.current.value,
      completed: false,
    }

    if (post_data.title === "" || post_data.post_content === "") {
      return window.alert("항목을 모두 입력해주세요!")
    }
    if (post_data.frontNum === "0" && post_data.backNum === "0") {
      return window.alert("구인 인원을 1인 이상 선택해주세요!")
    }
    dispatch(postActions.addPostDB(post_data));
  }

  const editPost = () => {

    const post_data = {
      postId: params.postId,
      title: title.current.value,
      post_content: post_content.current.value,
      frontNum: frontNum.current.value,
      backNum: backNum.current.value,
      completed: false,
    }

    if (post_data.title === "" || post_data.post_content === "") {
      return window.alert("항목을 모두 입력해주세요!")
    }
    if (post_data.frontNum === "0" && post_data.backNum === "0") {
      return window.alert("구인 인원을 1인 이상 선택해주세요!")
    }
    dispatch(postActions.editPostDB(post_data));
    
  }



  return (
    <React.Fragment>
      <Grid>
        <Input type="line" label="제목" placeholder="제목을 입력해주세요." _ref={title} />
        <Grid is_flex margin="16px 0">
          <Text bold>프론트엔드</Text>
          <Select _ref={frontNum} />
          <Text bold>백엔드</Text>
          <Select _ref={backNum} />
        </Grid>
        <Input
          type="textarea"
          size="post"
          label="내용"
          placeholder="작성 내용을 입력해주세요" _ref={post_content} />
        <Grid margin="20px 0" align="center">


          <Button onClick={is_edit?editPost:addPost}>{is_edit ? "수정하기" : "작성하기"}</Button>
        
        
        </Grid>
      </Grid>
    </React.Fragment>
  );


  
}


export default PostWrite;