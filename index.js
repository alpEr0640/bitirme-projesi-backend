const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const home = require("./Routes/Home");
const Candidates = require("./Routes/candidates");
const Registers = require("./Routes/register");
const elections = require("./Routes/Elections");
const electionType = require("./Routes/electionTypes");
const { required } = require("joi");
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/", home);
app.use("/api/candidate", Candidates);
app.use("/api/register", Registers);
app.use("/api/elections", elections);
app.use("/api/election-types", electionType);
mongoose
  .connect("mongodb://localhost:27017/Elections")
  .then(() => {
    console.log("mongodb bağlantısı kuruldu");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000,() => {
  console.log("listening on port 3000");
});
