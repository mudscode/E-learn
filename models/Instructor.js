// Instructor DB Schema

const mongoose = require("mongoose");

const instructorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    isAnInstructor: {
      type: Boolean,
      default: true,
    },
    expertiseIn: [
      {
        type: String,
        required: true,
      },
    ],
    education: {
      type: String,
      enum: ["BS", "MS", "MPhil", "PhD", "Other"],
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    coursesTaught: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    socials: [
      {
        website: {
          type: String,
        },
        linkedIn: {
          type: String,
        },
        twitter: {
          type: String,
        },
        instagram: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Instructor", instructorSchema);
