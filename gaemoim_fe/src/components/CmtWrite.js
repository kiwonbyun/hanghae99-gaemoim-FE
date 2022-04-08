import React from "react";
import { Button, Grid, Input } from "../elements";


const CmtWrite = () => {
    return (
        <React.Fragment>
            <Grid>
                <Input type="textarea" placeholder="덧글을 작성해주세용" />
                <Grid align="right">
                    <Button size="S">작성하기</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}



export default CmtWrite;