const express = require("express");
const cors = require("cors");

const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ARTeCX backend API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

module.exports = app;