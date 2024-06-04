import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader === null || authHeader === undefined) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  // verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = payload;
    next();
  });
};

export default authMiddleware;
