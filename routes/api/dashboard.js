const express = require("express");
const router = express.Router();
const setDates = require("../../helper-functions/dates");
const mongoose = require("mongoose");

// App model
const App = require("../../models/App");

// @route   GET api/apps/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Dashboard  Works" }));

// @route   GET api/dashboard/apps
// @desc    Get all apps in the database
// @access  Public
router.get("/apps", (req, res) => {
  App.find()
    //.sort({ date: -1 })
    .then(apps => res.json(apps))
    .catch(err => res.status(404).json({ noappsfound: "No apps found." }));
});

// @route   GET api/dashboard/app/:id
// @desc    Get an app by its id
// @access  Public
router.get("/app/:id", (req, res) => {
  App.findById(req.params.id)
    .then(app => {
      if (!app) {
        res.status(404).json({ app: "No app found" });
      }
      res.json(app);
    })
    .catch(err => res.status(404).json({ app: "No app found with that id." }));
});

// @route   GET api/dashboard/app/:name
// @desc    Get an app by its name
// @access  Public
router.get("/app/name/:name", (req, res) => {
  App.findOne({ appName: req.params.name })
    .then(app => {
      if (!app) {
        res.status(404).json({ noappfound: "No app found" });
      }

      res.json(app);
    })
    .catch(err =>
      res.status(404).json({ noappfound: "No app found with that id." })
    );
});

// @route   GET api/dashboard/all
// @desc    Get all feedback in the database
// @access  Public
router.get("/all", (req, res) => {
  Feedback.find()
    .sort({ date: -1 })
    .then(feedbacks => res.json(feedbacks))
    .catch(err =>
      res.status(404).json({ nofeedbacksfound: "No feedback found." })
    );
});

// @route   GET api/dashboard/app/:id/feedback
// @desc    Get all in the feedback array of a given app.
// @access  Public
router.get("/app/:id/feedback", (req, res) => {
  App.findById(req.params.id)
    .then(app => {
      if (!app) {
        return res
          .status(400)
          .json({ notratedyet: "This app has not been rated yet." });
      }
      res.json(app.feedback);
    })
    .catch(err =>
      res.status(400).json({ notratedyet: "This app has not been rated yet." })
    );
});

// @route   GET api/dashboard/app/:id/:ratingtype/:value/:timeframe
// @desc    Filters and counts the feedback in the feedback array of a given app
//          :id refers to the id of the app
//          :ratingtype filters by thumbs/sparks/sliders or all
//          :value filters by positive/negative/neutral or all
//          :device filters by mobile or desktop rating, or both
//          :timeframe filters by two-weeks/this-quarter/this-year or custom
//          :custom must provide params: startyear (required), startmonth,
//          startdate, endyear (current by default), endmonth (current by default)
//          enddate (current by default)

//          Returns COUNT of ratings that meet the criteria.
// @access  Public
router.get("/app/:id/:ratingtype/:value/:device/:timeframe", (req, res) => {
  if (req.params.id === "all") {
  } else {
    App.findById(req.params.id)
      .then(app => {
        if (!app) {
          return res
            .status(400)
            .json({ notratedyet: "This app has not been rated yet." });
        }

        //Get the start and end dates for the timeframe
        const { start, current } = setDates(req);

        let count = 0;
        app.feedback.map(rating => {
          //loop through feedbacks in feedback array

          //first check that it is the rating type you are looking for
          if (
            rating.ratingType === req.params.ratingtype ||
            req.params.ratingtype === "all"
          ) {
            //if looking for all and it is in time frame
            if (
              req.params.value === "all" &&
              rating.date <= current &&
              rating.date >= start
            ) {
              if (
                //check that the device type matches
                (req.params.device === "mobile" && rating.mobile) ||
                (req.params.device === "desktop" && !rating.mobile) ||
                req.params.device === "both"
              ) {
                //if all criteria are met, count it
                count++;
              }
            }
            //if looking for only positive feedback, filter out the positive
            else if (req.params.value === "positive") {
              if (
                //thumb ratings are positive if === 1
                (req.params.ratingtype === "thumbs" && rating.rating === 1) ||
                (req.params.ratingtype === "all" &&
                  rating.ratingType === "thumbs" &&
                  rating.rating === 1)
              ) {
                if (rating.date <= current && rating.date >= start) {
                  if (
                    (req.params.device === "mobile" && rating.mobile) ||
                    (req.params.device === "desktop" && !rating.mobile) ||
                    req.params.device === "both"
                  ) {
                    count++;
                  }
                }
              } else if (
                //spark and slider ratings (ratings of 4 & 5 are considered positive)
                (req.params.ratingtype === "sparks" && rating.rating > 3) ||
                (req.params.ratingtype === "slider" && rating.rating > 3) ||
                (req.params.ratingtype === "all" && rating.rating > 3)
              ) {
                if (rating.date <= current && rating.date >= start) {
                  if (
                    (req.params.device === "mobile" && rating.mobile) ||
                    (req.params.device === "desktop" && !rating.mobile) ||
                    req.params.device === "both"
                  ) {
                    count++;
                  }
                }
              }
              //if looking for negative reviews
            } else if (req.params.value === "negative") {
              if (
                // thumbs are negative if === 0
                (req.params.ratingtype === "thumbs" && rating.rating === 0) ||
                (req.params.ratingtype === "all" && rating.rating === 0)
              ) {
                if (rating.date <= current && rating.date >= start) {
                  if (
                    (req.params.device === "mobile" && rating.mobile) ||
                    (req.params.device === "desktop" && !rating.mobile) ||
                    req.params.device === "both"
                  ) {
                    count++;
                  }
                }
              } else if (
                //sparks and sliders (1 and 2 are negative ratings)
                (req.params.ratingtype === "sparks" && rating.rating < 3) ||
                (req.params.ratingtype === "slider" && rating.rating < 3) ||
                (req.params.ratingtype === "all" && rating.rating < 3)
              ) {
                if (rating.date <= current && rating.date >= start) {
                  if (
                    (req.params.device === "mobile" && rating.mobile) ||
                    (req.params.device === "desktop" && !rating.mobile) ||
                    req.params.device === "both"
                  ) {
                    count++;
                  }
                }
              }
              // if looking for neutral feedback (sparks and sliders only, rating of 3)
            } else if (req.params.value === "neutral") {
              if (rating.rating === 3) {
                if (rating.date <= current && rating.date >= start) {
                  if (
                    (req.params.device === "mobile" && rating.mobile) ||
                    (req.params.device === "desktop" && !rating.mobile) ||
                    req.params.device === "both"
                  ) {
                    count++;
                  }
                }
              }
            } else if (rating.rating == req.params.value) {
              if (rating.date <= current && rating.date >= start) {
                if (
                  (req.params.device === "mobile" && rating.mobile) ||
                  (req.params.device === "desktop" && !rating.mobile) ||
                  req.params.device === "both"
                ) {
                  count++;
                }
              }
            }
          }
        });

        //return the count of feedbacks that match the criteria
        res.json(count);
      })
      .catch(err =>
        res
          .status(400)
          .json({ notratedyet: "This app has not been rated yet." })
      );
  }
});

// @route   GET api/dashboard/app/:id/:ratingtype/:value/:timeframe/percentage
// @desc    Filters and counts the feedback in the feedback array of a given app
//          :id refers to the id of the app
//          :ratingtype filters by thumbs/sparks/sliders or all
//          :value filters by positive/negative/neutral or all
//          :device filters by mobile or desktop rating, or both
//          :timeframe filters by two-weeks/this-quarter/this-year or custom
//          :custom must provide params: startyear (required), startmonth,
//          startdate, endyear (current by default), endmonth (current by default)
//          enddate (current by default)

//          Returns PERCENTAGE of ratings TYPES that meet the criteria
//          (for example percentage of spark ratings that are positive)
// @access  Public
router.get(
  "/app/:id/:ratingtype/:value/:device/:timeframe/percentage",
  (req, res) => {
    App.findById(req.params.id)
      .then(app => {
        if (!app) {
          return res
            .status(400)
            .json({ notratedyet: "This app has not been rated yet." });
        }

        const { start, current } = setDates(req);

        let count = 0;
        let total = 0;
        app.feedback.map(rating => {
          if (rating.date <= current && rating.date >= start) {
            if (
              rating.ratingType === req.params.ratingtype ||
              req.params.ratingtype === "all"
            ) {
              total++;
              if (
                req.params.value === "all" &&
                rating.date <= current &&
                rating.date >= start
              ) {
                if (
                  (req.params.device === "mobile" && rating.mobile) ||
                  (req.params.device === "desktop" && !rating.mobile) ||
                  req.params.device === "both"
                ) {
                  count++;
                }
              } else if (req.params.value === "positive") {
                if (
                  (req.params.ratingtype === "thumbs" && rating.rating === 1) ||
                  (req.params.ratingtype === "all" &&
                    rating.ratingType === "thumbs" &&
                    rating.rating === 1)
                ) {
                  if (rating.date <= current && rating.date >= start) {
                    if (
                      (req.params.device === "mobile" && rating.mobile) ||
                      (req.params.device === "desktop" && !rating.mobile) ||
                      req.params.device === "both"
                    ) {
                      count++;
                    }
                  }
                } else if (
                  (req.params.ratingtype === "sparks" && rating.rating > 3) ||
                  (req.params.ratingtype === "slider" && rating.rating > 3) ||
                  (req.params.ratingtype === "all" && rating.rating > 3)
                ) {
                  if (rating.date <= current && rating.date >= start) {
                    if (
                      (req.params.device === "mobile" && rating.mobile) ||
                      (req.params.device === "desktop" && !rating.mobile) ||
                      req.params.device === "both"
                    ) {
                      count++;
                    }
                  }
                }
              } else if (req.params.value === "negative") {
                if (
                  (req.params.ratingtype === "thumbs" && rating.rating === 0) ||
                  (req.params.ratingtype === "all" && rating.rating === 0)
                ) {
                  if (rating.date <= current && rating.date >= start) {
                    if (
                      (req.params.device === "mobile" && rating.mobile) ||
                      (req.params.device === "desktop" && !rating.mobile) ||
                      req.params.device === "both"
                    ) {
                      count++;
                    }
                  }
                } else if (
                  (req.params.ratingtype === "sparks" && rating.rating < 3) ||
                  (req.params.ratingtype === "slider" && rating.rating < 3) ||
                  (req.params.ratingtype === "all" && rating.rating < 3)
                ) {
                  if (rating.date <= current && rating.date >= start) {
                    if (
                      (req.params.device === "mobile" && rating.mobile) ||
                      (req.params.device === "desktop" && !rating.mobile) ||
                      req.params.device === "both"
                    ) {
                      count++;
                    }
                  }
                }
              } else if (req.params.value === "neutral") {
                if (rating.rating === 3) {
                  if (rating.date <= current && rating.date >= start) {
                    if (
                      (req.params.device === "mobile" && rating.mobile) ||
                      (req.params.device === "desktop" && !rating.mobile) ||
                      req.params.device === "both"
                    ) {
                      count++;
                    }
                  }
                }
              } else if (rating.rating.toString() === req.params.value) {
                if (rating.date <= current && rating.date >= start) {
                  if (
                    (req.params.device === "mobile" && rating.mobile) ||
                    (req.params.device === "desktop" && !rating.mobile) ||
                    req.params.device === "both"
                  ) {
                    count++;
                  }
                }
              }
            }
          }
        });

        let percentage = 0;

        if (total > 0) {
          percentage = count / total;
        }
        res.json(percentage * 100);
      })
      .catch(err =>
        res
          .status(400)
          .json({ notratedyet: "This app has not been rated yet." })
      );
  }
);

// @route   GET api/dashboard/app/:id/:ratingtype/:value/:timeframe/comments/percentage
// @desc    Counts the feedback in the feedback array of a given app that has a comment
//          :id refers to the id of the app
//          :ratingtype filters by thumbs/sparks/sliders or all
//          :value filters by positive/negative/neutral or all
//          :device filters by mobile or desktop rating, or both
//          :timeframe filters by two-weeks/this-quarter/this-year or custom
//          :custom must provide params: startyear (required), startmonth,
//          startdate, endyear (current by default), endmonth (current by default)
//          enddate (current by default)

//          Returns PERCENTAGE of ratings TYPES that have comments
//          (for example the percentage of neutral spark ratings that have comments)
// @access  Public
router.get(
  "/app/:id/:ratingtype/:value/:device/:timeframe/comments/percentage",
  (req, res) => {
    App.findById(req.params.id)
      .then(app => {
        if (!app) {
          return res
            .status(400)
            .json({ notratedyet: "This app has not been rated yet." });
        }

        const { start, current } = setDates(req);

        let count = 0;
        let total = 0;
        app.feedback.map(rating => {
          if (
            rating.ratingType === req.params.ratingtype ||
            req.params.ratingtype === "all"
          ) {
            if (req.params.value === "all") {
              if (rating.date <= current && rating.date >= start) {
                total++;
              }
              if (
                rating.date <= current &&
                rating.date >= start &&
                rating.comment
              ) {
                if (
                  (req.params.device === "mobile" && rating.mobile) ||
                  (req.params.device === "desktop" && !rating.mobile) ||
                  req.params.device === "both"
                ) {
                  count++;
                }
              }
            } else if (req.params.value === "positive") {
              if (
                (req.params.ratingtype === "thumbs" && rating.rating === 1) ||
                (req.params.ratingtype === "all" &&
                  rating.ratingType === "thumbs" &&
                  rating.rating === 1)
              ) {
                total++;
                if (
                  rating.date <= current &&
                  rating.date >= start &&
                  rating.comment
                ) {
                  if (
                    (req.params.device === "mobile" && rating.mobile) ||
                    (req.params.device === "desktop" && !rating.mobile) ||
                    req.params.device === "both"
                  ) {
                    count++;
                  }
                }
              } else if (
                (req.params.ratingtype === "sparks" && rating.rating > 3) ||
                (req.params.ratingtype === "slider" && rating.rating > 3) ||
                (req.params.ratingtype === "all" && rating.rating > 3)
              ) {
                total++;
                if (
                  rating.date <= current &&
                  rating.date >= start &&
                  rating.comment
                ) {
                  if (
                    (req.params.device === "mobile" && rating.mobile) ||
                    (req.params.device === "desktop" && !rating.mobile) ||
                    req.params.device === "both"
                  ) {
                    count++;
                  }
                }
              }
            } else if (req.params.value === "negative") {
              if (
                (req.params.ratingtype === "thumbs" && rating.rating === 0) ||
                (req.params.ratingtype === "all" && rating.rating === 0)
              ) {
                total++;
                if (
                  rating.date <= current &&
                  rating.date >= start &&
                  rating.comment
                ) {
                  if (
                    (req.params.device === "mobile" && rating.mobile) ||
                    (req.params.device === "desktop" && !rating.mobile) ||
                    req.params.device === "both"
                  ) {
                    count++;
                  }
                }
              } else if (
                (req.params.ratingtype === "sparks" && rating.rating < 3) ||
                (req.params.ratingtype === "slider" && rating.rating < 3) ||
                (req.params.ratingtype === "all" && rating.rating < 3)
              ) {
                total++;
                if (
                  rating.date <= current &&
                  rating.date >= start &&
                  rating.comment
                ) {
                  if (
                    (req.params.device === "mobile" && rating.mobile) ||
                    (req.params.device === "desktop" && !rating.mobile) ||
                    req.params.device === "both"
                  ) {
                    count++;
                  }
                }
              }
            } else if (req.params.value === "neutral") {
              if (rating.rating === 3) {
                total++;
                if (
                  rating.date <= current &&
                  rating.date >= start &&
                  rating.comment
                ) {
                  if (
                    (req.params.device === "mobile" && rating.mobile) ||
                    (req.params.device === "desktop" && !rating.mobile) ||
                    req.params.device === "both"
                  ) {
                    count++;
                  }
                }
              }
            } else if (rating.rating.toString() === req.params.value) {
              total++;
              if (
                rating.date <= current &&
                rating.date >= start &&
                rating.comment
              ) {
                if (
                  (req.params.device === "mobile" && rating.mobile) ||
                  (req.params.device === "desktop" && !rating.mobile) ||
                  req.params.device === "both"
                ) {
                  count++;
                }
              }
            }
          }
        });

        let percentage = 0;
        if (total > 0) {
          percentage = count / total;
        }

        percentage = percentage * 100;
        percentage = percentage.toFixed(0);
        res.json(percentage);
      })
      .catch(err =>
        res
          .status(400)
          .json({ notratedyet: "This app has not been rated yet." })
      );
  }
);

// @route   GET api/dashboard/app/:id/:ratingtype/:value/:timeframe/comments
// @desc    Collects the comments from feedback in the feedback array
//          :id refers to the id of the app
//          :ratingtype filters by thumbs/sparks/sliders or all
//          :value filters by positive/negative/neutral or all
//          :device filters by mobile or desktop rating, or both
//          :timeframe filters by two-weeks/this-quarter/this-year or custom
//          :custom must provide params: startyear (required), startmonth,
//          startdate, endyear (current by default), endmonth (current by default)
//          enddate (current by default)

//          Returns an array of comment text from feedback that meets the criteria
// @access  Public
router.get(
  "/app/:id/:ratingtype/:value/:device/:timeframe/comments",
  (req, res) => {
    App.findById(req.params.id)
      .then(app => {
        if (!app) {
          return res
            .status(400)
            .json({ notratedyet: "This app has not been rated yet." });
        }

        const { start, current } = setDates(req);

        comments = [];
        app.feedback.map(rating => {
          if (
            rating.ratingType === req.params.ratingtype ||
            req.params.ratingtype === "all"
          ) {
            if (req.params.value === "all") {
              if (
                rating.date <= current &&
                rating.date >= start &&
                rating.comment
              ) {
                if (
                  (req.params.device === "mobile" && rating.mobile) ||
                  (req.params.device === "desktop" && !rating.mobile) ||
                  req.params.device === "both"
                ) {
                  comments.push({
                    comment: rating.comment,
                    date: rating.date,
                    ratingType: rating.ratingType,
                    rating: rating.rating,
                    contact: rating.contact
                  });
                }
              }
            } else if (req.params.value === "positive") {
              if (
                (req.params.ratingtype === "thumbs" && rating.rating === 1) ||
                (req.params.ratingtype === "all" &&
                  rating.ratingType === "thumbs" &&
                  rating.rating === 1)
              ) {
                if (
                  rating.date <= current &&
                  rating.date >= start &&
                  rating.comment
                ) {
                  if (
                    (req.params.device === "mobile" && rating.mobile) ||
                    (req.params.device === "desktop" && !rating.mobile) ||
                    req.params.device === "both"
                  ) {
                    comments.push({
                      comment: rating.comment,
                      date: rating.date,
                      ratingType: rating.ratingType,
                      rating: rating.rating,
                      contact: rating.contact
                    });
                  }
                }
              } else if (
                (req.params.ratingtype === "sparks" && rating.rating > 3) ||
                (req.params.ratingtype === "slider" && rating.rating > 3) ||
                (req.params.ratingtype === "all" && rating.rating > 3)
              ) {
                if (
                  rating.date <= current &&
                  rating.date >= start &&
                  rating.comment
                ) {
                  if (
                    (req.params.device === "mobile" && rating.mobile) ||
                    (req.params.device === "desktop" && !rating.mobile) ||
                    req.params.device === "both"
                  ) {
                    comments.push({
                      comment: rating.comment,
                      date: rating.date,
                      ratingType: rating.ratingType,
                      rating: rating.rating,
                      contact: rating.contact
                    });
                  }
                }
              }
            } else if (req.params.value === "negative") {
              if (
                (req.params.ratingtype === "thumbs" && rating.rating === 0) ||
                (req.params.ratingtype === "all" && rating.rating === 0)
              ) {
                if (
                  rating.date <= current &&
                  rating.date >= start &&
                  rating.comment
                ) {
                  if (
                    (req.params.device === "mobile" && rating.mobile) ||
                    (req.params.device === "desktop" && !rating.mobile) ||
                    req.params.device === "both"
                  ) {
                    comments.push({
                      comment: rating.comment,
                      date: rating.date,
                      ratingType: rating.ratingType,
                      rating: rating.rating,
                      contact: rating.contact
                    });
                  }
                }
              } else if (
                (req.params.ratingtype === "sparks" && rating.rating < 3) ||
                (req.params.ratingtype === "slider" && rating.rating < 3) ||
                (req.params.ratingtype === "all" && rating.rating < 3)
              ) {
                if (
                  rating.date <= current &&
                  rating.date >= start &&
                  rating.comment
                ) {
                  if (
                    (req.params.device === "mobile" && rating.mobile) ||
                    (req.params.device === "desktop" && !rating.mobile) ||
                    req.params.device === "both"
                  ) {
                    comments.push({
                      comment: rating.comment,
                      date: rating.date,
                      ratingType: rating.ratingType,
                      rating: rating.rating,
                      contact: rating.contact
                    });
                  }
                }
              }
            } else if (req.params.value === "neutral") {
              if (rating.rating === 3) {
                if (
                  rating.date <= current &&
                  rating.date >= start &&
                  rating.comment
                ) {
                  if (
                    (req.params.device === "mobile" && rating.mobile) ||
                    (req.params.device === "desktop" && !rating.mobile) ||
                    req.params.device === "both"
                  ) {
                    comments.push({
                      comment: rating.comment,
                      date: rating.date,
                      ratingType: rating.ratingType,
                      rating: rating.rating,
                      contact: rating.contact
                    });
                  }
                }
              }
            } else if (rating.rating.toString() === req.params.value) {
              if (
                rating.date <= current &&
                rating.date >= start &&
                rating.comment
              ) {
                if (
                  (req.params.device === "mobile" && rating.mobile) ||
                  (req.params.device === "desktop" && !rating.mobile) ||
                  req.params.device === "both"
                ) {
                  comments.push({
                    comment: rating.comment,
                    date: rating.date,
                    ratingType: rating.ratingType,
                    rating: rating.rating,
                    contact: rating.contact
                  });
                }
              }
            }
          }
        });

        res.json(comments);
      })
      .catch(err =>
        res
          .status(400)
          .json({ notratedyet: "This app has not been rated yet." })
      );
  }
);

// @route   GET api/dashboard/app/:id/:ratingtype/:value/:timeframe/percentage
// @desc    Gets percentage of feedback the meets the requirements for each specific date provided in :dates
//          :id refers to the id of the app
//          :ratingtype filters by thumbs/sparks/sliders or all
//          :value filters by positive/negative/neutral or all
//          :device filters by mobile or desktop rating, or both
//          :dates is a list of dates

//          Returns object with dates as keys and PERCENTAGE of reviews that meet criteria on that date.
// @access  Public
router.get("/app/:id/:ratingtype/:value/:device/chart/:dates", (req, res) => {
  App.findById(req.params.id)
    .then(app => {
      if (!app) {
        return res
          .status(400)
          .json({ notratedyet: "This app has not been rated yet." });
      }

      let stats = {}; //object to return
      let dates = req.params.dates; //list of dates
      dates = dates.split(","); //turn it into an array

      for (var i in dates) {
        let count = 0;
        let total = 0;
        app.feedback.map(rating => {
          day = dates[i].split(" "); //turn date string into array
          feedbackDate = String(rating.date);
          feedbackDate = feedbackDate.split(" "); //turn feedback's date into string array
          if (
            //compare day,month and year to see if they match
            feedbackDate[1] == day[1] &&
            feedbackDate[2] == day[2] &&
            feedbackDate[3] == day[3]
          ) {
            total = total + 1; //increase total for that day
            //check if rating meets requirements and increase count if so
            if (
              rating.ratingType === req.params.ratingtype ||
              req.params.ratingtype === "all"
            ) {
              if (req.params.value === "all") {
                if (
                  (req.params.device === "mobile" && rating.mobile) ||
                  (req.params.device === "desktop" && !rating.mobile) ||
                  req.params.device === "both"
                ) {
                  count++;
                }
              } else if (req.params.value === "positive") {
                if (
                  (req.params.ratingtype === "thumbs" && rating.rating === 1) ||
                  (req.params.ratingtype === "all" &&
                    rating.ratingType === "thumbs" &&
                    rating.rating === 1)
                ) {
                  if (
                    (req.params.device === "mobile" && rating.mobile) ||
                    (req.params.device === "desktop" && !rating.mobile) ||
                    req.params.device === "both"
                  ) {
                    count++;
                  }
                } else if (
                  (req.params.ratingtype === "sparks" && rating.rating > 3) ||
                  (req.params.ratingtype === "slider" && rating.rating > 3) ||
                  (req.params.ratingtype === "all" && rating.rating > 3)
                ) {
                  if (
                    (req.params.device === "mobile" && rating.mobile) ||
                    (req.params.device === "desktop" && !rating.mobile) ||
                    req.params.device === "both"
                  ) {
                    count++;
                  }
                }
              } else if (req.params.value === "negative") {
                if (
                  (req.params.ratingtype === "thumbs" && rating.rating === 0) ||
                  (req.params.ratingtype === "all" && rating.rating === 0)
                ) {
                  if (
                    (req.params.device === "mobile" && rating.mobile) ||
                    (req.params.device === "desktop" && !rating.mobile) ||
                    req.params.device === "both"
                  ) {
                    count++;
                  }
                } else if (
                  (req.params.ratingtype === "sparks" && rating.rating < 3) ||
                  (req.params.ratingtype === "slider" && rating.rating < 3) ||
                  (req.params.ratingtype === "all" && rating.rating < 3)
                ) {
                  if (
                    (req.params.device === "mobile" && rating.mobile) ||
                    (req.params.device === "desktop" && !rating.mobile) ||
                    req.params.device === "both"
                  ) {
                    count++;
                  }
                }
              } else if (req.params.value === "neutral") {
                if (rating.rating === 3) {
                  if (
                    (req.params.device === "mobile" && rating.mobile) ||
                    (req.params.device === "desktop" && !rating.mobile) ||
                    req.params.device === "both"
                  ) {
                    count++;
                  }
                }
              } else if (rating.rating.toString() === req.params.value) {
                if (
                  (req.params.device === "mobile" && rating.mobile) ||
                  (req.params.device === "desktop" && !rating.mobile) ||
                  req.params.device === "both"
                ) {
                  count++;
                }
              }
            }
          }
        });

        //calculate percentage count/total
        let percentage = 0;
        if (total > 0) {
          percentage = count / total;
        }
        percentage = percentage * 100;

        //format date into string for displaying (and key value)
        const curDay =
          String(day[1]) + " " + String(day[2]) + " " + String(day[3]);
        stats[curDay] = percentage; //update object with key value pair
      }

      res.json(stats);
    })
    .catch(err =>
      res.status(400).json({ notratedyet: "This app has not been rated yet." })
    );
});

module.exports = router;
