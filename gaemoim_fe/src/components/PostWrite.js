import React from "react";
import { Button, Grid, Input, Text } from "../elements";
import Select from "../elements/select";

const PostWrite = () => {

  return (
    <React.Fragment>
      <Grid>
        <Input type="line" label="제목" placeholder="제목을 입력해주세요." />
        <Grid is_flex margin="16px 0">
          <Text bold>프론트엔드</Text>
          <Select />
          <Text bold>백엔드</Text>
          <Select />
        </Grid>
        <Input type="textarea" size="post" label="내용" placeholder="작성 내용을 입력해주세요"></Input>
        <Grid margin="20px 0" align="center">
          <Button>작성하기</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );

}


export default PostWrite;