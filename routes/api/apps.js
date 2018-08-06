const express = require("express");
const router = express.Router();

const App = require("../../models/App");

//@route GET api/apps/test
//@desc Test the app route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "apps still works" }));

//@route POST api/apps/add
//@desc Add an app to the database
//@access Public
router.post("/add", (req, res) => {
  App.findOne({ appName: req.body.appName }).then(app => {
    if (app) {
      return res.json(app);
    } else {
      const newApp = new App({
        appName: req.body.appName,
        appType: req.body.appType
      });
      newApp
        .save()
        .then(app => res.json(app))
        .catch(err => console.log(err));
    }
  });
});

//@route GET api/apps/:id
//@desc Get an app by its ID
//@access Public
router.get("/:id", (req, res) => {
  const errors = {};

  App.findById(req.params.id)
    .then(app => {
      if (!app) {
        errors.noapp = "There is no app with that id";
        res.status(404).json(errors);
      } else {
        res.json(app);
      }
    })
    .catch(err =>
      res.status(400).json({ app: "There is no app with that id" })
    );
});

//@route GET api/apps/:id/current
//@desc Set the most recent feedback in the array to local storage and update with id
//@access Public
router.post("/:id/current", (req, res) => {
  App.findById(req.params.id)
    .then(app => {
      if (!app) {
        res.status(404).json({ app: "There is no app with that id" });
      } else {
        const fb = app.feedback[0];

        const newFb = {
          feedbackId: fb._id,
          ratingType: fb.ratingType,
          rating: fb.rating,
          mobile: fb.mobile
        };

        app.feedback.splice(0, 1);
        app.feedback.unshift(newFb);
        app.save().then(app => res.json(fb._id));
      }
    })
    .catch(err =>
      res.status(400).json({ app: "There is no app with that id" })
    );
});

//@route GET api/feedback/:id
//@desc Get a rating by its ID
//@access Public
router.get("/:id/feedback", (req, res) => {
  const errors = {};

  App.findById(req.params.id)
    .then(app => {
      if (!app) {
        errors.noapp = "There is no app with that id";
        res.status(404).json(errors);
      } else {
        res.json(app.feedback);
      }
    })
    .catch(err =>
      res.status(400).json({ app: "There is no app with that id" })
    );
});

module.exports = router;
