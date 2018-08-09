import React from "react";
import CommentCard from "./CommentCard";

//Displays comment filters and sorts, search bar for comments, and all of the comment cards for the app.
const Comments = (comments, filterComments, filter, updateFilters, message) => {
  let commentData = [];
  if (comments.comments != []) {
    commentData = comments.comments; //get all of the passed in comment objects
  }

  //default filters
  let value1 = null;
  let value2 = null;
  let device = "both";

  const filters = comments.filter; //get the current filters
  const toggleFilter = e => {
    comments.updateFilters(e.target.id); //update the filters state based on button clicked
    e.target.classList.toggle("selected"); //update button styling

    //update the values and device variables
    if (filters.positive && filters.negative && filters.neutral) {
      value1 = "all";
      value2 = null;
    } else if (filters.positive) {
      value1 = "positive";
      if (filters.negative) {
        value2 = "negative";
      } else if (filters.neutral) {
        value2 = "neutral";
      } else {
        value2 = null;
      }
    } else if (filters.neutral) {
      value1 = "neutral";
      if (filters.negative) {
        value2 = "negative";
      } else {
        value2 = null;
      }
    } else if (filters.negative) {
      value1 = "negative";
      value2 = null;
    }

    if (filters.mobile && filters.desktop) {
      device = "both";
    } else if (filters.mobile) {
      device = "mobile";
    } else if (filters.desktop) {
      device = "desktop";
    } else {
      device = null;
    }

    //filter the comments
    comments.filterComments(value1, value2, device);
  };

  let none; //the message to display if there are no comments
  if (comments.comments == []) {
    none = <h1>Sorry, no comments to display</h1>;
  }

  return (
    <div>
      <div className="search-comments row">
        <div className="col-md-4" />
        <div className="col-md-4">
          <i id="search-icon" className="material-icons">
            search
          </i>
          <input
            type="text"
            placeholder="Search comments"
            id="search-field"
            onkeyup="filterFunction()"
          />
        </div>
        <div className="col-md-4" />
      </div>
      <div className="row mb-0">
        <div className="col-md-10">
          <p className="ml-4">filter by:</p>
        </div>
        <div className="col-md-2">
          <p>sort by:</p>
        </div>
      </div>

      <div className="filter-comment row mt-0">
        <div className="col-md-2">
          <button
            id="positive"
            onClick={toggleFilter}
            className="filter-section selected"
          >
            positive rating
          </button>
        </div>
        <div className="col-md-2">
          <button
            id="neutral"
            onClick={toggleFilter}
            className="filter-section selected"
          >
            neutral rating
          </button>
        </div>
        <div className="col-md-2">
          <button
            id="negative"
            onClick={toggleFilter}
            className="filter-section selected"
          >
            negative rating
          </button>
        </div>
        <div className="col-md-2">
          <button
            id="desktop"
            onClick={toggleFilter}
            className="filter-section selected"
          >
            desktop rating
          </button>
        </div>
        <div className="col-md-2">
          <button
            id="mobile"
            onClick={toggleFilter}
            className="filter-section selected"
          >
            mobile rating
          </button>
        </div>
        <div className="col-md-2">
          <div className="dropdown">
            <button onclick="myFunction()" className="dropbtn no-border">
              <p>most recent</p>{" "}
              <i className="material-icons">arrow_drop_down</i>
            </button>
            <div id="myDropdown" className="dropdown-content">
              <li className="current">most recent</li>
              <li>oldest</li>
              <li>longest to shortest</li>
              <li>shortest to longest</li>
              <li>rating type</li>
            </div>
          </div>
        </div>
      </div>

      <div className="section mt-3" id="comments-container">
        {comments.message}

        <div className="card-columns">
          {commentData.map((comment, index) => {
            return (
              <CommentCard
                comment={comment.comment}
                ratingType={comment.ratingType}
                rating={comment.rating}
                contact={comment.contact}
                date={comment.date}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Comments;
