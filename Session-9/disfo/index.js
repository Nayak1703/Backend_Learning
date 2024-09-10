require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");

const configurePassport = require("./config/passport");
const userRoutes = require("./routes/user.routes");
const discussionRoutes = require("./routes/discussion.routes");
const authRoutes = require("./routes/auth.routes");

const DB_URI = "mongodb://127.0.0.1:27017";

const app = express();
const PORT = 8082;
// using passport-jwt strategy throughOut the code, which we have made in config.js
passport.use(configurePassport);

mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to DB at", DB_URI))
  .catch((error) => console.log("Failed to connect to DB\n", error));

app.use(express.json());
app.use(
  cors({
    origin: `http://localhost:8081`,
    optionsSuccessStatus: 200, // byDefault: it is sending status-code 204
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/discussion", discussionRoutes);

app.listen(PORT, () => {
  console.log("Server Listening at", PORT);
});
