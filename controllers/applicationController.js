
import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

// POST: Student applies for a tuition
export const createApplication = async (req, res) => {
  try {
    const db = getDB();

    const { tuitionId } = req.params;
    const {
      studentPhone,
      preferredSchedule,
      studentNote,
    } = req.body;

    if (!ObjectId.isValid(tuitionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid tuition ID.",
      });
    }

    if (
      typeof studentPhone !== "string" ||
      !studentPhone.trim() ||
      typeof preferredSchedule !== "string" ||
      !preferredSchedule.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Phone number and preferred schedule are required.",
      });
    }

    if (
      studentNote !== undefined &&
      typeof studentNote !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid student note.",
      });
    }

    const student = req.dbUser;

    if (!student || student.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can apply for tuitions.",
      });
    }

    const tuition = await db.collection("tuitions").findOne({
      _id: new ObjectId(tuitionId),
      approvalStatus: "approved",
      isActive: true,
    });

    if (!tuition) {
      return res.status(404).json({
        success: false,
        message: "This tuition is unavailable for applications.",
      });
    }

    const existingApplication = await db
      .collection("applications")
      .findOne({
        tuitionId: tuitionId,
        studentEmail: student.email,
      });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this tuition.",
      });
    }

    const newApplication = {
      tuitionId,
      tuitionTitle: tuition.title,
      monthlyFee: tuition.monthlyFee,
      tutorEmail: tuition.tutorEmail,
      studentName: student.name,
      studentEmail: student.email,
      studentPhone: studentPhone.trim(),
      preferredSchedule: preferredSchedule.trim(),
      studentNote: studentNote?.trim() || "",
      status: "pending",
      appliedAt: new Date(),
    };

    const result = await db
      .collection("applications")
      .insertOne(newApplication);

    return res.status(201).json({
      success: true,
      message: "Your application has been submitted successfully.",
      data: {
        ...newApplication,
        _id: result.insertedId.toString(),
      },
    });
  } catch (error) {
    console.error("Create application error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit application.",
    });
  }
};

// GET: Tutor views applications for their own tuitions
export const getTutorApplications = async (req, res) => {
  try {
    const db = getDB();
    const tutor = req.dbUser;

    const applications = await db
      .collection("applications")
      .find({
        tutorEmail: tutor.email,
      })
      .sort({ appliedAt: -1 })
      .toArray();

    const formattedApplications = applications.map(
      (application) => ({
        ...application,
        _id: application._id.toString(),
      })
    );

    return res.status(200).json({
      success: true,
      count: formattedApplications.length,
      data: formattedApplications,
    });
  } catch (error) {
    console.error("Get tutor applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve applications.",
    });
  }
};

// PATCH: Tutor accepts a student application
export const acceptApplication = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const tutor = req.dbUser;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID.",
      });
    }

    const result = await db.collection("applications").updateOne(
      {
        _id: new ObjectId(id),
        tutorEmail: tutor.email,
        status: "pending",
      },
      {
        $set: {
          status: "accepted",
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message:
          "Pending application not found or you do not own it.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application accepted successfully.",
    });
  } catch (error) {
    console.error("Accept application error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to accept application.",
    });
  }
};

// PATCH: Tutor rejects a student application
export const rejectApplication = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const tutor = req.dbUser;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID.",
      });
    }

    const result = await db.collection("applications").updateOne(
      {
        _id: new ObjectId(id),
        tutorEmail: tutor.email,
        status: "pending",
      },
      {
        $set: {
          status: "rejected",
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message:
          "Pending application not found or you do not own it.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application rejected successfully.",
    });
  } catch (error) {
    console.error("Reject application error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reject application.",
    });
  }
};


// GET: Student views their own applications
export const getStudentApplications = async (req, res) => {
  try {
    const db = getDB();
    const student = req.dbUser;

    const applications = await db
      .collection("applications")
      .find({
        studentEmail: student.email,
      })
      .sort({ appliedAt: -1 })
      .toArray();

    const formattedApplications = applications.map(
      (application) => ({
        ...application,
        _id: application._id.toString(),
      })
    );

    return res.status(200).json({
      success: true,
      count: formattedApplications.length,
      data: formattedApplications,
    });
  } catch (error) {
    console.error("Get student applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve your applications.",
    });
  }
};


// DELETE: Student cancels their own pending application
export const cancelApplication = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const student = req.dbUser;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID.",
      });
    }

    const result = await db.collection("applications").deleteOne({
      _id: new ObjectId(id),
      studentEmail: student.email,
      status: "pending",
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message:
          "Pending application not found or you do not own it.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application cancelled successfully.",
    });
  } catch (error) {
    console.error("Cancel application error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to cancel application.",
    });
  }
};

