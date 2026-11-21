
import { getDB } from "../config/db.js";

const verifyUser = async (req, res, next) => {
  try {
    const email = req.user?.email;

    if (!email) {
      return res.status(401).json({
        success: false,
        message: "User information missing from token.",
      });
    }

    const db = getDB();

    // Find the current user in MongoDB


    // Attach current database user information
    req.dbUser = user;

    next();
  } catch (error) {
    console.error("User verification failed:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to verify user account.",
    });
  }
};

export default verifyUser;
