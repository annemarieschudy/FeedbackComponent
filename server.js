const express = require("express");
const mongoose = require("mongoose");
const apps = require("./routes/api/apps");
const feedback = require("./routes/api/feedback");
const dashboard = require("./routes/api/dashboard");
const bodyParser = require("body-parser");

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo DB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello"));

// Use Routes
app.use("/api/apps", apps);
app.use("/api/feedback", feedback);
app.use("/api/dashboard", dashboard);

const port = process.env.PORT || 4700;

app.listen(port, () => console.log(`Server running on port ${port}`));
