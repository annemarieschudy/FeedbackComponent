import React from "react";
import Comment from "./Comment";
import PropTypes from "prop-types";

/** The feedback prompt for a thumbs up / thumbs down rating. */
const Thumbs = ({
  text,
  comment,
  canContact,
  walmartId,
  addARating,
  addAComment,
  addContactInfo
}) => {
  //when a thumb is clicked, update feedback rating to 0(down) or 1(up)
  const onThumbRate = e => {
    let value = -1;
    if (e.target.id === "feedback-comp-thumbs-up") {
      value = 1;
      document
        .getElementById("feedback-comp-thumbs-up")
        .classList.add("feedback-comp-up");
    } else if (e.target.id === "feedback-comp-thumbs-down") {
      document
        .getElementById("feedback-comp-thumbs-down")
        .classList.add("feedback-comp-down");
      value = 0;
    }

    addARating(value, "thumbs");

    //hide rating prompt and show comment prompt
    setTimeout(function() {
      document
        .getElementById("feedback-comp-thumbs-section")
        .classList.add("feedback-comp-hidden");
      document
        .getElementById("feedback-comp-comment-comp")
        .classList.remove("feedback-comp-hidden");
    }, 400);
  };

  return (
    <div>
      <div
        className="feedback-comp-container"
        id="feedback-comp-thumbs-section"
      >
        <div className="feedback-comp-row">
          <div className="feedback-comp-content row">
            <div className="feedback-comp-prompt col-lg-7 col-md-8 col-sm-8 col-xs-9 pl-3">
              <h1>{text}</h1>
            </div>
            <div className="col-lg-4 col-md-4 pl-3 col-sm-4 col-xs-3 feedback-comp-thumbs-container">
              <div className="feedback-comp-thumb">
                <i
                  id="feedback-comp-thumbs-up"
                  className="material-icons"
                  onClick={onThumbRate}
                >
                  thumb_up{" "}
                </i>
              </div>
              <div className="feedback-comp-thumb">
                <i
                  id="feedback-comp-thumbs-down"
                  onClick={onThumbRate}
                  className="material-icons"
                >
                  thumb_down
                </i>
              </div>
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

Thumbs.propTypes = {
  /**The text of the prompt. */
  text: PropTypes.string,
  /**The comment text. */
  comment: PropTypes.string,
  /**True if can contact */
  canContact: PropTypes.bool,
  /**How to contact the user */
  walmartId: PropTypes.string,
  /**Updates feedback unit with a number rating 0 or 1*/
  addARating: PropTypes.func.isRequired,
  /**Updates the feedback unit with the comment text */
  addAComment: PropTypes.func.isRequired,
  /**Updates the feedback unit with the contact info */
  addContactInfo: PropTypes.func.isRequired
};

export default Thumbs;
