// Instructor controller

const bcrypt = require("bcrypt");
const Instructor = require("../models/Instructor");

async function updateInstructor(req, res) {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
    }

    const instructor = await Instructor.findById(req.params.id);

    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found!" });
    }

    const updatedInstructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    const { password, ...others } = req.body;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteInstructor(req, res) {
  try {
    const instructor = await Instructor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Instructor deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getInstructor(req, res) {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (instructor) {
      return res.status(200).json(instructor);
    } else {
      return res.status(404).json({ error: "Instructor not found!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getInstructor, updateInstructor, deleteInstructor };
