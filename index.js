// const { PrismaClient } = require("@prisma/client");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
// const FilmsRoute = require("./routes/FilmsRoute");
// const UserRoute = require("./routes/AdminRoute");
const cors = require("cors");

// const prisma = new PrismaClient();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); // install cors

// app.use("/api/user", UserRoute);
// app.use("/api/films", FilmsRoute);

mongoose
  .connect(
    "mongodb+srv://collinstb01:jayden38400@cluster0.mugp04y.mongodb.net/"
  )
  .then(() =>
    app.listen(3001, () => console.log("Server running at port 3001"))
  );
