const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppSchema = new Schema({
  appName: {
    type: String,
    required: true
  },
  appType: {
    type: String,
    default: "app"
  },
  feedback: [
    {
      feedbackId: {
        type: String
      },
      ratingType: {
        type: String
      },
      rating: {
        type: Number
      },
      comment: {
        type: String
      },
      contact: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      },
      mobile: {
        type: Boolean
      }
    }
  ]
});

module.exports = App = mongoose.model("app", AppSchema);
