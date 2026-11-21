
import express from "express";

import {
  createApplication,
  getTutorApplications,
  getStudentApplications,
  acceptApplication,
  rejectApplication,
} from "../controllers/applicationController.js";

import verifyToken from "../middleware/verifyToken.js";
import verifyUser from "../middleware/verifyUser.js";
import verifyRole from "../middleware/verifyRole.js";

const router = express.Router();

// Student applies for a tuition
router.post(
  "/:tuitionId",
  verifyToken,
  verifyUser,
  verifyRole("student"),
  createApplication
);

// Tutor views their applications
router.get(
  "/tutor",
  verifyToken,
  verifyUser,
  verifyRole("tutor"),
  getTutorApplications
);

// Student views their own applications
router.get(
  "/student",
  verifyToken,
  verifyUser,
  verifyRole("student"),
  getStudentApplications
);

// Tutor accepts an application
router.patch(
  "/:id/accept",
  verifyToken,
  verifyUser,
  verifyRole("tutor"),
  acceptApplication
);

// Tutor rejects an application
router.patch(
  "/:id/reject",
  verifyToken,
  verifyUser,
  verifyRole("tutor"),
  rejectApplication
);

export default router;
