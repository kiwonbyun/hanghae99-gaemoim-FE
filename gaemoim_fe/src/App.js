import React, { useEffect } from "react";
import Header from "./Header";
import { Route, Router, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import Signup from "./Signup";
import Login from "./Login";
import Main from "./Main";
import { history } from "./redux/configStore";
import { useDispatch } from "react-redux";
import { actionCreators } from "./redux/modules/user";

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
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
