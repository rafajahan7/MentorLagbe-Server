
import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";

import verifyToken from "./middleware/verifyToken.js";
import verifyUser from "./middleware/verifyUser.js";
import verifyStudent from "./middleware/verifyStudent.js";
import verifyTutor from "./middleware/verifyTutor.js";
import verifyAdmin from "./middleware/verifyAdmin.js";

import tuitionRoutes from "./routes/tuitionRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://mentor-lagbe-flax.vercel.app",
    ],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("MentorLagbe API is running!");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MentorLagbe backend is healthy!",
  });
});

// Student-only route
app.get(
  "/api/test/student",
  verifyToken,
  verifyUser,
  verifyStudent,
  (req, res) => {
    res.json({
      success: true,
      message: "Student access granted.",
      user: {
        name: req.dbUser.name,
        email: req.dbUser.email,
        role: req.dbUser.role,
      },
    });
  }
);

// Tutor-only route
app.get(
  "/api/test/tutor",
  verifyToken,
  verifyUser,
  verifyTutor,
  (req, res) => {
    res.json({
      success: true,
      message: "Tutor access granted.",
    });
  }
);

// Admin-only route
app.get(
  "/api/test/admin",
  verifyToken,
  verifyUser,
  verifyAdmin,
  (req, res) => {
    res.json({
      success: true,
      message: "Admin access granted.",
    });
  }
);

// API routes
app.use("/api/tuitions", tuitionRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);

// General protected route
app.get("/api/protected", verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "JWT verified! You accessed a protected API.",
    user: req.user,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

await connectDB();

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`MentorLagbe server running on port ${PORT}`);
  });
}

export default app;
