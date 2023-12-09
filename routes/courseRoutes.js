// Course feats handling router

const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const commentController = require("../controllers/commentController");
const courseController = require("../controllers/courseController");

// Add comment
router.put(
  "/:courseId/comments/add-comment",
  authMiddleware.verifyToken,
  authMiddleware.learnerAuth,
  commentController.addComment
);

// Delete comment
router.delete(
  "/:courseId/comments/:commentId",
  authMiddleware.verifyToken,
  authMiddleware.learnerAuth,
  commentController.deleteComment
);

// Get comments
router.get(
  "/:courseId/comments",
  authMiddleware.verifyToken,
  commentController.getCourseComments
);

// Create a course
router.put(
  "/:courseId/instructors/:instructorId/create-course",
  authMiddleware.verifyToken,
  authMiddleware.instructorAuth,
  courseController.createCourse
);

// Get a specific instructor courses
router.get(
  "/:courseId/instructors/:instructorId",
  authMiddleware.verifyToken,
  courseController.getInstructorCourses
);

// Get a course by id
router.get(
  "/:courseId",
  authMiddleware.verifyToken,
  courseController.getCourseById
);

// Delete a course
router.delete(
  "/:courseId/instructors/:instructorId",
  authMiddleware.verifyToken,
  authMiddleware.instructorAuth,
  courseController.deleteInstructorCourse
);

// Update a course
router.put(
  "/:courseId/instructors/:instructorId",
  authMiddleware.verifyToken,
  authMiddleware.instructorAuth,
  courseController.updateInstructorCourse
);

// Enroll a leaner
router.put(
  "/:courseId/learners/:learnerId/enroll",
  authMiddleware.verifyToken,
  authMiddleware.learnerAuth,
  courseController.enrollCourse
);

// Unenroll a learner
router.put(
  "/:courseId/learners/:learnerId/unenroll",
  authMiddleware.verifyToken,
  authMiddleware.learnerAuth,
  courseController.unEnrollLearner
);

module.exports = router;
