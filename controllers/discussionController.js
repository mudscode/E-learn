// Discussion controller

const Discussion = require("../models/Discussion");

async function addMessageToCourseDiscussion(req, res) {
  const courseId = req.params.courseId;
  const { userType, message } = req.body;
  const userId = req.user._id;

  try {
    const discussion = await Discussion.findOne({ course: courseId });

    if (!discussion) {
      return res
        .status(404)
        .json({ message: "Discussion not found for this course." });
    }

    let senderType;
    if (userType == "Learner") {
      senderType = "learner";
    } else {
      senderType = "instructor";
    }
    const senderId = userId;

    discussion.messages.push({
      userType,
      messageContent: message,
    });

    await discussion.save();
    res.status(201).json({ message: "Message added to the discussion." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllDiscussionMessages(req, res) {
  const courseId = req.params.courseId;

  try {
    const discussion = await Discussion.findOne({ course: courseId });

    if (!discussion) {
      return res
        .status(404)
        .json({ message: "Discussion for this course not found." });
    }

    const messages = discussion.messages;
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteMessageFromDiscussion(req, res) {
  const { messageId } = req.params;

  try {
    const discussion = await Discussion.findByIdAndUpdate(
      { "messages._id": messageId },
      { $pull: { messages: { _id: messageId } } },
      { new: true }
    );

    if (!discussion) {
      return res
        .status(404)
        .json({ message: "Discussion for this course not found." });
    }

    res.status(200).json({
      message: "Deleted message from the course discussion successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addMessageToCourseDiscussion,
  getAllDiscussionMessages,
  deleteMessageFromDiscussion,
};
