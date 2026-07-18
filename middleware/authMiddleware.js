const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token)
    return res.status(401).json({ success: false, error: "Not authorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: "Not authorized" });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ success: false, error: "Forbidden role access" });
    }
    next();
  };
};
module.exports = { protect, authorize };

// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const authHeader = req.header("Authorization");

//   if (!authHeader) {
//     return res.status(401).json({
//       message: "Access denied",
//     });
//   }

//   const token = authHeader.replace("Bearer ", "");

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = decoded;

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       message: "Invalid token",
//     });
//   }
// };
