import React from "react";
import { Button, Grid, Input } from "../elements";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { useParams } from "react-router-dom";

const CmtWrite = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.postid

  const comment = React.useRef(null);

  const user = useSelector((state) => state?.user?.user?.user)

  console.log("CmtWrite : params", params);
  console.log("CmtWrite : user", user)

  const addComment = () => {
    const comment_data = {
      postId: Number(params.postid),
      username: user.USER_NAME,
      nickName: user.NICK_NAME,
      comment_content: comment.current.value,
    }
    // console.log("CmtWrite : comment_content", comment_data.comment_content)
  
    dispatch(commentActions.addCommentDB(comment_data, postId));
  }

  
  return (
    <React.Fragment>
      <Grid>
        <Input type="textarea" placeholder="덧글을 작성해주세용" _ref={comment} />
        <Grid align="right">
          <Button size="S" onClick={() => {
            addComment();
          }}>작성하기</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}



export default CmtWrite;