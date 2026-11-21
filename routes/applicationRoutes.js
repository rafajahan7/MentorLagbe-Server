
import express from "express";

import {
  createApplication,
  getTutorApplications,
  getStudentApplications,
  acceptApplication,
  rejectApplication,
  cancelApplication,
} from "../controllers/applicationController.js";

import verifyToken from "../middleware/verifyToken.js";
import verifyUser from "../middleware/verifyUser.js";
import verifyStudent from "../middleware/verifyStudent.js";
import verifyTutor from "../middleware/verifyTutor.js";

const router = express.Router();

// Student applies for a tuition
router.post(
  "/:tuitionId",
  verifyToken,
  verifyUser,
  verifyStudent,
  createApplication
);

// Tutor views their applications
router.get(
  "/tutor",
  verifyToken,
  verifyUser,
  verifyTutor,
  getTutorApplications
);

// Student views their own applications
router.get(
  "/student",
  verifyToken,
  verifyUser,
  verifyStudent,
  getStudentApplications
);

// Student cancels their own pending application
router.delete(
  "/:id",
  verifyToken,
  verifyUser,
  verifyStudent,
  cancelApplication
);

// Tutor accepts an application
router.patch(
  "/:id/accept",
  verifyToken,
  verifyUser,
  verifyTutor,
  acceptApplication
);

// Tutor rejects an application
router.patch(
  "/:id/reject",
  verifyToken,
  verifyUser,
  verifyTutor,
  rejectApplication
);

export default router;
