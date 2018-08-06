import React, { Component } from "react";
import ReportRow from "./ReportRow";
import ReportTitleRow from "./ReportTitleRow";

class DetailedReport extends Component {
  render() {
    return (
      <div id="detailed-report" className="collapse">
        <ReportTitleRow ratingType="Thumbs" />
        <ReportRow ratingType="thumbs" value="0" timeframe="two-weeks" />
        <ReportRow ratingType="thumbs" value="1" timeframe="two-weeks" />
        <ReportTitleRow ratingType="Slider" />
        <ReportRow ratingType="slider" value="1" timeframe="two-weeks" />
        <ReportRow ratingType="slider" value="2" timeframe="two-weeks" />
        <ReportRow ratingType="slider" value="3" timeframe="two-weeks" />
        <ReportRow ratingType="slider" value="4" timeframe="two-weeks" />
        <ReportRow ratingType="slider" value="5" timeframe="two-weeks" />
        <ReportTitleRow ratingType="Sparks" />
        <ReportRow ratingType="sparks" value="1" timeframe="two-weeks" />
        <ReportRow ratingType="sparks" value="2" timeframe="two-weeks" />
        <ReportRow ratingType="sparks" value="3" timeframe="two-weeks" />
        <ReportRow ratingType="sparks" value="4" timeframe="two-weeks" />
        <ReportRow ratingType="sparks" value="5" timeframe="two-weeks" />
      </div>
    );
  }
}

export default DetailedReport;
