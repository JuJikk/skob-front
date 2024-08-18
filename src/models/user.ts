import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  ownerEmail: {
    type: String,
    required: [true, "Please enter a valid ownerEmail"],
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address",
    ],
  },
  zeroProba: {
    a: {
      type: [Number],
      default: Array(11).fill(0),
    },
  },
  firstProba: {
    a: {
      type: [Number],
      default: Array(11).fill(0),
    },
    b: {
      type: [Number],
      default: Array(7).fill(0),
    },
    c: {
      type: [Number],
      default: Array(4).fill(0),
    },
    d: {
      type: [Number],
      default: Array(6).fill(0),
    },
    e: {
      type: [Number],
      default: Array(10).fill(0),
    },
    f: {
      type: [Number],
      default: Array(9).fill(0),
    },
    g: {
      type: [Number],
      default: Array(4).fill(0),
    },
    h: {
      type: [Number],
      default: Array(7).fill(0),
    },
  },
  secondProba: {
    a: {
      type: [Number],
      default: Array(10).fill(0),
    },
    b: {
      type: [Number],
      default: Array(10).fill(0),
    },
    c: {
      type: [Number],
      default: Array(3).fill(0),
    },
    d: {
      type: [Number],
      default: Array(7).fill(0),
    },
    e: {
      type: [Number],
      default: Array(9).fill(0),
    },
    f: {
      type: [Number],
      default: Array(2).fill(0),
    },
    g: {
      type: [Number],
      default: Array(1).fill(0),
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
