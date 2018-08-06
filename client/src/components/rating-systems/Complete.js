import React from "react";

const Complete = complete => {
  return (
    <div>
      <div
        className="feedback-comp-container"
        id="feedback-comp-complete-section"
      >
        <div className="feedback-comp-row">
          <div className="feedback-comp-content row">
            <div className="feedback-comp-prompt col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <h1>
                {" "}
                <i className="material-icons">check_circle</i>Thanks for the
                feedback! Now get back to doing <nobr>what you do...</nobr>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complete;
