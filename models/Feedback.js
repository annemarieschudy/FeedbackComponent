const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  app: {
    type: Schema.Types.ObjectId,
    ref: "app"
  },
  text: {
    type: String
  },
  ratingType: {
    type: String,
    default: "thumbs"
  },
  rating: {
    type: Number
  },
  time: {
    type: Date,
    default: Date.now
  },
  comment: {
    type: String
  },
  canContact: {
    type: Boolean,
    default: false
  },
  walmartId: {
    type: String,
    default: null
  },
  mobile: {
    type: Boolean,
    default: false
  }
});

module.exports = Feedback = mongoose.model("feedback", FeedbackSchema);
