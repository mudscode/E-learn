const Instructor = require("../models/Instructor");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/authMiddleware");
const Learner = require("../models/Learner");

// Instructor signup
async function registerInstructor(req, res) {
  const { name, email, password } = req.body;

  const requiredFields = ["name", "email", "password"];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ error: `${field} is required!` });
    }
  }

  try {
    const instructorExists = await Instructor.findOne({ email });

    if (instructorExists) {
      return res
        .status(400)
        .json("An Instructor with the same email already exists!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newInstructor = new Instructor({
      name,
      email,
      hashedPassword,
      bio: req.body.bio,
      profilePic: req.body.profile,
      expertiseIn: req.body.expertise,
      education: req.body.education,
      experience: req.body.experience,
      coursesTaught: req.body.courses,
      socials: req.body.socials,
      isAnInstructor: req.body.instructor,
    });

    const instructor = await newInstructor.save();
    res.status(201).json(instructor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Instructor login
async function loginInstructor(req, res) {
  const { email } = req.body;

  try {
    const instructor = await Instructor.findOne({ email });

    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found!" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      instructor.password
    );

    if (!validPassword) {
      return res.status(400).json({ error: "Invalid Password" });
    }

    const token = generateToken(instructor);

    const {
      _id,
      name,
      profilePic,
      bio,
      expertiseIn,
      education,
      experience,
      coursesTaught,
      isAnInstructor,
      socials,
    } = instructor.toObject();

    res.status(200).json({
      _id,
      name,
      email,
      bio,
      profilePic,
      experience,
      expertiseIn,
      education,
      coursesTaught,
      socials,
      isAnInstructor,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { registerInstructor, loginInstructor };
