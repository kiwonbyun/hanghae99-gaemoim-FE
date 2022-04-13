import React from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";
import { useDispatch } from "react-redux";
// import { actionCreators } from "./redux/modules/user";

import Header from "../components/Header";
import { Login, Main, Main2, PostDetail, Signup, Write } from "../pages";
import { actionCreators as userCreator } from "../redux/modules/user";



function App() {
  const dispatch = useDispatch();
  const is_login = localStorage.getItem("token") ? true : false;

  React.useEffect(() => {
    if(is_login){
      dispatch(userCreator.loginCheckDB());
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Header />
        <Switch>
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Main} />
          <Route path="/:id" exact component={Main2} />
          <Route path="/post/:postid" exact component={PostDetail} />
          <Route path="/write" exact component={Write} />
          <Route path="/write/:postId" exact component={Write} />
        </Switch>
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
