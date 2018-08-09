import React from "react";

const CommentStats = data => {
  return (
    <div className="section" id="comment-percentages">
      <div className="row">
        <div className="col-md-4">
          <h1 className="first">{data.data.positive}%</h1>
          <p>of positive reviewers left comments</p>
        </div>
        <div className="col-md-4">
          <h1 className="second">{data.data.neutral}%</h1>
          <p>of neutral reviewers left comments</p>
        </div>
        <div className="col-md-4">
          <h1 className="third">{data.data.negative}%</h1>
          <p>of negative reviewers left comments</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4" />
        <div className="col-md-4">
          <button
            id="comment-button"
            onClick={data.toggleView}
            className="button-current"
          >
            view comments
          </button>
        </div>
        <div className="col-md-4" />
      </div>
    </div>
  );
};

export default CommentStats;
