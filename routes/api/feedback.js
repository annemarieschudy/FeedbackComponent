const express = require("express");
const router = express.Router();

//Load feedback model
const App = require("../../models/App");

// @route GET api/feedback/test
//@desc Test the feedback route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "feedback works" }));

//@route POST api/feedback/
//@desc Create a unit of feedback for the provided app name
//@access Public
router.post("/", (req, res) => {
  const feedbackFields = {};

  //find the app that is being rated
  App.findOne({ appName: req.body.app })
    .then(app => {
      if (!app) {
        return res.status(404).json({ noapp: "No app found" });
      } else {
        feedbackFields.app = app._id; //set the feedback's app to the found ID
        if (req.body.rating) feedbackFields.rating = req.body.rating;
        if (req.body.ratingType)
          feedbackFields.ratingType = req.body.ratingType;
        if (req.body.time) feedbackFields.time = req.body.time;
        if (req.body.comment) feedbackFields.comment = req.body.comment;
        if (req.body.canContact)
          feedbackFields.canContact = req.body.canContact;
        if (req.body.walmartId) feedbackFields.walmartId = req.body.walmartId;
        if (req.body.displayDelay)
          feedbackFields.displayDelay = req.body.displayDelay;
        if (req.body.complete) feedbackFields.complete = req.body.complete;
        if (req.body.text) feedbackFields.text = req.body.text;
        if (req.body.mobile) feedbackFields.mobile = req.body.mobile;

        // Create
        new Feedback(feedbackFields).save().then(feedback => {
          res.json(feedback);
        });
      }
    })
    .catch(err => res.status(400).json({ noapp: "No app found" }));
});

//@route POST api/feedback/:id/rate
//@desc Update a feedback object for a rating of an app(:id refers to feedback id)
//@access Public
router.post("/rate", (req, res) => {
  const appId = req.body.app;

  App.findById(appId)
    .then(app => {
      if (app) {
        const newFb = {
          //feedbackId: feedback._id,
          ratingType: req.body.ratingType,
          rating: req.body.value,
          mobile: req.body.mobile
        };
        app.feedback.unshift(newFb);
        app.save().then(app => res.json(app));
      } else {
        return res
          .status(404)
          .json({ feedbackdoesntexist: "No app exists for this id" });
      }
    })
    .catch(err => res.status(400).json({ noapp: "No app exists for this id" }));
});

///@route POST api/feedback/:id/comment
//@desc Update a feedback object for a rating of an app(:id refers to feedback id)
//@access Public
router.post("/:id/comment", (req, res) => {
  //Update the rating field
  App.findById(req.body.app).then(app => {
    app.feedback.map(rating => {
      if (rating.feedbackId == req.body.feedback) {
        index = app.feedback.indexOf(rating);
      }
    });

    const newFb = {
      ratingType: app.feedback[index].ratingType,
      rating: app.feedback[index].rating,
      mobile: app.feedback[index].mobile,
      date: app.feedback[index].date,
      comment: req.body.comment
    };

    app.feedback.splice(index, 1);
    app.feedback.unshift(newFb);

    app.save().then(app => res.json(app));
  });
});

///@route POST api/feedback/:id/comment
//@desc Update a feedback object for a rating of an app(:id refers to feedback id)
//@access Public
router.post("/:id/contact", (req, res) => {
  let contact;
  if (req.body.canContact) {
    contact = req.body.walmartId;
  } else {
    contact = "";
  }

  //Update the rating field
  App.findById(req.body.app).then(app => {
    app.feedback.map(rating => {
      if (rating.feedbackId == req.body.feedback) {
        index = app.feedback.indexOf(rating);
      }
    });

    const newFb = {
      ratingType: app.feedback[index].ratingType,
      rating: app.feedback[index].rating,
      mobile: app.feedback[index].mobile,
      date: app.feedback[index].date,
      comment: app.feedback[index].comment,
      contact: contact
    };

    app.feedback.splice(index, 1);
    app.feedback.unshift(newFb);

    app.save().then(app => res.json(app));
  });
});

module.exports = router;
