import React from "react";
import { Link } from "react-router-dom";

/**A card created for each comment that contains the comment text, type of rating it was, date and time the comment was submitted and contact information if provided. */
const CommentCard = (comment, ratingType, rating, date, contact) => {
  let formattedDate = comment.date.split("T"); //split date and time
  let formattedTime = formattedDate[1];
  formattedTime = formattedTime.slice(1, formattedTime.length - 5); //format the time
  formattedDate = formattedDate[0] + " " + formattedTime; //put date and time back together

  let icon; //display the icon of the type of rating that the comment was submitted with
  if (comment.ratingType === "thumbs") {
    if (comment.rating === 1) {
      //thumbs up
      icon = (
        <i className="material-icons m-1 mt-0 mb-0 comment-rating">thumb_up</i>
      );
    } else {
      //thumbs down
      icon = (
        <i className="material-icons m-1 mt-0 comment-rating mb-0">
          thumb_down
        </i>
      );
    }
  } else if (comment.ratingType === "slider") {
    if (comment.rating === 5) {
      //grinning face
      icon = (
        <span role="img" aria-label="very happy face">
          <i className="m-1 mt-0 mb-0 comment-rating">😀</i>
        </span>
      );
    } else if (comment.rating == 4) {
      //happy face
      icon = (
        <span role="img" aria-label="happy face">
          <i className="m-1 mt-0 mb-0 comment-rating">🙂</i>
        </span>
      );
    } else if (comment.rating == 3) {
      //neutral face
      icon = (
        <span role="img" aria-label="neutral face">
          <i className="m-1 mt-0 mb-0 comment-rating">😐</i>
        </span>
      );
    } else if (comment.rating == 2) {
      //unhappy face
      icon = (
        <span role="img" aria-label="unhappy face">
          <i className="m-1 mt-0 mb-0 comment-rating">😒</i>
        </span>
      );
    } else if (comment.rating == 1) {
      //angry face
      icon = (
        <span role="img" aria-label="angry face">
          <i className="m-1 mt-0 mb-0 comment-rating">😤</i>
        </span>
      );
    }
  } else if (comment.ratingType === "sparks") {
    if (comment.rating === 5) {
      //5 sparks
      icon = (
        <div className="comment-rating-container">
          <i className="demo-icon icon-fullspark m-1 mt-0 comment-rating">
            &#xe800;
          </i>
          <i className="demo-icon icon-fullspark m-1 mt-0 comment-rating">
            &#xe800;
          </i>
          <i className="demo-icon icon-fullspark m-1 mt-0 comment-rating">
            &#xe800;
          </i>
          <i className="demo-icon icon-fullspark m-1 mt-0 comment-rating">
            &#xe800;
          </i>
          <i className="demo-icon icon-fullspark m-1 mt-0 comment-rating">
            &#xe800;
          </i>
        </div>
      );
    } else if (comment.rating === 4) {
      //4 sparks
      icon = (
        <div className="comment-rating-container">
          <i className="demo-icon icon-fullspark m-1 mt-0 comment-rating">
            &#xe800;
          </i>
          <i className="demo-icon icon-fullspark m-1 mt-0 comment-rating">
            &#xe800;
          </i>
          <i className="demo-icon icon-fullspark m-1 mt-0 comment-rating">
            &#xe800;
          </i>
          <i className="demo-icon icon-fullspark m-1 mt-0 comment-rating">
            &#xe800;
          </i>
        </div>
      );
    } else if (comment.rating === 3) {
      //3 sparks
      icon = (
        <div className="comment-rating-container">
          <i className="demo-icon icon-fullspark m-1 mt-0 comment-rating">
            &#xe800;
          </i>
          <i className="demo-icon icon-fullspark m-1 mt-0 comment-rating">
            &#xe800;
          </i>
          <i className="demo-icon icon-fullspark m-1 mt-0 comment-rating">
            &#xe800;
          </i>
        </div>
      );
    } else if (comment.rating === 2) {
      //2 sparks
      icon = (
        <div className="comment-rating-container">
          <i className="demo-icon icon-fullspark m-1 mt-0 comment-rating">
            &#xe800;
          </i>
          <i className="demo-icon icon-fullspark m-1 mt-0 comment-rating">
            &#xe800;
          </i>
        </div>
      );
    } else if (comment.rating === 1) {
      //1 spark
      icon = (
        <i className="demo-icon icon-fullspark m-1 mt-0 comment-rating">
          &#xe800;
        </i>
      );
    }
  }

  let contactContent; //if a contact is provided, display it with a link
  //TODO, link to open email to provided contact
  if (comment.contact !== "") {
    contactContent = (
      <Link to="#">
        <h6 className="comment-contact">{comment.contact}</h6>
      </Link>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <p className="card-text">{comment.comment}</p>
        <div className="comment-info">
          <h6 className="comment-date">{formattedDate}</h6>
          {contactContent}
        </div>
        <div className="icons">{icon}</div>
      </div>
    </div>
  );
};

export default CommentCard;
