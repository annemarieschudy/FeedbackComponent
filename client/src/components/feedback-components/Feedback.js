import React from "react";
import PropTypes from "prop-types";
import Idle from "react-idle";

import Thumbs from "./Thumbs";
import Slider from "./Slider";
import Sparks from "./Sparks";

/** A full-width, fixed-position bar component for gathering feedback on the site or app. Requires the use of react-idle to hide component after 80 seconds of inaction.   */
const Feedback = ({
  addApp,
  appName,
  appType,
  ratingType,
  colorTheme,
  displayDelay,
  position,
  comment,
  canContact,
  walmartId,
  addARating,
  addAComment,
  addContactInfo,
  getCurrentUser,
  isMobile
}) => {
  //Check if feedback unit has been created and set in local storage
  //Check if appId is set in local storage
  if (!localStorage.getItem("appId")) {
    const newApp = {
      //if not, create new one from props (or get app by same name in the database)
      appName: appName,
      appType: appType
    };
    addApp(newApp); //call giveFeedback function
  }

  //Delay the appearance of the feedback component
  displayDelay = displayDelay * 1000;
  setTimeout(function() {
    document
      .getElementById("feedback-component")
      .classList.add("feedback-component-open");
  }, displayDelay);

  //Hide the component - called when idle for a long period of time
  const hideComponent = () => {
    document
      .getElementById("feedback-component")
      .classList.remove("feedback-component-open");
  };

  //Determine the rating type to display
  let content;
  let text = `How would you rate your experience on this`;
  let prompt = `${text} ${appType}?`;
  if (ratingType === "sparks") {
    content = (
      <Sparks
        text={prompt}
        comment={comment}
        walmartId={walmartId}
        canContact={canContact}
        addARating={addARating}
        addAComment={addAComment}
        addContactInfo={addContactInfo}
      />
    );
  } else if (ratingType === "slider") {
    content = (
      <Slider
        text={prompt}
        comment={comment}
        walmartId={walmartId}
        canContact={canContact}
        addARating={addARating}
        addAComment={addAComment}
        addContactInfo={addContactInfo}
      />
    );
  } else {
    content = (
      <Thumbs
        text={prompt}
        comment={comment}
        walmartId={walmartId}
        canContact={canContact}
        addARating={addARating}
        addAComment={addAComment}
        addContactInfo={addContactInfo}
      />
    );
  }

  //style the component based on the colorTheme and position props
  const classeslist = `feedback-component-color-theme-${colorTheme} feedback-component-position-${position}`;
  return (
    <div id="feedback-component" className={classeslist}>
      <Idle
        timeout={80000} //milliseconds until idle component is hidden
        onChange={({ idle }) => {
          if (idle) {
            hideComponent();
          }
        }}
      />
      {content}
    </div>
  );
};

Feedback.propTypes = {
  /**Initialize the app and a unit of feedback. */
  addApp: PropTypes.func.isRequired,
  /**Should be unique, avoid special characters like & or @ */
  appName: PropTypes.string.isRequired,
  /**Either 'app' or 'site' or 'website' */
  appType: PropTypes.string.isRequired,
  /**Either 'thumbs' (default), 'sparks', or 'slider' */
  ratingType: PropTypes.string.isRequired,
  /**Either 'light' (default) or 'dark' */
  colorTheme: PropTypes.string,
  /**Fixed "header" or "footer", "block" for neither. Default "header" */
  position: PropTypes.string,
  /**How long is someone on app before prompted for feedback? */
  displayDelay: PropTypes.number,
  /**Optional textual feedback, starts as empty string */
  comment: PropTypes.string,
  /**Boolean - user can opt in to be contacted */
  canContact: PropTypes.bool,
  /**Contact method input by user, starts as empty string */
  walmartId: PropTypes.string,
  /**If feedback given on mobile version of site or on mobile app */
  mobile: PropTypes.bool,
  /**Updates feedback unit with a number rating 0,1,2,3,4,5 */
  addARating: PropTypes.func.isRequired,
  /**Updates feedback unit with a comment */
  addAComment: PropTypes.func.isRequired,
  /**Updates a feedack unit with canContact and walmartId info */
  addContactInfo: PropTypes.func.isRequired,
  /**Gets the current user of the system */
  getCurrentUser: PropTypes.func.isRequired,
  /**Gets the current user of the system */
  isMobile: PropTypes.func.isRequired
};

Feedback.defaultProps = {
  ratingType: "sparks",
  colorTheme: "dark",
  displayDelay: 5,
  position: "header",
  appType: "app",
  canContact: false,
  mobile: false
};

export default Feedback;
