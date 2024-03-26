const express = require("express");
require("dotenv").config();
const cors = require("cors");
const colors = require("colors");

const port = process.env.PORT || 5000;

const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

connectDB();

const app = express();

const corsOpts = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  // exposedHeaders: ['Content-Type']
};
app.use(cors(corsOpts));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
