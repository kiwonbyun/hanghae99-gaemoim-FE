import React from "react";
import { Grid, Text } from "../elements";


const CmtList = () => {
    return (
        <React.Fragment>
            <hr />
            <Grid is_flex padding="5px" margin="10px 0">
                <Grid width="20vw">
                    <Text bold>덧글작성자예용</Text>
                </Grid>
                <Grid>
                    <Text>덧글내용이에용. 프로젝트 저두 할래용</Text>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}


export default CmtList;