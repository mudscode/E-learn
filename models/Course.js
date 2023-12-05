// Course DB Schema

const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  type: String,
  commentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Learner",
  },
  date: {
    type: Date,
    default: Date.now,
  },
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
    materials: [
      {
        type: {
          type: String,
          enum: ["video", "text", "quiz"],
        },
        url: String,
        duration: Number,
      },
    ],
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
