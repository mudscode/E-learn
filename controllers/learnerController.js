// Learner controller

const bcrypt = require("bcrypt");
const Learner = require("../models/Learner");

async function updateLearner(req, res) {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
    }

    const learner = await Learner.findById(req.params.id);

    if (!learner) {
      return res.status(404).json({ error: "Learner not found!" });
    }

    const updatedLearner = await Learner.findByIdAndUpdate(
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

async function deleteLearner(req, res) {
  try {
    const deletedLearner = await Learner.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Learner deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getLearner(req, res) {
  try {
    const learner = await Learner.findById(req.params.id);
    if (learner) {
      return res.status(200).json(learner);
    } else {
      return res.status(404).json({ error: "Learner not found!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { updateLearner, deleteLearner, getLearner };
