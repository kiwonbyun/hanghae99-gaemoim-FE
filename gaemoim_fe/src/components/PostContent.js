import React from "react";

import { useHistory, useParams } from "react-router-dom";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userAction } from "../redux/modules/user";


import { Button, Grid, Permit, Text } from "../elements";
import { useDispatch, useSelector } from "react-redux";

const PostContent = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  const post = useSelector((state) => state.post.dtPost);
  const user = useSelector((state) => state.user.user);
  const position = useSelector((state) => state?.user?.user?.user.position);


  console.log("PostContent : post", post);
  console.log("PostContent : user", user);
  console.log("PostContent : position", position);
  console.log("PostContent : params", params.postid);

  React.useEffect(() => {
    dispatch(postActions.getDetailPostDB(params.postid));
  }, [dispatch, params.postid])

  const deletePost = () => {
    dispatch(postActions.deletePostDB(params.postid))
  }


  return (
    <React.Fragment>
      <Grid>

        <Grid is_flex>
          <Grid padding="2px">
            <Text size="L">{post?.title}</Text>
            <Text bold>프론트엔드 {post?.frontNum}명 | 백엔드 {post?.backNum}명</Text>
          </Grid>
          <Grid width="100px">
            <Grid padding="2px" align="right">
              <Permit>
                <Button size="XS" onClick={() => {
                  history.push(`/write/${params.postid}`)
                }}>수정</Button>
                <Button size="XS" color="light" onClick={deletePost}>삭제</Button>
              </Permit>
            </Grid>
            <Grid padding="2px" align="right">
              <Text bold size="S">{post?.nickName}</Text>
            </Grid>
          </Grid>
        </Grid>

        <hr />

        <Grid margin="24px 0">
          <Grid margin=" 0">
            <Text>{post?.post_content}</Text>
          </Grid>
          <Permit>
            <Grid margin="40px 0" align="center">
              {position === "프론트엔드" ? <Button type="circle" size="S">FE참여</Button> : <Button type="circle" size="S">BE참여</Button>}
            </Grid>
          </Permit>

        </Grid>

      </Grid>
    </React.Fragment>
  );

}


export default PostContent;