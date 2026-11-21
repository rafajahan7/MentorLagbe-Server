
import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

// GET: Retrieve approved and active tuitions
export const getApprovedTuitions = async (req, res) => {
  try {
    const db = getDB();

    const { subject, classLevel, mode, location } = req.query;

    const filter = {
      approvalStatus: "approved",
      isActive: true,
    };

    if (subject) {
      filter.subject = {
        $regex: String(subject),
        $options: "i",
      };
    }

    if (classLevel) {
      filter.classLevel = {
        $regex: String(classLevel),
        $options: "i",
      };
    }

    if (mode) {
      filter.mode = String(mode);
    }

    if (location) {
      filter.location = {
        $regex: String(location),
        $options: "i",
      };
    }

    const tuitions = await db
      .collection("tuitions")
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    const formattedTuitions = tuitions.map((tuition) => ({
      ...tuition,
      _id: tuition._id.toString(),
    }));

    return res.status(200).json({
      success: true,
      count: formattedTuitions.length,
      data: formattedTuitions,
    });
  } catch (error) {
    console.error("Get tuitions error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve tuitions.",
    });
  }
};

// POST: Tutor creates a new tuition
export const createTuition = async (req, res) => {
  try {
    const db = getDB();

    const {
      title,
      subject,
      classLevel,
      mode,
      location,
      monthlyFee,
      daysPerWeek,
      bannerImage,
      description,
    } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof subject !== "string" ||
      !subject.trim() ||
      typeof classLevel !== "string" ||
      !classLevel.trim() ||
      !["Online", "Offline"].includes(mode) ||
      typeof location !== "string" ||
      !location.trim() ||
      monthlyFee === undefined ||
      monthlyFee === null ||
      daysPerWeek === undefined ||
      daysPerWeek === null ||
      typeof description !== "string" ||
      !description.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    if (
      bannerImage !== undefined &&
      typeof bannerImage !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid banner image.",
      });
    }

    const fee = Number(monthlyFee);

    if (!Number.isFinite(fee) || fee <= 0) {
      return res.status(400).json({
        success: false,
        message: "Monthly fee must be greater than zero.",
      });
    }

    const days = Number(daysPerWeek);

    if (!Number.isInteger(days) || days < 1 || days > 7) {
      return res.status(400).json({
        success: false,
        message: "Days per week must be between 1 and 7.",
      });
    }

    const tutor = req.dbUser;

    if (!tutor || tutor.role !== "tutor") {
      return res.status(403).json({
        success: false,
        message: "Only tutors can create tuitions.",
      });
    }

    if (tutor.plan !== "pro") {
      const existingPosts = await db
        .collection("tuitions")
        .countDocuments({
          tutorEmail: tutor.email,
        });

      if (existingPosts >= 2) {
        return res.status(403).json({
          success: false,
          message:
            "Free tutors can post a maximum of 2 tuitions. Upgrade to Pro for unlimited posts.",
        });
      }
    }

    const newTuition = {
      title: title.trim(),
      subject: subject.trim(),
      classLevel: classLevel.trim(),
      mode,
      location: location.trim(),
      monthlyFee: fee,
      daysPerWeek: days,
      bannerImage: bannerImage?.trim() || "",
      description: description.trim(),
      tutorName: tutor.name,
      tutorEmail: tutor.email,
      approvalStatus: "pending",
      isActive: true,
      createdAt: new Date(),
    };

    const result = await db
      .collection("tuitions")
      .insertOne(newTuition);

    return res.status(201).json({
      success: true,
      message: "Tuition submitted for admin approval.",
      data: {
        ...newTuition,
        _id: result.insertedId.toString(),
      },
    });
  } catch (error) {
    console.error("Create tuition error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create tuition.",
    });
  }
};

// PATCH: Admin approves a tuition
export const approveTuition = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid tuition ID.",
      });
    }

    const result = await db.collection("tuitions").updateOne(
      {
        _id: new ObjectId(id),
        approvalStatus: "pending",
      },
      {
        $set: {
          approvalStatus: "approved",
          isActive: true,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Pending tuition not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tuition approved successfully.",
    });
  } catch (error) {
    console.error("Approve tuition error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to approve tuition.",
    });
  }
};

// PATCH: Admin rejects a tuition
export const rejectTuition = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid tuition ID.",
      });
    }

    const result = await db.collection("tuitions").updateOne(
      {
        _id: new ObjectId(id),
        approvalStatus: "pending",
      },
      {
        $set: {
          approvalStatus: "rejected",
          isActive: false,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Pending tuition not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tuition rejected successfully.",
    });
  } catch (error) {
    console.error("Reject tuition error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reject tuition.",
    });
  }
};
