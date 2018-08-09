import React from "react";
import Comment from "./Comment";
import PropTypes from "prop-types";

/** The feedback prompt for a five-spark rating. */
const Sparks = ({
  text,
  comment,
  canContact,
  walmartId,
  addARating,
  addAComment,
  addContactInfo
}) => {
  let rated = false; //set to true once sparkRate is called
  let prev = -1; //if sparkRate is called again, store the previous rating here
  let rating = -1;

  const sparkRate = e => {
    if (rated) {
      prev = rating;
    }
    var id = e.target.id; //get which spark was clicked
    rating = id.slice(-1); //get the rating from the id
    rated = true;

    if (rating < prev) {
      //remove 'bright' class from sparks greater than current rating so that they are not lit up
      var i = Number(rating) + 1;
      while (i < 6) {
        document
          .getElementById("feedback-comp-spark" + i)
          .classList.remove("feedback-comp-spark-bright");
        i++;
      }
    }

    //activate submit button by setting opacity to 1.
    document
      .getElementById("feedback-comp-forward-button")
      .classList.remove("feedback-comp-inactive-button");
  };

  const onSubmit = () => {
    if (rated) {
      //can only submit if sparkRate has been called
      addARating(rating, "sparks");

      setTimeout(function() {
        //hide the spark container
        document
          .getElementById("feedback-comp-sparks-section")
          .classList.add("feedback-comp-hidden");
        //show the comment container
        document
          .getElementById("feedback-comp-comment-comp")
          .classList.remove("feedback-comp-hidden");
      }, 300);
    }
  };

  //light up current spark and all sparks behind it on hover
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

  //remove bright class from sparks and ones ahead of them when mouse moves away
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
              <h1>{text}</h1>
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
  /**The text of the prompt. */
  text: PropTypes.string,
  /**The comment text. */
  comment: PropTypes.string,
  /**True if can contact */
  canContact: PropTypes.bool,
  /**How to contact the user */
  walmartId: PropTypes.string,
  /**Updates feedback unit with a number rating 1,2,3,4,5 */
  addARating: PropTypes.func.isRequired,
  /**Updates the feedback unit with the comment text */
  addAComment: PropTypes.func.isRequired,
  /**Updates the feedback unit with the contact info */
  addContactInfo: PropTypes.func.isRequired
};

export default Sparks;
