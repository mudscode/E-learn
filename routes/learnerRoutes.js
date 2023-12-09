// Learner routes

const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const learnerController = require("../controllers/learnerController");

router.put(
  "/:learnerId",
  authMiddleware.verifyToken,
  authMiddleware.learnerAuth,
  learnerController.updateLearner
);

router.delete(
  "/:learnerId",
  authMiddleware.verifyToken,
  authMiddleware.learnerAuth,
  learnerController.deleteLearner
);

router.get(
  "/:learnerId",
  authMiddleware.verifyToken,
  authMiddleware.learnerAuth,
  learnerController.getLearner
);

module.exports = router;
