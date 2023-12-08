// User util functions

const bcrypt = require("bcrypt");

async function updateUser(Model, req, res) {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
    }

    const user = await Model.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: `${Model.modelName} not found.` });
    }

    const updatedUser = await Model.findByIdAndUpdate(
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

async function deleteUser(Model, req, res) {
  try {
    const user = await Model.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: `${Model.modelName} deleted successfully.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUser(Model, req, res) {
  try {
    const user = await Model.findById(req.params.id);

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ error: `${Model.modelName} not found.` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { updateUser, deleteUser, getUser };
