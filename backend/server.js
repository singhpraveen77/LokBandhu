import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Server is up and running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
