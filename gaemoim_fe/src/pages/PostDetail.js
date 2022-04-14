import React from "react";
import CmtList from "../components/CmtList";
import CmtWrite from "../components/CmtWrite";
import PostContent from "../components/PostContent";
import { Badge, Grid } from "../elements";




const PostDetail = () => {

    return (
        <React.Fragment>
            <Grid width="80vw" margin="auto">
                <Badge type="모집중" />
                <PostContent />
                <Grid>
                    <CmtList />
                    <CmtList />
                    <CmtList />
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