import React from "react";
import PostWrite from "../components/PostWrite";
import { Grid } from "../elements";


const Write = () => {

    return (
        <React.Fragment>
            <Grid width="500px" margin="auto">
                <PostWrite />
            </Grid>
        </React.Fragment>
    );

}


export default Write;