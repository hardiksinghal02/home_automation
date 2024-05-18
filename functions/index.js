const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");
const express = require("express");
const bodyParser = require("body-parser")

const app = express();

const acRouter = require("./src/routes/ac-handler")
app.use(bodyParser.urlencoded({ extended: false }))

app.use(acRouter)

// // Local deployment
// const http = require("http")
// const server = http.createServer(app)
// server.listen(3000)

exports.home_automation_function = functions
    .region("asia-south1")
    .https
    .onRequest(app);
