
import express from "express";

import {
  getAllUsers,
  updateUserRole,
  getAllAdminTuitions,
} from "../controllers/adminController.js";

import verifyToken from "../middleware/verifyToken.js";
import verifyUser from "../middleware/verifyUser.js";
import verifyRole from "../middleware/verifyRole.js";

const router = express.Router();

// All routes require admin authentication
router.use(verifyToken, verifyUser, verifyRole("admin"));

// GET: All users
router.get("/users", getAllUsers);

// PATCH: Update user role
router.patch("/users/:userId/role", updateUserRole);

// GET: All tuitions
router.get("/tuitions", getAllAdminTuitions);

export default router;
