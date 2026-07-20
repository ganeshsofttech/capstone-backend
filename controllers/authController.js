const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { v4: uuid } = require("uuid");

const User = require("../models/User");
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });

    if (existing) {
      return res
        .status(400)
        .json({ success: false, error: "Customer already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: uuid(),
      name,
      email,
      password: hashedPassword,
      role,
    };

    const users1 = User.create(newUser);
    res.status(201).json({
      success: true,
      token: generateToken(users1),
      user: {
        id: users1._id,
        name: users1.name,
        email: users1.email,
        role: users1.role,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);

      return res.status(400).json({
        success: false,
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, error: "Provide email and password" });
    const user = await User.findOne({ email }).select("+password");
    const match = await bcrypt.compare(password, user.password);
    if (!user || !match)
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });

    res.status(200).json({
      success: true,
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
exports.getUser = async (req, res) => {
  const Allusers = await User.find();

  res.json(Allusers);
};
function saveUsersToDB(users) {
  const users1 = User.create(users);

  return users1;
}
const generateToken = (singleuser) =>
  jwt.sign(
    { id: singleuser._id, role: singleuser.role, email: singleuser.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

/**
 * UPDATE USER
 * PUT /api/users/:id
 */
exports.updateUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * DELETE USER
 * DELETE /api/users/:id
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
