import jwt from "jsonwebtoken";

export const authenticateUserOrAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

    // Allow access to both admins and users
    if (decoded.role !== "admin" && decoded.role !== "user") {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    // Attach user info to the request object
    req.user = decoded;
    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error("Error in authenticateUserOrAdmin middleware:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Token has expired" });
    }

    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
