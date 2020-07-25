require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const { contactRouter } = require("./contact/contact.router");

app.use(cors());

app.use(express.json());

app.use(morgan("tiny"));

app.use("/contacts", contactRouter);

app.listen(process.env.PORT || 3000, () =>
  console.log("Server listening on port: " + process.env.PORT)
);
