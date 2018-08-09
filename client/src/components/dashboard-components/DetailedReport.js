import React from "react";
import ReportRow from "./ReportRow";
import ReportTitleRow from "./ReportTitleRow";

/**Displays the detailed data for each AppDashboard by showing a bar chart with values for each value of each rating type and the number of reviews for each with an icon. */
const DetailedReport = (stats, total) => {
  return (
    <div id="detailed-report" className="collapse">
      <ReportTitleRow ratingType="Thumbs" />
      <ReportRow
        ratingType="thumbs"
        value={stats.stats.thumbup}
        rating="1"
        total={stats.total}
      />
      <ReportRow
        ratingType="thumbs"
        value={stats.stats.thumbdown}
        rating="0"
        total={stats.total}
      />
      <ReportTitleRow ratingType="Slider" />
      <ReportRow
        ratingType="slider"
        value={stats.stats.slider5}
        rating="5"
        total={stats.total}
      />
      <ReportRow
        ratingType="slider"
        value={stats.stats.slider4}
        rating="4"
        total={stats.total}
      />
      <ReportRow
        ratingType="slider"
        value={stats.stats.slider3}
        rating="3"
        total={stats.total}
      />
      <ReportRow
        ratingType="slider"
        value={stats.stats.slider2}
        rating="2"
        total={stats.total}
      />
      <ReportRow
        ratingType="slider"
        value={stats.stats.slider1}
        rating="1"
        total={stats.total}
      />
      <ReportTitleRow ratingType="Sparks" />
      <ReportRow
        ratingType="sparks"
        value={stats.stats.spark5}
        rating="5"
        total={stats.total}
      />
      <ReportRow
        ratingType="sparks"
        value={stats.stats.spark4}
        rating="4"
        total={stats.total}
      />
      <ReportRow
        ratingType="sparks"
        value={stats.stats.spark3}
        rating="3"
        total={stats.total}
      />
      <ReportRow
        ratingType="sparks"
        value={stats.stats.spark2}
        rating="2"
        total={stats.total}
      />
      <ReportRow
        ratingType="sparks"
        value={stats.stats.spark1}
        rating="1"
        total={stats.total}
      />
    </div>
  );
};

export default DetailedReport;
