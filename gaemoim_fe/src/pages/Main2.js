import React, { useCallback } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { actionCreators2 } from "../redux/modules/post";

import { Badge, Button, Grid, Permit, Text } from "../elements";
import Paging from "../components/Paging";


const Main2 = (props) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const urlparam = useParams();

  const is_login = useSelector((state) => state?.user?.is_login);
  const join = useSelector((state) => state?.post?.fjoin?.completed)
  const post_data = useSelector((state) => state?.post);
  const page_list = post_data?.page?.content;
  const post_list = post_data?.list;
  const params = urlparam.id;

  console.log("???????", join)

  console.log("Main2 : page_list", page_list);
  console.log("Main2 : post_data", post_data);
  console.log("Main2 : post_list", post_list);
  console.log("Main2", params)


  React.useEffect(() => {
    dispatch(actionCreators2.getPageDB(params));
  }, [dispatch]);


  return (
    <Grid margin="30px 0">
      <Grid margin="auto" width="800px">
        {page_list?.map((p, idx) => {
          return (
            <Box>
              <Grid key={p.postId} onClick={() => { history.push(`/detail/${p.postId}`); }}>
                <Grid is_flex padding="16px">
                  <Grid padding="0 1px">
                    <Grid width="40px">
                      {p.completed ? (<Badge type="모집완료">모집완료</Badge>) : (<Badge>모집중</Badge>)}
                    </Grid>
                    <Grid margin="5px 0 0 0">
                      <Text size="M">{p.title}</Text>
                    </Grid>
                    <Grid padding="8px 0">
                      <Text Text>프론트엔드 {p.frontNum} | 백엔드 {p.backNum}</Text>
                    </Grid>
                  </Grid>
                  <Grid width="fit-content">
                    <Grid is_flex width="fit-content">
                      <Grid width="100px" margin="3px">
                        <Text bold align="right">{p.nickName}</Text>
                      </Grid>

                    </Grid>
                    <Grid>
                      <Text align="right" color="#999">2022.04.10</Text>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          );
        })}

        <Button type="write" size="S"
          onClick={() => {
            history.push("/write");
          }}
        >글쓰기</Button>
        <Grid margin="50px 0">
        <Paging />
        </Grid>
      </Grid>
    </Grid>
  );
};



const Box = styled.div`
  margin: 16px;
  border: 1px solid #eee;
  border-radius: 8px;

  box-shadow: 2px 2px 2px 1px #ddd;

  &:hover {
    position: relative;
    top: 1px;
    left: 1px;
  }
`


export default Main2;
