import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import chatModel from "../models/chatModel.js";
import personChatModel from "../models/personChatModel.js";
import userModel from "../models/userModel.js";
import getDataUri from "../utils/dataUri.js";
import errorHandlerClass from "../utils/errorClass.js";
import { v2 as cloudinary } from 'cloudinary'

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

export const createGroupChat = catchAsyncError(async (req, res, next) => {

    const { name, users } = req.body;
    const file = req.file;

    console.log(name)
    console.log(users)
    console.log(file)

    if (!name || !users || !file) {
        return next(new errorHandlerClass("Please Enter all Fields", 400));
        // throw error.message; 
    }
    var parsedUsers = JSON.parse(req.body.users);

    if (parsedUsers.length < 2) {
        return next(new errorHandlerClass("add more than 2 users", 400));
    }

    parsedUsers.push(req.user);

    //upload files on cloudinary
    const fileUri = getDataUri(file);
    // const mycloud = await cloudinary.v2.uploader(fileUri.content)


    try {
        const myCloud = await cloudinary.uploader.upload(fileUri.content)


        // console.log(fileUri)
        console.log(myCloud)

        const groupChat = await chatModel.create({
            chatName: name,
            users: parsedUsers,
            isGroupChat: true,
            groupAdmin: req.user,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        });
        console.log(groupChat)

        const fullGroupChat = await chatModel.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json({
            success: true,
            newChat: fullGroupChat
        });
    } catch (error) {
        throw new Error(error.message);
    }
});


export const renameGroup = catchAsyncError(async (req, res, next) => {
    try {
        const { chatId, chatName } = req.body;

        const filter = { _id: chatId };

        const updatedChatName = await chatModel.findOneAndUpdate(
            filter,
            { chatName },
            { new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        if (!updatedChatName) {
            return next(new errorHandlerClass("Chat not found", 400));
        }

        res.status(200).json({
            success: true,
            updatedChatName,
        });

    } catch (error) {
        next(new errorHandlerClass("Failed to rename group chat", 400));
    }
});

export const addToGroup = catchAsyncError(async (req, res, next) => {


    try {
        const { chatId, userId } = req.body;

        const chat = await chatModel.findById(chatId); // Get the chat details
        if (!chat) {
            return next(new errorHandlerClass("Chat does not exist", 400));
        }

        const existingUserIndex = chat.users.findIndex(user => user.toString() === userId);
        if (existingUserIndex !== -1) {
            return next(new errorHandlerClass("User already exists in the group", 400));
        }

        const added = await chatModel.findOneAndUpdate(
            { _id: chatId }, // Use filter object
            { $push: { users: userId } },
            { new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        if (!added) {
            return next(new errorHandlerClass("Chat does not exist ", 400));
        }
        res.status(200).json({
            success: true,
            added,
        });


    } catch (error) {
        next(new errorHandlerClass("Failed to add new person to group chat", 400));
    }

})


export const removeFromGroup = catchAsyncError(async (req, res, next) => {


    try {


        const { chatId, userId } = req.body;

        const chat = await chatModel.findById(chatId); // Get the chat details
        if (!chat) {
            return next(new errorHandlerClass("Chat does not exist", 400));
        }

        const existingUserIndex = chat.users.findIndex(user => user.toString() === userId);
        if (existingUserIndex === -1) {
            return next(new errorHandlerClass("User not found in the group", 400));
        }

        const removed = await chatModel.findOneAndUpdate(
            { _id: chatId }, // Use filter object
            { $pull: { users: userId } },
            { new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        if (!removed) {
            return next(new errorHandlerClass("Chat does not exist ", 400));
        }
        res.status(200).json({
            success: true,
            removed,
        });


    } catch (error) {
        next(new errorHandlerClass("Failed to remove person from group chat", 400));

    }

})






