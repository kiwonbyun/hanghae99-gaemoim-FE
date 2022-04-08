import React from "react";
import { Text } from "../elements";
import Badge from "../elements/badge";
import Button from "../elements/Button";
import Grid from "../elements/Grid";
import Input from "../elements/Input";


const AllElements = () => {
  return (
    <React.Fragment>
      <Grid padding="20px">
        <Text size="L">큰글씨</Text>
        <Text size="M">중간글씨</Text>
        <Text bold>두꺼운글씨</Text>
        <Text>그냥 글씨</Text>
      </Grid>

      <Grid padding="20px">
        모집중 뱃지 <Badge type="모집중" />
        모집완료 뱃지 <Badge type="모집완료" />
      </Grid>

      <Grid padding="20px">
        <Button>큰버튼</Button>
        <Button size="S">작은버튼</Button>
        <Button size="XS">수정</Button>
      </Grid>

      <Grid padding="20px">
        <Button color="light">큰버튼</Button>
        <Button size="S" color="light">작은버튼</Button>
        <Button size="XS" color="light">삭제</Button>
      </Grid>

      <Grid width="400px" padding="20px">
        <Input label="라벨" placeholder="플레이스홀더!" />
        <Input type="line" placeholder="라벨이 없는 input" />
        <Input type="checkbox" label="라디오버튼은 체크 해제가 안된대요 ㅠ.ㅠ" />
        <Input type="textarea" placeholder="Textarea" />
      </Grid>

    </React.Fragment>
  );
}

export default AllElements;