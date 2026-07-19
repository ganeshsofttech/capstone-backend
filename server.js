const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const menuRoutes = require("./routes/menuRoutes");

const orderRoutes = require("./routes/orderRoutes");

const reservationRoutes = require("./routes/reservationRoutes");

const feedbackRoutes = require("./routes/feedbackRoutes");

const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.use("/api/menu", menuRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/reservations", reservationRoutes);

app.use("/api/feedback", feedbackRoutes);
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send("Restaurant API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
