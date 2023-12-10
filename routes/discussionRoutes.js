// Discussion Rotues

const router = require("express").Router();
const discussionConroller = require("../controllers/discussionController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware.verifyToken);

router.post(
  "/course/:courseId/message",
  discussionConroller.addMessageToCourseDiscussion
);

router.get(
  "/course/:courseId/messages",
  discussionConroller.getAllDiscussionMessages
);

router.delete(
  "/course/:courseId/message/messageid",
  discussionConroller.deleteMessageFromDiscussion
);

module.exports = router;
