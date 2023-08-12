import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import chatModel from "../models/chatModel.js";
import personChatModel from "../models/personChatModel.js";
import userModel from "../models/userModel.js";
import errorHandlerClass from "../utils/errorClass.js";



export const getAllPersonChats = catchAsyncError(async (req, res, next) => {
    try {
        const userId = req.user._id;

        const chats = await chatModel.find({ users: userId })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .populate({ path: "latestMessage.sender", select: "name pic email" })
            .sort({ updatedAt: -1 });

        res.status(200).json({
            success: true,
            chats,
        });
    } catch (error) {
        next(new errorHandlerClass("Unable to fetch all chats", 400));
    }
});

export const createPersonChat = catchAsyncError(async (req, res, next) => {
    const { secondUserId } = req.body;
    const userId = req.user._id;

    if (!secondUserId || !userId) {
        return next(new errorHandlerClass("Please Enter all Fields", 400));
    }

    const secondUser = await userModel.findById(secondUserId);

    if (!secondUser) {
        return next(new errorHandlerClass("Second user not found", 400));
    }

    // Check if chat already exists
    const isChat = await chatModel.findOne({
        isGroupChat: false,
        users: { $all: [userId, secondUserId] },
    })
        .populate("users", "-password")
        .populate({
            path: 'latestMessage',
            populate: { path: 'sender', select: 'name pic email' },
        });

    if (isChat) {
        return res.status(200).json({
            success: true,
            chat: isChat,
        });
    }

    // Create a new chat
    const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [userId, secondUserId],
        avatar: {
            public_id: secondUser.avatar.public_id,
            url: secondUser.avatar.url,
        },
    };

    try {
        const newChat = await chatModel.create(chatData);

        const fullChat = await chatModel.findOne({ _id: newChat._id }).populate("users", "-password");
        res.status(200).json({
            success: true,
            chat: fullChat,
        });
    } catch (error) {
        next(new errorHandlerClass("Failed to create new chat", 400));
    }
});

// export const chatDetails = catchAsyncError(async (req, res, next) => {
//     const chatId = req.params.id;

//     const chat = await chatModel.findById(chatId);

//     if (!chat) {
//         return next(new errorHandlerClass("Chat not found", 400))

//     }

//     res.status(200).json({
//         success: true,
//         chat,
//     })
// })


// export const deleteChat = catchAsyncError(async (req, res, next) => {
//     const chatId = req.params.id;

//     const deletedChat = await chatModel.findByIdAndRemove(chatId);

//     if (!deletedChat) {
//         return next(new errorHandlerClass("Chat not found", 400))

//     }

//     res.status(200).json({
//         success: true,
//         message: "Chat deleted successfully",
//     })
// })

// export const createGroupChat = catchAsyncError(async (req, res, next) => {


//     const { name, users } = req.body;
//     const userId = req.user._id;
//     console.log(name)
//     console.log(users)
//     console.log(userId)

//     // var users = JSON.parse(req.body.users);

//     if (!name || !users) {
//         return next(new errorHandlerClass("Please Enter all Fields", 400))
//     }

//     if (users.length < 2) {
//         return next(new errorHandlerClass("More than 2 person needed in the group", 400))
//     }

    // const existingUsers = await userModel.findById({ _id: { $in: users } });
    // if (existingUsers.length !== users.length) {
    //     return next(new errorHandlerClass("Invalid user IDs in the users array", 400))
    // }


//     const chat = new chatModel({
//         chatName: name,
//         users,
//         groupChat: true,
//         groupAdmin: userId,
//         sentTime: Date.now(),
//         status: "unseen",
//         avatar: {
//             public_id: "d500037df26394e7067e7a0670116561",
//             url: "https://asset.cloudinary.com/dnkl6onms/d500037df26394e7067e7a0670116561",
//         }
//     })
//     await chat.save();
//     res.status(200).json({
//         success: true,
//         chat,
//     })



// })