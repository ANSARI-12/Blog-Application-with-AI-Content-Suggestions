const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const blogRoutes = require("./routes/blogRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", blogRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
});
