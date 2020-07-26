require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3000;
const { contactRouter } = require("./contact/contact.router");

const createServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
    });

    console.log("Database connection successful");

    app.use(cors());

    app.use(express.json());

    app.use(morgan("tiny"));

    app.use("/contacts", contactRouter);

    app.listen(process.env.PORT || 3000, () =>
      console.log("Server listening on port: " + process.env.PORT)
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createServer();
