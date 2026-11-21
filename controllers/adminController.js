
import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

// GET: Retrieve all users
export const getAllUsers = async (req, res) => {
  try {
    const db = getDB();

    const users = await db
      .collection("users")
      .find(
        {},
        {
          projection: {
            name: 1,
            email: 1,
            image: 1,
            role: 1,
            plan: 1,
            createdAt: 1,
          },
        }
      )
      .sort({ createdAt: -1 })
      .toArray();

    const formattedUsers = users.map((user) => ({
      _id: user._id.toString(),
      name: user.name || "Unknown User",
      email: user.email || "",
      image: user.image || "",
      role: user.role || "student",
      plan: user.plan || "free",
      createdAt: user.createdAt || null,
    }));

    return res.status(200).json({
      success: true,
      data: formattedUsers,
    });
  } catch (error) {
    console.error("Get all users error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not retrieve users.",
    });
  }
};

// PATCH: Update a user's role
export const updateUserRole = async (req, res) => {
  try {
    const db = getDB();
    const { userId } = req.params;
    const { newRole } = req.body;
    const admin = req.dbUser;

    const allowedRoles = ["student", "tutor", "admin"];

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID.",
      });
    }

    if (!allowedRoles.includes(newRole)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user role.",
      });
    }

    if (admin._id.toString() === userId) {
      return res.status(403).json({
        success: false,
        message: "You cannot change your own admin role.",
      });
    }

    // Prevent creating additional admins through this endpoint.
    if (newRole === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin roles can only be assigned through a trusted process.",
      });
    }

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          role: newRole,
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User role updated successfully.",
    });
  } catch (error) {
    console.error("Update user role error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not update user role.",
    });
  }
};

// GET: Retrieve all tuitions for admin
export const getAllAdminTuitions = async (req, res) => {
  try {
    const db = getDB();

    const tuitions = await db
      .collection("tuitions")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const formattedTuitions = tuitions.map((tuition) => ({
      _id: tuition._id.toString(),
      title: tuition.title || "",
      subject: tuition.subject || "",
      classLevel: tuition.classLevel || "",
      mode: tuition.mode || "Online",
      location: tuition.location || "",
      monthlyFee: Number(tuition.monthlyFee || 0),
      tutorName: tuition.tutorName || "Unknown Tutor",
      tutorEmail: tuition.tutorEmail || "",
      approvalStatus: tuition.approvalStatus || "pending",
      isActive: tuition.isActive ?? true,
      createdAt: tuition.createdAt || null,
    }));

    return res.status(200).json({
      success: true,
      data: formattedTuitions,
    });
  } catch (error) {
    console.error("Get all admin tuitions error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not retrieve tuitions.",
    });
  }
};
