// Discussion Schema

const mongoose = require("mongoose");

const discussionSchema = mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
    },
    learner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Learner",
    },
    messages: [
      {
        userType: {
          type: String,
          enum: ["Instructor", "Learner"],
          required: true,
        },
        messageContent: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discussion", discussionSchema);
