import React from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";
import { useDispatch } from "react-redux";
// import { actionCreators } from "./redux/modules/user";

import Header from "../components/Header";
import { Login, Main, PostDetail, Signup, Write } from "../pages";




function App() {
  const dispatch = useDispatch();
  const is_session = sessionStorage.getItem("token") ? true : false;



  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Header />
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/" exact>
            <Main />
          </Route>
        </Switch>
        <Route path="/post/:postid" exact component={PostDetail}/>
        <Route path="/write" exact component={Write}/>
        <Route path="/write/:postId" exact component={Write}/>
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
