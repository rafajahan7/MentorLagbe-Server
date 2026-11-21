
const verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.dbUser?.role;

    if (!userRole) {
      return res.status(403).json({
        success: false,
        message: "User role not found.",
      });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this resource.",
      });
    }

    next();
  };
};

export default verifyRole;
