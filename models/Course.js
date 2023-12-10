// Course DB Schema

const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  commentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Learner",
  },
  commentText: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const courseMaterialSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["video", "text", "audio", "other"],
    required: true,
  },
  url: String,
  duration: Number,
  file: String,
});

const Course = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
    },
    price: {
      type: Number,
      default: 0,
    },
    materials: [courseMaterialSchema],
    comments: [commentSchema],
    enrolledLearners: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Learner",
      },
    ],
    discussions: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discussion",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", Course);
