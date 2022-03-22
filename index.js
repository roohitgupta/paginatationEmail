const express = require("express");

const user = require("./controllers/user.controoler")

const app = express();

app.use(express.json());

app.use("/registration", user);

module.exports = app;