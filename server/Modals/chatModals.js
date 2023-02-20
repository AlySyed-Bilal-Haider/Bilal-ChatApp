import mongoose, { Schema } from "mongoose";

const chatModal = new Schema(
  {
    chatName: {},
    isGroupChat: {},
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const Chats = mongoose.model("chats", chatModal);
export default Chats;
