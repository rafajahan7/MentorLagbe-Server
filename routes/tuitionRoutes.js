
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
import verifyTutor from "../middleware/verifyTutor.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const router = express.Router();

// Public: Get approved tuitions
router.get("/", getApprovedTuitions);

// Tutor: Create tuition
router.post(
  "/",
  verifyToken,
  verifyUser,
  verifyTutor,
  createTuition
);

// Tutor: Update own tuition
router.patch(
  "/:id",
  verifyToken,
  verifyUser,
  verifyTutor,
  updateMyTuition
);

// Tutor: Delete own tuition
router.delete(
  "/:id",
  verifyToken,
  verifyUser,
  verifyTutor,
  deleteMyTuition
);

// Tutor: Activate or close own tuition
router.patch(
  "/:id/status",
  verifyToken,
  verifyUser,
  verifyTutor,
  toggleMyTuitionStatus
);

// Admin: Approve tuition
router.patch(
  "/:id/approve",
  verifyToken,
  verifyUser,
  verifyAdmin,
  approveTuition
);

// Admin: Reject tuition
router.patch(
  "/:id/reject",
  verifyToken,
  verifyUser,
  verifyAdmin,
  rejectTuition
);

export default router;
