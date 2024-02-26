const mongoose = require("mongoose");
const { config } = require("dotenv");
config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Connected to DB!"))
  .catch((err) => console.log(err));
