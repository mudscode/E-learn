// Auth middleware

const jwt = require("jsonwebtoken");
const Instructor = require("../models/Instructor");
const Learner = require("../models/Learner");

function generateToken(user) {
  return jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: "5d" });
}

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (error, decodedUser) => {
      if (error) {
        return res.status(403).json({ message: "Tokenn not valid" });
      }
      req.user.id = decodedUser;
      next();
    });
  } else {
    return res
      .status(400)
      .json({ message: "Unathorised - Token not provided." });
  }
}

async function instructorAuth(req, res, next) {
  try {
    const instructor = await Instructor.findOne({
      _id: req.user.id,
      isAnInstructor: true,
    });

    if (!instructor || instructor._id !== req.params.instructorId) {
      return res.status(403).json({ message: "Forbidden - Access denied." });
    }

    req.user = instructor;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function learnerAuth(req, res, next) {
  try {
    const learner = await Learner.findOne({
      _id: req.user.id,
      isALearner: true,
    });

    if (!learner || learner._id !== req.params.learnerId) {
      return res.status(403).json({ message: "Forbidden - Access denied." });
    }

    req.user = learner;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { generateToken, verifyToken, instructorAuth, learnerAuth };
