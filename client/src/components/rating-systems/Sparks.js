import React from "react";
import Comment from "./Comment";
import PropTypes from "prop-types";

const Sparks = ({
  text,
  comment,
  canContact,
  walmartId,
  addARating,
  addAComment,
  addContactInfo
}) => {
  let rated = false;
  let prev = -1;
  let rating = -1;

  const sparkRate = e => {
    if (rated) {
      prev = rating;
    }
    var id = e.target.id;
    rating = id.slice(-1);
    rated = true;

    if (rating < prev) {
      var i = Number(rating) + 1;
      while (i < 6) {
        document
          .getElementById("feedback-comp-spark" + i)
          .classList.remove("feedback-comp-spark-bright");
        i++;
      }
    }

    document
      .getElementById("feedback-comp-forward-button")
      .classList.remove("feedback-comp-inactive-button");
  };

  const onSubmit = () => {
    if (rated) {
      addARating(rating, "sparks");

      setTimeout(function() {
        document
          .getElementById("feedback-comp-sparks-section")
          .classList.add("feedback-comp-hidden");
        document
          .getElementById("feedback-comp-comment-comp")
          .classList.remove("feedback-comp-hidden");
      }, 300);
    }
  };

  const hoverOver = e => {
    var i = 1;
    var id = e.target.id;

    id = id.slice(-1);

    while (i <= id) {
      document
        .getElementById("feedback-comp-spark" + i)
        .classList.add("feedback-comp-spark-bright");
      i++;
    }
  };

  const hoverOff = e => {
    var i = 1;
    var id = e.target.id;
    id = id.slice(-1);
    while (i <= id) {
      if (!rated || i > rating) {
        document
          .getElementById("feedback-comp-spark" + i)
          .classList.remove("feedback-comp-spark-bright");
      }
      i++;
    }
  };

  return (
    <div>
      <div
        className="feedback-comp-container"
        id="feedback-comp-sparks-section"
      >
        <div className="feedback-comp-row">
          <div className="feedback-comp-content row">
            <div className="feedback-comp-prompt col-lg-6 col-md-7 col-sm-12">
              <h1>
                How would you rate your experience on <nobr>this site?</nobr>
              </h1>
            </div>
            <div className="feedback-comp-sparks-container col-lg-4 col-md-3">
              <div className="feedback-comp-spark-container">
                <i
                  id="feedback-comp-spark1"
                  className="demo-icon icon-fullspark"
                  onClick={sparkRate}
                  onMouseOver={hoverOver}
                  onMouseOut={hoverOff}
                >
                  &#xe800;
                </i>
              </div>
              <div className="feedback-comp-spark-container">
                <i
                  id="feedback-comp-spark2"
                  className="demo-icon icon-fullspark"
                  onClick={sparkRate}
                  onMouseOver={hoverOver}
                  onMouseOut={hoverOff}
                >
                  &#xe800;
                </i>
              </div>
              <div className="feedback-comp-spark-container">
                <i
                  id="feedback-comp-spark3"
                  className="demo-icon icon-fullspark"
                  onClick={sparkRate}
                  onMouseOver={hoverOver}
                  onMouseOut={hoverOff}
                >
                  &#xe800;
                </i>
              </div>
              <div className="feedback-comp-spark-container">
                <i
                  id="feedback-comp-spark4"
                  className="demo-icon icon-fullspark"
                  onClick={sparkRate}
                  onMouseOver={hoverOver}
                  onMouseOut={hoverOff}
                >
                  &#xe800;
                </i>
              </div>
              <div className="feedback-comp-spark-container">
                <i
                  id="feedback-comp-spark5"
                  className="demo-icon icon-fullspark"
                  onClick={sparkRate}
                  onMouseOver={hoverOver}
                  onMouseOut={hoverOff}
                >
                  &#xe800;
                </i>
              </div>
            </div>

            <div className="col-lg-2 col-md-2 feedback-comp-forward">
              <button
                id="feedback-comp-forward-button"
                onClick={onSubmit}
                className="feedback-comp-inactive-button"
              >
                <h4>submit</h4>
                <i className="material-icons">arrow_forward</i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="feedback-comp-hidden" id="feedback-comp-comment-comp">
        <Comment
          comment={comment}
          canContact={canContact}
          walmartId={walmartId}
          addARating={addARating}
          addAComment={addAComment}
          addContactInfo={addContactInfo}
        />
      </div>
    </div>
  );
};

Sparks.propTypes = {
  text: PropTypes.string,
  comment: PropTypes.string,
  canContact: PropTypes.bool,
  walmartId: PropTypes.string,
  addARating: PropTypes.func.isRequired,
  addAComment: PropTypes.func.isRequired,
  addContactInfo: PropTypes.func.isRequired
};

export default Sparks;
