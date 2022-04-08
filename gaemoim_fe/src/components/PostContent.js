import React from "react";
import { Button, Badge, Grid, Text } from "../elements";

const PostContent = () => {

  return (
    <React.Fragment>
      <Grid is_flex>
        <Grid padding="2px">
          <Text size="L">프로젝트 팀원 구인합니다~!</Text>
          <Text bold>프론트엔드 2명 | 백엔드 3명</Text>
        </Grid>
        <Grid width="100px">

          <Grid padding="2px" align="right">
            <Button size="XS">수정</Button>
            <Button size="XS" color="light">삭제</Button>
          </Grid>

          <Grid padding="2px" align="right">
            <Text bold size="S">작성자입니당</Text>
          </Grid>
        </Grid>
      </Grid>
      <hr />
      <Grid margin="24px 0">
        <Grid margin=" 0">
          <Text>리액트 고수님 대환영환영합니다.</Text>
        </Grid>
        <Grid margin="40px 0" align="center">
          <Button type="circle" size="S">참여하기</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}


export default PostContent;