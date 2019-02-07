import React, { Component } from "react";
import { Route, Router } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/dashboard";
import Auth from "./services/Auth";
import history from "./services/history";

const auth = new Auth();
console.log("kjdfowjeofjwpeojfpwefw");
const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="container">
          <Route path="/" render={props => <App auth={auth} {...props} />} />
          <Route
            exact
            path="/dashboard"
            render={props => <Dashboard auth={auth} {...props} />}
          />
          <Route
            path="/callback"
            render={props => {
              handleAuthentication(props);
              return <div>loading</div>;
            }}
          />
        </div>
      </Router>
    );
  }
}

export default Routes;
