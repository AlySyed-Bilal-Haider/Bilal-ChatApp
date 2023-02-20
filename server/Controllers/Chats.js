import Chats from "../Modals/chatModals.js";
import userModal from "../Modals/Modaluser.js";

////////////Access live chat ////////////////
export const accessChat = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("userId:", userId);
    if (!userId) {
      res.json({
        message: "User is not define",
      });
    }

    var isChat = await Chats.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.users?._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
    console.log("isChat:", isChat);
    isChat = await userModal.populate(isChat, {
      path: "latestMessage.sender",
      select: "pic name email",
    });
    console.log("isChat.length:", isChat.length);
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var ChatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.users?._id, userId],
      };
      try {
        const createChat = await Chats.create(ChatData);
        console.log("createChat:", createChat);
        const fullChat = await Chats.findOne({ _id: createChat._id }).populate(
          "users",
          "-password"
        );
        console.log("fullChat:", fullChat);
        res.send(fullChat);
      } catch (error) {
        console.log("chat API creation", error);
      }
    }
  } catch (error) {
    console.log("access chat api", error);
  }
};

///////////////////fetch chat of specific users/////////////
export const fetchChat = async (req, res, next) => {
  try {
    var userChat = await Chats.find({
      users: { $elemMatch: { $eq: req.users?._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });
    console.log("userChat:", userChat);
    userChat = await userModal.populate(userChat, {
      path: "latestMessage.sender",
      select: "pic name email",
    });
    console.log("userChat:", userChat);
    res.send(userChat);
  } catch (error) {
    console.log("error fetch chat:", error);
    next(error);
  }
};

///////cretae chat group////////////////
export const groupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user);

  try {
    const groupChat = await Chats.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chats.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

///////////////REname chat app group//////////////////
export const renameGroupChatname = async (req, res) => {
  try {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chats.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(updatedChat);
    }
  } catch (error) {}
};

///////////Remove user from chat group/////////////
export const removeFromGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    // check if the requester is admin

    const removed = await Chats.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removed) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(removed);
    }
  } catch (error) {}
};

///////////////Add newo members in chat app group///////////
export const addToGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    // check if the requester is admin
    const added = await Chats.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!added) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(added);
    }
  } catch (error) {}
};
