import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DashHeader from "./dashboard-components/DashHeader";
import Navbar from "./dashboard-components/Navbar";
import DetailedReport from "./dashboard-components/DetailedReport";
import StatBlock from "./dashboard-components/StatBlock";
import CommentStats from "./dashboard-components/CommentStats";
import AppDrawer from "./dashboard-components/AppDrawer";
import Comments from "./dashboard-components/Comments";
import Chart from "./dashboard-components/Chart";

import {
  getAppById,
  getStats,
  getDetailedData,
  getCommentPercentages,
  getAllApps,
  getChartStats,
  getComments,
  clearComments
} from "../actions/dashboardActions";

import getChartDates from "../actions/helper-functions/chart";

/** The main dashboard component, created for each app, that collects and displays stats about the feedback for that product. */
class AppDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      app: {},
      apps: {},
      timeframe: "two-weeks",
      stats: {},
      detailStats: {},
      chartVal: "positive",
      chartStats: {},
      commentStats: {},
      comments: [],
      current: "feedback-button", //display feedback (default) or comments ("comment-button")
      filters: {
        //filter comments by value and device, all is default
        positive: true,
        negative: true,
        neutral: true,
        mobile: true,
        desktop: true
      },
      message: "", //message when there are no comments to display
      loading: false //data loading
    };

    this.toggleView = this.toggleView.bind(this);
    this.toggleTimeFrame = this.toggleTimeFrame.bind(this);
    this.toggleDetailReport = this.toggleDetailReport.bind(this);
    this.filterComments = this.filterComments.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
    this.toggleDevice = this.toggleDevice.bind(this);
    this.toggleChartValue = this.toggleChartValue.bind(this);
  }

  componentDidMount() {
    let dates = getChartDates(this.state.timeframe); //get the dates for the chart
    const time = this.state.timeframe; //set timeframe
    this.props.getAppById(this.props.match.params.id); //get the app by the id in the URL
    this.props.getStats(this.props.match.params.id, time); //get the stats for the app
    this.props.getDetailedData(this.props.match.params.id, time);
    this.props.getCommentPercentages(this.props.match.params.id, time);
    this.props.getChartStats(
      this.props.match.params.id,
      this.state.chartVal,
      dates
    );
    this.props.getComments(
      this.props.match.params.id,
      "all",
      null,
      "both",
      this.state.timeframe
    );
    this.props.getAllApps(); //get all apps in db to display in appDrawer
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.app) {
      this.setState({ app: nextProps.app });
    }
    if (nextProps.stats) {
      this.setState({ stats: nextProps.stats });
    }
    if (nextProps.apps) {
      this.setState({ apps: nextProps.apps });
    }
    if (nextProps.current) {
      this.setState({ current: nextProps.current });
    }
    if (nextProps.timeframe) {
      this.setState({ timeframe: nextProps.timeframe });
    }
    if (nextProps.chartStats) {
      this.setState({ chartStats: nextProps.chartStats });
    }
    if (nextProps.detailedStats) {
      this.setState({ detailedStats: nextProps.detailedStats });
    }
    if (nextProps.comments) {
      this.setState({ comments: nextProps.comments });
    }
    if (nextProps.loading) {
      this.setState({ loading: nextProps.loading });
    }
  }

  //Toggle between feedback view and comments view of the dashboard. Default is feedback and shows the stats, clicking the comment button though sets it to comments and displays comments for the app.
  toggleView(e) {
    this.setState({
      current: e.target.id //update state
    });

    //style the buttons
    document.getElementById(e.target.id).classList.add("button-current");
    if (e.target.id === "feedback-button") {
      document
        .getElementById("comment-button")
        .classList.remove("button-current");
    } else {
      document
        .getElementById("feedback-button")
        .classList.remove("button-current");
    }
  }

  //select different timeframes to view the data from in the tabrow of the dashboard.
  toggleTimeFrame(e) {
    //update all of the stats
    this.props.getStats(this.props.match.params.id, e.target.id);
    this.props.getCommentPercentages(this.props.match.params.id, e.target.id);
    this.props.getDetailedData(this.props.match.params.id, e.target.id);

    //update the chart
    let newDates = getChartDates(e.target.id);
    this.props.getChartStats(this.props.match.params.id, "positive", newDates);

    //update comments
    this.props.getComments(
      this.props.match.params.id,
      "all",
      null,
      "both",
      e.target.id
    );

    //update the state
    this.setState({
      timeframe: e.target.id
    });

    //style the tabs
    let tab = document.getElementsByClassName("active-tab");
    tab = tab[0];
    tab.classList.remove("active-tab");
    document.getElementById(e.target.id).classList.add("active-tab");
  }

  //show or hide the detailed report
  toggleDetailReport() {
    var report = document.getElementById("detailed-report");
    report.classList.toggle("collapse");
    //get the data
    this.props.getDetailedData(
      this.props.match.params.id,
      this.state.timeframe,
      "both"
    );
  }

  //show or hide the detailed report
  toggleDevice(device) {
    this.props.getDetailedData(
      this.props.match.params.id,
      this.state.timeframe,
      device
    );
  }

  toggleChartValue(e) {
    //TODO: Get this working to where it sets the selected value as the chartVal and changes the chart data accordingly
    /* console.log(e.target.id);
    this.setState({
      chartVal: e.target.id
    });
    let dates = getChartDates(this.state.timeframe); //get the dates for the chart
    console.log(this.state.charVal);
    this.props.getChartStats(
      this.props.match.params.id,
      this.state.chartVal,
      dates
    ); */
    document.getElementById("chart-legend-values").classList.add("hidden");
  }

  //update the filters on the comments based on button input
  filterComments(value1, value2, device) {
    //if all values are selected, value1 == "all" and value2 is null. If two values are selected, value1 and value2 will be set to those values. Device is "mobile", "desktop" or "both".
    if ((device && value1) || (device && value2)) {
      this.setState({
        message: ""
      });
      this.props.getComments(
        this.props.match.params.id,
        value1,
        value2,
        device,
        this.state.timeframe
      );
    } else {
      this.props.clearComments(
        //clearComments state if no comments to display
        this.props.match.params.id,
        this.state.timeframe
      );
    }
  }

  //update the filter object in state according to user input
  updateFilters(id) {
    this.state.filters[id] = !this.state.filters[id];
    if (!(this.state.filters.desktop || this.state.filters.mobile)) {
      this.setState({
        message: "Please select at least one device type."
      });
    } else if (
      !(
        this.state.filters.positive ||
        this.state.filters.negative ||
        this.state.filters.neutral
      )
    ) {
      this.setState({
        message:
          "Please select at least one value - positive, negative or neutral - to view comments."
      });
    }
  }

  render() {
    const {
      app,
      apps,
      stats,
      detailedStats,
      commentStats,
      chartStats,
      comments
    } = this.props;

    let dashHead; //the header content
    let dashContent; //the body of the dashboard

    if (app === {} || app === undefined) {
      dashHead = "";
    } else {
      //dashhead contains title, "feedback"/"comment" buttons, timeframe tabs and back button.
      dashHead = (
        <DashHeader
          appName={app.appName}
          appId={app._id}
          toggler={this.toggleTimeFrame}
          toggleView={this.toggleView}
        />
      );
    }

    if (
      this.state.loading ||
      this.state.app === {} ||
      this.state.stats === {} ||
      this.state.chartData === {} ||
      this.state.commeents === []
    ) {
      dashContent = "";
    } else if (this.state.current === "comment-button") {
      //if comment is the current view, show comments component
      dashContent = (
        <Comments
          comments={comments}
          filterComments={this.filterComments}
          filter={this.state.filters}
          updateFilters={this.updateFilters}
          message={this.state.message}
        />
      );
    } else if (this.state.current === "feedback-button") {
      //else show feedback stats, which includes overview stats, chart, detailed report, & comment percentages
      dashContent = (
        <div id="dashboard-content">
          <div className="row numbers-row">
            <StatBlock value={stats.total} label={"left feedback"} />
            <StatBlock value={stats.positive} label="positive reviews" />
            <StatBlock value={stats.neutral} label="neutral reviews" />
            <StatBlock value={stats.negative} label="negative reviews" />
          </div>
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
                onClick={this.toggleDetailReport}
              >
                + show detailed report
              </button>
            </div>
            <div className="col-md-4">
              <hr />
            </div>
          </div>
          <DetailedReport
            stats={detailedStats}
            total={stats.total}
            toggleDevice={this.toggleDevice}
          />
          <Chart
            stats={chartStats}
            value={this.state.chartVal}
            toggleChartValue={this.toggleChartValue}
          />
          <CommentStats data={commentStats} toggleView={this.toggleView} />
        </div>
      );
    }

    return (
      <div>
        <Navbar />
        <AppDrawer apps={apps} />
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
  /**The app that the dashboard is for. */
  app: PropTypes.object.isRequired,
  /**All apps in the DB, to display in the app drawer */
  apps: PropTypes.array.isRequired,
  /**The timeframe to show data for, can be selected in navigation */
  timeframe: PropTypes.string.isRequired,
  /**Feedback stats for the app (total, positive, negative, neutral) */
  stats: PropTypes.object.isRequired,
  /**Specific stats for the detailed report. */
  detailedStats: PropTypes.object.isRequired,
  /**The percentage of reviewers that left comments. */
  commentStats: PropTypes.object.isRequired,
  /**Comments left for the app */
  comments: PropTypes.array.isRequired,
  /**Percentages and dates to display in the chart */
  chartStats: PropTypes.object.isRequired,
  /**The type of rating being charted (positive, negative or neutral) */
  chartVal: PropTypes.string.isRequired,
  /**Function to get the current app by the id in the url */
  getAppById: PropTypes.func.isRequired,
  /** Get all apps in the DB to display in app drawer */
  getAllApps: PropTypes.func.isRequired,
  /**Gets overviews stats for the app */
  getStats: PropTypes.func.isRequired,
  /**Gets the detailed report stats */
  getDetailedData: PropTypes.func.isRequired,
  /** Gets the comment percentages */
  getCommentPercentages: PropTypes.func.isRequired,
  /** Gets the comments based on current filters */
  getComments: PropTypes.func.isRequired,
  /** Gets the chart dates and percentages */
  getChartStats: PropTypes.func.isRequired
};

AppDashboard.defaultProps = {
  timeframe: "two-weeks",
  chartVal: "positive"
};

const mapStateToProps = state => ({
  app: state.dashboard.app,
  apps: state.dashboard.apps,
  stats: state.dashboard.stats,
  detailedStats: state.dashboard.detailedStats,
  chartStats: state.dashboard.chartStats,
  commentStats: state.dashboard.commentStats,
  comments: state.dashboard.comments
});

export default connect(
  mapStateToProps,
  {
    getAppById,
    getStats,
    getDetailedData,
    getCommentPercentages,
    getAllApps,
    getChartStats,
    getComments,
    clearComments
  }
)(AppDashboard);
