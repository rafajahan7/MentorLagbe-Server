
import express from "express";

import {
  getApprovedTuitions,
  createTuition,
  approveTuition,
  rejectTuition,
} from "../controllers/tuitionController.js";

import verifyToken from "../middleware/verifyToken.js";
import verifyUser from "../middleware/verifyUser.js";
import verifyRole from "../middleware/verifyRole.js";

const router = express.Router();

// Public: Browse approved tuitions
router.get("/", getApprovedTuitions);

// Protected: Tutor creates tuition
router.post(
  "/",
  verifyToken,
  verifyUser,
  verifyRole("tutor"),
  createTuition
);

// Protected: Admin approves tuition
router.patch(
  "/:id/approve",
  verifyToken,
  verifyUser,
  verifyRole("admin"),
  approveTuition
);

// Protected: Admin rejects tuition
router.patch(
  "/:id/reject",
  verifyToken,
  verifyUser,
  verifyRole("admin"),
  rejectTuition
);

export default router;
