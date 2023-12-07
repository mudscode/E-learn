// Instructor Routes

const router = require("express").Router();
const instructorController = require("../controllers/instructorController");
const authMiddleware = require("../middleware/authMiddleware");

router.put(
  ":id",
  authMiddleware.verifyToken,
  authMiddleware.instructorAuth,
  instructorController.updateInstructor
);

router.delete(
  ":id",
  authMiddleware.verifyToken,
  authMiddleware.instructorAuth,
  instructorController.deleteInstructor
);

router.get(
  ":id",
  authMiddleware.verifyToken,
  authMiddleware.instructorAuth,
  instructorController.getInstructor
);

module.exports = router;
