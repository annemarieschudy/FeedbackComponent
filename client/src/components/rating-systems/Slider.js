import React from "react";
import Comment from "./Comment";
import PropTypes from "prop-types";

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
    var ariaLabels = ["angry", "unhappy", "ok", "happy", "very happy"];
    var output = document.getElementById("feedback-comp-slider-label"); //where the faces will go

    var slider = document.getElementById("feedback-comp-ratingsSlider");
    this.value = slider.value;

    var gradients = [
      //slider colors change based on the review
      "linear-gradient(to left, #ffada5, #ffada5)",
      "linear-gradient(to left, #ffada5, #e6e6e6)",
      "linear-gradient(to left, #e6e6e6, #e6e6e6)",
      "linear-gradient(to right, #c7ffa0, #e6e6e6)",
      "linear-gradient(to left, #c7ffa0, #c7ffa0)"
    ];

    output.innerHTML = `<span role="img" aria-label="${
      ariaLabels[slider.value]
    }">${labels[slider.value]}</span>`; //set face
    slider.style.backgroundImage = gradients[slider.value]; //set slider color
    setTimeout(function() {
      document
        .getElementById("feedback-comp-forward-button")
        .classList.remove("feedback-comp-inactive-button");
    }, 200);
    rated = true;
    rating = e.target.value;
  };

  const onSubmit = () => {
    if (rated) {
      addARating(Number(rating) + 1, "slider");

      setTimeout(function() {
        document
          .getElementById("feedback-comp-slider-section")
          .classList.add("feedback-comp-hidden");
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
  text: PropTypes.string,
  comment: PropTypes.string,
  canContact: PropTypes.bool,
  walmartId: PropTypes.string,
  addARating: PropTypes.func.isRequired,
  addAComment: PropTypes.func.isRequired,
  addContactInfo: PropTypes.func.isRequired
};

export default Slider;
