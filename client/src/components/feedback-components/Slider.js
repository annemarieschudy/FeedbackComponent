import React from "react";
import Comment from "./Comment";
import PropTypes from "prop-types";

/** The feedback prompt for a slider rating. */
const Slider = ({
  text,
  comment,
  canContact,
  walmartId,
  addARating,
  addAComment,
  addContactInfo,
  value = 2
}) => {
  let rated = false;
  let rating = -1;

  const onInput = e => {
    var labels = ["😤", "😒", "😐", "🙂", "😀"]; //face reactions
    var ariaLabels = ["angry", "unhappy", "ok", "happy", "very happy"]; //accessibility labels for each face
    var output = document.getElementById("feedback-comp-slider-label"); //where the faces will go

    var slider = document.getElementById("feedback-comp-ratingsSlider");
    this.value = slider.value; //update the slider button position with value

    var gradients = [
      //slider colors change based on the value
      "linear-gradient(to left, #ffada5, #ffada5)",
      "linear-gradient(to left, #ffada5, #e6e6e6)",
      "linear-gradient(to left, #e6e6e6, #e6e6e6)",
      "linear-gradient(to right, #c7ffa0, #e6e6e6)",
      "linear-gradient(to left, #c7ffa0, #c7ffa0)"
    ];

    output.innerHTML = `<span role="img" aria-label="${
      ariaLabels[slider.value]
    }">${labels[slider.value]}</span>`; //set face output
    slider.style.backgroundImage = gradients[slider.value]; //set slider color

    //activie submit button by setting opacity to 1
    setTimeout(function() {
      document
        .getElementById("feedback-comp-forward-button")
        .classList.remove("feedback-comp-inactive-button");
    }, 200);

    rated = true;
    rating = e.target.value; //get the value from the slider
  };

  const onSubmit = () => {
    if (rated) {
      //can only submit if it has been rated
      addARating(Number(rating) + 1, "slider");

      setTimeout(function() {
        //hide the slider section
        document
          .getElementById("feedback-comp-slider-section")
          .classList.add("feedback-comp-hidden");
        //display the comment section
        document
          .getElementById("feedback-comp-comment-comp")
          .classList.remove("feedback-comp-hidden");
      }, 300);
    }
  };

  return (
    <div>
      <div
        className="feedback-comp-container"
        id="feedback-comp-slider-section"
      >
        <div className="feedback-comp-row">
          <div className="feedback-comp-content row">
            <div className="feedback-comp-prompt col-lg-6 col-md-5 col-sm-12 pl-4">
              <h1>{text}</h1>
            </div>
            <div className="col-lg-4 col-md-5 pl-3 col-sm-12 feedback-comp-slider-container">
              <div className="feedback-comp-slider-inner-container">
                <input
                  type="range"
                  min="0"
                  max="4"
                  value={this.value}
                  className="feedback-comp-slider"
                  id="feedback-comp-ratingsSlider"
                  onInput={onInput}
                />
                <h3 id="feedback-comp-slider-label">
                  <span role="img" aria-label="happy">
                    🙂
                  </span>
                </h3>
              </div>
            </div>

            <div className="col-lg-2 col-md-2 col-sm-12 feedback-comp-forward">
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

Slider.propTypes = {
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

export default Slider;
