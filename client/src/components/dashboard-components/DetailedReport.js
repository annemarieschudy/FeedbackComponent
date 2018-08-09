import React from "react";
import ReportRow from "./ReportRow";
import ReportTitleRow from "./ReportTitleRow";

/**Displays the detailed data for each AppDashboard by showing a bar chart with values for each value of each rating type and the number of reviews for each with an icon. */
const DetailedReport = (stats, total, toggleDevice) => {
  const filterByDevice = e => {
    let device = "none";
    if (e.target.id === "desktop-button") {
      if (e.target.classList.contains("button-current")) {
        if (
          document
            .getElementById("mobile-button")
            .classList.contains("button-current")
        ) {
          device = "mobile";
          e.target.classList.remove("button-current");
        } else {
          device = "mobile";
          document
            .getElementById("mobile-button")
            .classList.add("button-current");
          document
            .getElementById("desktop-button")
            .classList.remove("button-current");
        }
      } else {
        e.target.classList.add("button-current");
        if (
          document
            .getElementById("mobile-button")
            .classList.contains("button-current")
        ) {
          device = "both";
        } else {
          device = "desktop";
        }
      }
    } else {
      if (e.target.classList.contains("button-current")) {
        if (
          document
            .getElementById("desktop-button")
            .classList.contains("button-current")
        ) {
          device = "desktop";
          e.target.classList.remove("button-current");
        } else {
          device = "desktop";
          document
            .getElementById("desktop-button")
            .classList.add("button-current");
          document
            .getElementById("mobile-button")
            .classList.remove("button-current");
        }
      } else {
        e.target.classList.add("button-current");
        if (
          document
            .getElementById("desktop-button")
            .classList.contains("button-current")
        ) {
          device = "both";
        } else {
          device = "mobile";
        }
      }
    }
    stats.toggleDevice(device);
  };
  return (
    <div id="detailed-report" className="collapse">
      <div className="row pb-5">
        <div className="col-md-3" />
        <div className="col-md-3">
          <button
            id="desktop-button"
            onClick={filterByDevice}
            className="button-current"
          >
            desktop
          </button>
        </div>
        <div className="col-md-3">
          <button
            id="mobile-button"
            onClick={filterByDevice}
            className="button-current"
          >
            mobile
          </button>
        </div>
      </div>
      {stats.message}
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
