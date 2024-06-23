const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const home = require("./Routes/Home");
const Candidates = require("./Routes/candidates");
const elections = require("./Routes/Elections");
const electionType = require("./Routes/electionTypes");
const signup = require("./Routes/signup");
const directory = require("./Routes/directory");
const voterList = require("./Routes/voterList");
const announcement = require("./Routes/announcements");
const specialElection = require("./Routes/specialElection");
const specialElectionType = require("./Routes/specialElectionType");
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
app.use("/api/elections", elections);
app.use("/api/electiontypes", electionType);
app.use("/api/signup", signup);
app.use("/api/voterlist", voterList);
app.use("/api/directory", directory);
app.use("/api/announcement", announcement);
app.use("/api/specialelection", specialElection);
app.use("/api/specialelectiontype", specialElectionType)

const link =
  "mongodb+srv://alpersonat:alper12389@bitirmeprojesi.i9vz8sb.mongodb.net/?retryWrites=true&w=majority";
const locallink = "mongodb://localhost:27017/Elections";
mongoose
  .connect(`${link}`)
  .then(() => {
    console.log("mongodb bağlantısı kuruldu");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
