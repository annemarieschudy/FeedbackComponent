import React from "react";
import Complete from "./Complete";
import PropTypes from "prop-types";

const Contact = ({ walmartId, canContact, addContactInfo, complete }) => {
  //when radio button is selected, update canContact to true or false
  const onInput = e => {
    if ((e.target.id = "feedback-comp-canContact")) {
      canContact = true;
    } else if ((e.target.id = "feedback-comp-cannotContact")) {
      canContact = false;
    }
  };

  const onSubmit = e => {
    //if submit button is pressed or user hits 'enter' key while in text input
    if (e.keyCode == null || e.keyCode === 13) {
      addContactInfo(canContact); //add contact info

      //hide contact form and show feedback complete message
      setTimeout(function() {
        document
          .getElementById("feedback-comp-contact-section")
          .classList.add("feedback-comp-hidden");
        document
          .getElementById("feedback-comp-complete-comp")
          .classList.remove("feedback-comp-hidden");
      }, 400);

      //5 seconds after hitting sumbit, hide the feedback component
      setTimeout(function() {
        document
          .getElementById("feedback-component")
          .classList.remove("feedback-component-open");
      }, 5000);
    }
  };

  return (
    <div>
      <div
        className="feedback-comp-container"
        id="feedback-comp-contact-section"
      >
        <div className="feedback-comp-row">
          <div className="feedback-comp-content row">
            <div className="feedback-comp-prompt col-lg-6 col-md-5 col-sm-12 col-xs-6">
              <h1>
                Before you go, can Walmart contact you about your feedback?
              </h1>
            </div>
            <div className="col-lg-4 col-md-5 pl-3 col-sm-12 col-xs-12 feedback-comp-contact-container">
              <div className="feedback-comp-contact-option">
                <input
                  type="radio"
                  name="feedback-comp-can-contact"
                  id="feedback-comp-canContact"
                  onInput={onInput}
                  defaultChecked
                />
                <span>No, don't contact me</span>
              </div>
              <div className="feedback-comp-contact-option">
                <input
                  type="radio"
                  name="feedback-comp-can-contact"
                  id="feedback-comp-cannotContact"
                  onInput={onInput}
                />
                <span>Sure!</span>
              </div>
            </div>

            <div className="col-lg-2 col-md-2 col-sm-12 feedback-comp-forward">
              <button id="feedback-comp-forward-button" onClick={onSubmit}>
                <h4>finish</h4>
                <i className="material-icons">arrow_forward</i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        id="feedback-comp-complete-comp"
        className="rating-container feedback-comp-hidden"
      >
        <Complete complete={complete} />
      </div>
    </div>
  );
};

Contact.propTypes = {
  canContact: PropTypes.bool,
  walmartId: PropTypes.string,
  addContactInfo: PropTypes.func.isRequired
};

export default Contact;
