import React from "react";

import CmtWrite from "../components/CmtWrite";
import PostContent from "../components/PostContent";
import CmtList from "../components/CmtList";
import { Badge, Grid } from "../elements";


const PostDetail = () => {


    return (
        <React.Fragment>
            <Grid width="80vw" margin="auto">
                <Badge type="모집중" />
                <PostContent />
                <Grid>
                    <CmtList />
                </Grid>
                <Grid>
                    <CmtWrite />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}


export default PostDetail;