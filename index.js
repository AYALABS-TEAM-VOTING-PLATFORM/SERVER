const express = require("express");
const mongoose = require("mongoose");
const app = express();
const voterRoute = require("./routes/VoterRoute");
const AdminRoute = require("./routes/AdminRoute");

const cors = require("cors");

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); // install cors

app.use("/api/voter", voterRoute);
app.use("/api/admin", AdminRoute);

mongoose
  .connect("mongodb+srv://collinstb:jayden38400@cluster0.rw6nzij.mongodb.net/")
  .then(() =>
    app.listen(3001, () => console.log("Server running at port 3001"))
  );
