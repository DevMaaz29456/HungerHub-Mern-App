const express = require("express");
const cors = require("cors");
const mongoDB = require("./db");

const app = express(); // ✅ Define app here
const port = 5000;

// Enable CORS for frontend requests
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend requests
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Handle preflight requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Connect to MongoDB
mongoDB();

app.use(express.json());

// Define API routes
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
