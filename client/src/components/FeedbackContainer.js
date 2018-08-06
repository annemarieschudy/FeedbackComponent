import React, { Component } from "react";
import { connect } from "react-redux";

import {
  addApp,
  rateApp,
  addComment,
  contactInfo
} from "../actions/rateActions";

import Feedback from "./rating-systems/Feedback";

class FeedbackContainer extends Component {
  constructor() {
    super();
    this.state = {
      appName: "WIRE",
      appType: "site",
      ratingType: "",
      rating: -1,
      comment: "",
      canContact: "",
      walmartId: "",
      colorTheme: "",
      displayDelay: 4,
      position: "header"
    };
  }

  componentDidMount() {
    this.setState({
      ratingType: this.props.ratingType,
      colorTheme: this.props.colorTheme
    });
  }

  render() {
    const addARating = (value, type) => {
      const isMobile = getBrowserDimensions();
      const newRating = {
        app: localStorage.getItem("appId"),
        value: value,
        ratingType: type,
        mobile: isMobile
      };
      this.props.rateApp(newRating);
    };

    const addContactInfo = canContact => {
      const newContact = {
        app: localStorage.getItem("appId"),
        feedback: localStorage.getItem("feedbackId"),
        canContact: canContact,
        walmartId: getCurrentUser()
      };
      this.props.contactInfo(newContact);
    };

    const addAComment = commentText => {
      const newComment = {
        app: localStorage.getItem("appId"),
        feedback: localStorage.getItem("feedbackId"),
        comment: commentText
      };

      this.props.addComment(newComment);
    };

    const getCurrentUser = () => {
      const user = "a0s01ph";
      return user;
    };

    const getBrowserDimensions = () => {
      let isMobile = false;
      if (
        this.state.appType === "site" ||
        this.state.appType === "desktop" ||
        this.state.appType === "website"
      ) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        if (width < 481 && height < 737) {
          isMobile = true;
        }
      } else if (
        this.state.appType === "app" ||
        this.state.appType === "mobile"
      ) {
        isMobile = true;
      }

      return isMobile;
    };

    return (
      <div className="app-container">
        <div className="fixed-header">
          <div className="app-content wire-header" />
          <div className="fixed-component" />
          <Feedback
            appName={this.state.appName}
            appType={this.state.appType}
            ratingType={this.state.ratingType}
            colorTheme={this.state.colorTheme}
            text={this.state.text}
            displayDelay={this.state.displayDelay}
            position={this.state.position}
            addApp={this.props.addApp}
            addARating={addARating}
            addAComment={addAComment}
            addContactInfo={addContactInfo}
            isMobile={getBrowserDimensions}
            getCurrentUser={getCurrentUser}
          />
        </div>
        <div className="app-content wire-body" />
      </div>
    );
  }
}

FeedbackContainer.defaultProps = {
  ratingType: "sparks",
  colorTheme: "dark"
};

export default connect(
  null,
  { addApp, rateApp, addComment, contactInfo }
)(FeedbackContainer);
