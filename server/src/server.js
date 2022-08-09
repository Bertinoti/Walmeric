const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
const app = express();

app.use(express.json());
app.use(cors());

app.use(morgan("dev"));

routes(app);

module.exports = app;
