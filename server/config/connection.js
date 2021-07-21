const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(
  process.env.DB_URI, /*|| "mongodb://localhost/archse",*/
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;