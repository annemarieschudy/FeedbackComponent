import React, { Component } from "react";
import CommentCard from "./CommentCard";
import axios from "axios";

class Comments extends Component {
  render() {
    let comments = [];
    let commentList;
    let selected = {
      positive: true,
      negative: true,
      neutral: true,
      mobile: true,
      desktop: true
    };
    const time = "two-weeks";
    const app = "5b63159bcd6e0b0cbe206225";

    const toggleFilter = e => {
      if (selected[e.target.id]) {
        selected[e.target.id] = !selected[e.target.id];
      }
      e.target.classList.toggle("selected");

      commentList = filterComments(selected);
      console.log("complete,", commentList);
    };

    const filterComments = () => {
      let device = null;
      let value = null;
      let value2 = null;
      let comments = [];
      if (selected.mobile) {
        if (selected.desktop) {
          device = "both";
        } else {
          device = "mobile";
        }
      } else {
        if (selected.desktop) {
          device = "desktop";
        } else {
          device = "both";
        }
      }
      if (selected.positive) {
        if (selected.neutral) {
          if (selected.negative) {
            value = "all";
          } else {
            value = "positive";
            value2 = "neutral";
          }
        } else {
          value = "positive";
          if (selected.negative) {
            value2 = "negative";
          }
        }
      } else if (selected.negative) {
        value = "negative";
        if (selected.neutral) {
          value = "neutral";
        }
      } else if (selected.neutral) {
        value = "neutral";
      }
      console.log(value, value2, device);
      let comment;
      if (value2) {
        axios
          .all([
            axios.get(
              `/api/dashboard/app/${app}/all/${value}/${device}/${time}/comments`
            ),
            axios.get(
              `/api/dashboard/app/${app}/all/${value2}/${device}/${time}/comments`
            )
          ])
          .then(
            axios.spread((res1, res2) => {
              comments = res1.data;
              comments.concat(res2.data);
            })
          );
      } else {
        axios
          .get(
            `/api/dashboard/app/${app}/all/${value}/${device}/${time}/comments`
          )
          .then(res => {
            console.log(res.data);
          });
      }
      console.log(comment);
      return comment;
    };

    console.log(this.comments);

    console.log(commentList);

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
          <div className="card-columns">
            {commentList}
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
          </div>
        </div>
      </div>
    );
  }
}

export default Comments;
