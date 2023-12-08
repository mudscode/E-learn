const Learner = require("../models/Learner");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/authMiddleware");

// Learner SignUp
async function registerLearner(req, res) {
  const { name, email, password } = req.body;

  const requiredFields = ["name", "email", "password"];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ error: `${field} is required!` });
    }
  }

  try {
    const learnerExists = await Learner.findOne({ email });

    if (learnerExists) {
      return res
        .status(400)
        .json({ error: "A User already exists with the specified email!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newLearner = new Learner({
      name,
      email,
      password: hashedPassword,
      profilePic: req.body.profile,
      enrolledCourses: req.body.courses,
      interests: req.body.interests,
      isALearner: req.body.learner,
    });

    const learner = await newLearner.save();
    return res.status(201).json(learner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Learner LogIn
async function loginLearner(req, res) {
  const { email } = req.body;

  try {
    const learner = await Learner.findOne({ email });

    if (!learner) {
      return res.status(404).json({ message: "User not found!" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      learner.password
    );

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Password!" });
    }

    const token = generateToken(learner);

    const { _id, name, profilePic, enrolledCourses, interests, isALearner } =
      learner.toObject();

    return res.status(200).json({
      _id,
      name,
      email,
      profilePic,
      interests,
      enrolledCourses,
      isALearner,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { loginLearner, registerLearner };
