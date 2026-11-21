
import { createRemoteJWKSet, jwtVerify } from "jose";

const BETTER_AUTH_URL =
  process.env.BETTER_AUTH_URL || "http://localhost:3000";

const JWKS = createRemoteJWKSet(
  new URL(`${BETTER_AUTH_URL}/api/auth/jwks`)
);

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required.",
      });
    }

    const token = authHeader.split(" ")[1];

    const { payload } = await jwtVerify(token, JWKS);

    // Attach verified token information to the request
    req.user = payload;

    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
};

export default verifyToken;
