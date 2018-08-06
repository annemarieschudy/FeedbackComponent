import React from "react";

const CommentCard = () => {
  return (
    <div className="card">
      <div className="card-body">
        <p className="card-text">This is some text within a card body.</p>
        <div className="comment-info">
          <h6 className="comment-date">06/01/2018 2:32pm</h6>
        </div>
        <i className="material-icons comment-rating">
          star_outline star_outline star_outline{" "}
        </i>
      </div>
    </div>
  );
};

export default CommentCard;
