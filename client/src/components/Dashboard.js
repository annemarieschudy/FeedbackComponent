import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { getAllFeedback } from "../actions/dashboardActions";

import AppDashboard from "./AppDashboard";

class Dashboard extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={AppDashboard} />

          <Route
            exact
            path="/dashboard/app/name/:name"
            component={AppDashboard}
          />
        </div>
      </Router>
    );
  }
}

export default Dashboard;
