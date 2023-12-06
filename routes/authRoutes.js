const router = require("express").Router();
const learnerAuthController = require("../controllers/learnerAuthController");
const instructorAuthController = require("../controllers/instructorAuthController");

// Learner Routes
router.post("/learner/register", learnerAuthController.registerLearner); // profilePic multer config to be done.
router.post("/learner/login", learnerAuthController.loginLearner);

// Instructor Routes
router.post(
  "/instructor/register",
  instructorAuthController.registerInstructor
); // profilePic multer config to be done.
router.post("/instructor/login", instructorAuthController.loginInstructor);

module.exports = router;
