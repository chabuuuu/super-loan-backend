const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Route
app.use("/api/v1/loan-service", proxy("http://localhost:5000"));
app.use("/api/v1/payment-service", proxy("http://localhost:5001"));
app.use("/api/v1/report-service", proxy("http://localhost:5002"));
app.use("/api/v1/chat-service", proxy("http://localhost:5003"));
app.use("/api/v1/media-service", proxy("http://localhost:5004"));

app.listen(9005, () => {
  console.log("Gateway is running on port 9005");
});
