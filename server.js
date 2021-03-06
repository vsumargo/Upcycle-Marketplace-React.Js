require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const routes = require("./routes");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
}
app.use(session({ secret: process.env.SESSION_SECRET || "cat" }));
app.use(passport.initialize());
app.use(passport.session());

// Add routes, both API and view
app.use(routes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3", {
  useNewUrlParser: true,
});

// callSeed().then(() => {

// });

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
