import React, { useEffect } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configStore";
import { useDispatch } from "react-redux";
import { actionCreators } from "./redux/modules/user";
import { actionCreators2 } from "./redux/modules/post";
import Write from "./Write";
import Detail from "./Detail";
import Postedit from "./Postedit";
import Mainpage from "./Main_page";

import Header from "./Header";
import Signup from "./Signup";
import Login from "./Login";
import Main from "./Main";
import PostDetail from "./pages/PostDetail";
import Write from "./pages/Write"



function App() {
  const dispatch = useDispatch();
  const is_session = sessionStorage.getItem("token") ? true : false;

  useEffect(() => {
    if (is_session) {
      dispatch(actionCreators.userCheckDB());
    }
  }, []);

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
          <Route path="/:id" exact>
            <Mainpage />
          </Route>
          <Route path="/detail/:postid">
            <Detail />
          </Route>
          <Route path="/write/edit/:postid">
            <Postedit />
          </Route>
        </Switch>
        <Route path="/post" exact component={PostDetail}/>
        <Route path="/write" exact component={Write}/>
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
