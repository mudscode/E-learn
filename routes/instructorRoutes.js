// Instructor Routes

const router = require("express").Router();
const instructorController = require("../controllers/instructorController");
const authMiddleware = require("../middleware/authMiddleware");

router.put(
  "/:instructorId",
  authMiddleware.verifyToken,
  authMiddleware.instructorAuth,
  instructorController.updateInstructor
);

router.delete(
  "/:instructorId",
  authMiddleware.verifyToken,
  authMiddleware.instructorAuth,
  instructorController.deleteInstructor
);

router.get(
  "/:instructorId",
  authMiddleware.verifyToken,
  authMiddleware.instructorAuth,
  instructorController.getInstructor
);

module.exports = router;
