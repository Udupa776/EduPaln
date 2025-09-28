// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample route returning JSON
app.get("/api/data", (req, res) => {
  res.json({
    message: "Hello from server!",
    users: [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" }
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
