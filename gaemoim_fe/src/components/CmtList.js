import React from "react";

import { useParams } from "react-router-dom";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Text } from "../elements";



const CmtList = () => {

  const dispatch = useDispatch();
  const params = useParams();

  const comment = useSelector((state) => state.comment.list);

  console.log("CmtList : comment ", comment)
  // console.log("CmtList : params", params.postid);

  React.useEffect(() => {
    dispatch(commentActions.getCommentDB(params.postid));
  }, [dispatch, params.postid])


  return (
    <React.Fragment>
      {comment.map((comment,idx) => {
        return (
          <Grid key={idx}>
            <hr />
            <Grid is_flex padding="5px" margin="10px 0">
              <Grid width="20vw">
                <Text bold>{comment?.nickName}</Text>
              </Grid>
              <Grid>
                <Text>{comment?.comment_content}</Text>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </React.Fragment>
  );
}


export default CmtList;