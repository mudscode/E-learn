// Learner routes

const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const learnerController = require("../controllers/learnerController");

router.put(
  ":id",
  authMiddleware.verifyToken,
  authMiddleware.learnerAuth,
  learnerController.updateLearner
);

router.delete(
  ":id",
  authMiddleware.verifyToken,
  authMiddleware.learnerAuth,
  learnerController.deleteLearner
);

router.get(
  ":id",
  authMiddleware.verifyToken,
  authMiddleware.learnerAuth,
  learnerController.getLearner
);

module.exports = router;
