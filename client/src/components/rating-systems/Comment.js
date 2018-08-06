import React from "react";
import Contact from "./Contact";
import Complete from "./Complete";
import PropTypes from "prop-types";

const Comment = ({
  comment,
  canContact,
  walmartId,
  addAComment,
  addContactInfo,
  complete
}) => {
  let charCount = 0;
  let canSubmit = true;

  const onInput = e => {
    charCount = e.target.value.length;
    document.getElementById("feedback-comp-characters").innerHTML = charCount;

    if (charCount > 0) {
      document.getElementById("feedback-comp-forward-button-text").innerHTML =
        "next";
    }
    if (charCount === 0) {
      document.getElementById("feedback-comp-forward-button-text").innerHTML =
        "skip";
    }
    if (charCount > 280) {
      canSubmit = false;
      document
        .getElementById("feedback-comp-characters")
        .classList.add("feedback-comp-input-err");
      document
        .getElementById("feedback-comp-forward-button")
        .classList.add("feedback-comp-inactive-button");
    }
    if (charCount <= 280 && !canSubmit) {
      canSubmit = true;
      document
        .getElementById("feedback-comp-characters")
        .classList.remove("feedback-comp-input-err");
      document
        .getElementById("feedback-comp-comment-field")
        .classList.remove("feedback-comp-input-err");
      document
        .getElementById("feedback-comp-forward-button")
        .classList.remove("feedback-comp-inactive-button");
    }
  };

  let commentText;

  const onChange = e => {
    commentText = e.target.value;
  };

  const onSubmit = e => {
    //if button is pressed or if user hits 'enter' key in input box
    if (e.keyCode == null || e.keyCode === 13) {
      let nextPage = "feedback-comp-contact-comp";
      if (charCount > 0 && canSubmit) {
        addAComment(commentText);
      } else if (canSubmit && charCount === 0) {
        nextPage = "feedback-comp-complete-comp";
        setTimeout(function() {
          document
            .getElementById("feedback-component")
            .classList.remove("feedback-component-open");
        }, 4000);
      }
      if (canSubmit) {
        //hide comment form and show contact form
        setTimeout(function() {
          document
            .getElementById("feedback-comp-comment-section")
            .classList.add("feedback-comp-hidden");
          document
            .getElementById(nextPage)
            .classList.remove("feedback-comp-hidden");
        }, 400);
      }
      if (!canSubmit) {
        document
          .getElementById("feedback-comp-comment-field")
          .classList.add("feedback-comp-input-err");
      }
    }
  };

  return (
    <div>
      <div
        className="feedback-comp-container"
        id="feedback-comp-comment-section"
      >
        <div className="feedback-comp-row">
          <div className="feedback-comp-content row">
            <div className="feedback-comp-prompt col-lg-4 col-md-3 col-sm-12 pl-4">
              <h1>Care to share your thoughts?</h1>
            </div>
            <div className="col-lg-5 col-md-5 pl-3 col-sm-8 feedback-comp-comment-container">
              <input
                id="feedback-comp-comment-field"
                type="text"
                onInput={onInput}
                onKeyDown={onSubmit}
                placeholder="Tell us what you think"
                autoComplete="off"
                onChange={onChange}
              />
            </div>

            <div className="col-lg-1 col-md-2 col-sm-4 pl-0 ml-0 mr-0 pr-0 feedback-comp-comment-info">
              <p id="feedback-comp-char-count">
                <span id="feedback-comp-characters">0</span>/280
              </p>
              <br />
              <p className="feedback-comp-small-text">characters</p>
            </div>

            <div className="col-lg-2 col-md-2 col-sm-12 feedback-comp-forward">
              <button id="feedback-comp-forward-button" onClick={onSubmit}>
                <h4 id="feedback-comp-forward-button-text">skip</h4>
                <i className="material-icons">arrow_forward</i>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4" />
        </div>
      </div>

      <div className="feedback-comp-hidden" id="feedback-comp-complete-comp">
        <Complete complete={complete} />
      </div>
      <div className="feedback-comp-hidden" id="feedback-comp-contact-comp">
        <Contact
          canContact={canContact}
          walmartId={walmartId}
          addContactInfo={addContactInfo}
          complete={complete}
        />
      </div>
    </div>
  );
};
Comment.propTypes = {
  comment: PropTypes.string,
  canContact: PropTypes.bool,
  walmartId: PropTypes.string,
  addAComment: PropTypes.func.isRequired,
  addContactInfo: PropTypes.func.isRequired
};

export default Comment;
