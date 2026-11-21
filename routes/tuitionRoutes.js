
import express from "express";

import {
  getApprovedTuitions,
  createTuition,
  approveTuition,
  rejectTuition,
  updateMyTuition,
  deleteMyTuition,
  toggleMyTuitionStatus,
} from "../controllers/tuitionController.js";

import verifyToken from "../middleware/verifyToken.js";
import verifyUser from "../middleware/verifyUser.js";
import verifyRole from "../middleware/verifyRole.js";

const router = express.Router();

// Public: Get approved tuitions
router.get("/", getApprovedTuitions);

// Tutor: Create tuition
router.post(
  "/",
  verifyToken,
  verifyUser,
  verifyRole("tutor"),
  createTuition
);

// Tutor: Update own tuition
router.patch(
  "/:id",
  verifyToken,
  verifyUser,
  verifyRole("tutor"),
  updateMyTuition
);

// Tutor: Delete own tuition
router.delete(
  "/:id",
  verifyToken,
  verifyUser,
  verifyRole("tutor"),
  deleteMyTuition
);

// Tutor: Activate or close own tuition
router.patch(
  "/:id/status",
  verifyToken,
  verifyUser,
  verifyRole("tutor"),
  toggleMyTuitionStatus
);

// Admin: Approve tuition
router.patch(
  "/:id/approve",
  verifyToken,
  verifyUser,
  verifyRole("admin"),
  approveTuition
);

// Admin: Reject tuition
router.patch(
  "/:id/reject",
  verifyToken,
  verifyUser,
  verifyRole("admin"),
  rejectTuition
);

export default router;
