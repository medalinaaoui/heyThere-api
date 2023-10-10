import jwt from "jsonwebtoken";
import env from "../config/environmentVariables.js";

const verifyAccess = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, env.accessSecret, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(403).json({ message: "Token expired" });
      }
      return res.status(403).json({ message: "Invalid token" });
    }

    if (typeof decoded.userId !== "number") {
      return res.status(403).json({ message: "Invalid username" });
    }

    // If everything is fine, store the decoded user information in the request
    req.userId = decoded.userId;
    next();
  });
};

export default verifyAccess;
