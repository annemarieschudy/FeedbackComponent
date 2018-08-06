import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DashHeader from "./dashboard-components/DashHeader";
import Navbar from "./dashboard-components/Navbar";
import DetailedReport from "./dashboard-components/DetailedReport";
import Stats from "./dashboard-components/Stats";
import CommentStats from "./dashboard-components/CommentStats";
import AppDrawer from "./dashboard-components/AppDrawer";
import Comments from "./dashboard-components/Comments";

import axios from "axios";

import Chart from "./dashboard-components/Chart";

import {
  getAppByName,
  getAppById,
  getAllApps,
  getCountOf
} from "../actions/dashboardActions";

class AppDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      app: {},
      timeframe: "two-weeks",
      stats: [0, 0, 0, 0],
      detailStats: [],
      chartStats: [],
      commentStats: [0, 0, 0],
      comments: [],
      current: false
    };
  }

  componentDidMount() {
    const time = this.state.timeframe;
    axios
      .all([
        axios.get(`/api/dashboard/app/${this.props.match.params.name}`),
        axios.get(
          `/api/dashboard/app/${
            this.props.match.params.name
          }/all/all/both/${time}`
        ),
        axios.get(
          `/api/dashboard/app/${
            this.props.match.params.name
          }/all/positive/both/${time}`
        ),
        axios.get(
          `/api/dashboard/app/${
            this.props.match.params.name
          }/all/neutral/both/${time}`
        ),
        axios.get(
          `/api/dashboard/app/${
            this.props.match.params.name
          }/all/negative/both/${time}`
        ),
        axios.get(
          `/api/dashboard/app/${
            this.props.match.params.name
          }/all/positive/${time}/both/comments/percentage`
        ),
        axios.get(
          `/api/dashboard/app/${
            this.props.match.params.name
          }/all/neutral/${time}/both/comments/percentage`
        ),
        axios.get(
          `/api/dashboard/app/${
            this.props.match.params.name
          }/all/negative/${time}/both/comments/percentage`
        )
      ])
      .then(
        axios.spread(
          (
            app,
            total,
            positive,
            neutral,
            negative,
            positiveComments,
            neutralComments,
            negativeComments
          ) => {
            this.setState({
              app: app.data,
              stats: [total.data, positive.data, neutral.data, negative.data],
              commentStats: [
                positiveComments.data,
                neutralComments.data,
                negativeComments.data
              ]
            });
          }
        )
      );
  }

  toggleView() {
    this.setState({
      current: !this.state.current
    });
    console.log("toggle view");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.app) {
      this.setState({ app: nextProps.app }).bind(this);
    } else {
      this.props.history.push("/not-found");
    }
  }

  render() {
    console.log(this.props);
    //const app = this.state.app;
    let timeframe = this.state.timeframe;

    const toggleDetailReport = () => {
      document.getElementById("detailed-report").classList.toggle("collapse");
    };

    const toggleTimeFrame = e => {
      console.log("toggled!");
      timeframe = e.target.id;
    };

    const getAll = (type, value, timeframe) => {
      const apps = this.props.getAllApps();
      Object.keys(apps).map((app, i) =>
        this.props.getCountOf(apps[app]._id, type, value, timeframe)
      );
    };

    const id = this.state.app._id;

    let dashContent;
    let dashHead;
    if (this.state.app == {} || this.state.app.appName === undefined) {
      dashHead = "";
    } else {
      dashHead = (
        <DashHeader
          appName={this.state.app.appName}
          appId={this.state.app._id}
          toggler={toggleTimeFrame}
          toggleView={this.toggleView}
          current={this.state.current}
        />
      );
    }

    if (this.state.app == {} || this.state.app.appName === undefined) {
      dashContent = "";
    } else if (this.state.current) {
      dashContent = <Comments />;
    } else {
      const { app } = this.props;
      const name = this.state.app.appName;

      dashContent = (
        <div id="dashboard-content">
          <Stats data={this.state.stats} />
          <div className="row" id="toggle-detail">
            <div className="col-md-4">
              <hr />
            </div>
            <div className="col-md-4">
              <button
                className="no-border"
                data-toggle="collapse"
                href="#detailed-report"
                role="button"
                aria-expanded="false"
                aria-controls="detailed-report"
                onClick={toggleDetailReport}
              >
                + show detailed report
              </button>
            </div>
            <div className="col-md-4">
              <hr />
            </div>
          </div>
          <DetailedReport appId={app} timeframe={app} />
          <Chart appId={app} timeframe={app} />
          <CommentStats data={this.state.commentStats} />
        </div>
      );
    }

    return (
      <div>
        <Navbar />
        <AppDrawer />
        <main role="main">
          <div id="dashboard">
            {dashHead}
            {dashContent}
          </div>
        </main>
      </div>
    );
  }
}

AppDashboard.propTypes = {
  app: PropTypes.object.isRequired,
  timeframe: PropTypes.string.isRequired,
  getAppByName: PropTypes.func.isRequired,
  getAppById: PropTypes.func.isRequired
};

AppDashboard.defaultProps = {
  timeframe: "two-weeks"
};

const mapStateToProps = state => ({
  app: state.app
});

export default connect(
  mapStateToProps,
  { getAppByName, getAppById }
)(AppDashboard);
