import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import FeedbackContainer from "./components/FeedbackContainer";
import AppDashboard from "./components/AppDashboard";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={FeedbackContainer} />

            <Route
              exact
              path="/thumbs"
              render={props => (
                <FeedbackContainer {...props} ratingType={"thumbs"} />
              )}
            />

            <Route
              exact
              path="/thumbs/light"
              render={props => (
                <FeedbackContainer
                  {...props}
                  ratingType={"thumbs"}
                  colorTheme={"light"}
                />
              )}
            />

            <Route
              exact
              path="/slider"
              render={props => (
                <FeedbackContainer {...props} ratingType={"slider"} />
              )}
            />

            <Route
              exact
              path="/slider/light"
              render={props => (
                <FeedbackContainer
                  {...props}
                  ratingType={"slider"}
                  colorTheme="light"
                />
              )}
            />

            <Route
              exact
              path="/sparks/light"
              render={props => (
                <FeedbackContainer
                  {...props}
                  ratingType={"sparks"}
                  colorTheme={"light"}
                />
              )}
            />

            <Route exact path="/dashboard/app/:id" component={AppDashboard} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

/** comments */
