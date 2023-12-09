// Comment controller

const Course = require("../models/Course");

async function addComment(req, res) {
  const courseId = req.params.courseId;
  const { commentBy, commentText } = req.body;
  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const newComment = { commentBy, commentText };

    course.comments.push(newComment);
    await course.save();

    res
      .status(201)
      .json({ message: "Comment added successfully.", newComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCourseComments(req, res) {
  const courseId = req.params.courseId;
  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const comments = course.comments;
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteComment(req, res) {
  const courseId = req.params.courseId;
  const commentId = req.params.commentId;
  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const comment = course.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ messge: "Comment not found." });
    }

    comment.remove();
    await course.save();

    res.status(200).json({ messaeg: "Comment deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { addComment, getCourseComments, deleteComment };
