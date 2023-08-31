import { catchAsyncError } from "../middlewares/catchAsyncError";
import errorHandlerClass from "../utils/errorClass";
import messageModel from "../models/messageModel.js";
import userModel from "../models/userModel";
import chatModel from "../models/chatModel.js";



export const sendMessage = catchAsyncError(async (req, res, next) => {
    try {
        const { content, chatId } = req.body;

        if (!content || !chatId) {
            return next(new errorHandlerClass("Please enter all fields", 400));
        }

        const newMessage = {
            sender: req.user._id,
            content: content,
            chat: chatId,
        };

        try {
            let chatMessage = await messageModel.create(newMessage);

            chatMessage = await chatMessage.populate("sender", "name pic").execPopulate();

            chatMessage = await chatMessage.populate("chat").execPopulate();

            chatMessage = await userModel.populate(chatMessage, {
                path: "chat.users",
                select: "name pic email",
            });

            await chatModel.findByIdAndUpdate(req.body.chatId, {
                latestMessage: chatMessage,
            });

            res.status(200).json({
                success: true,
                chatMessage,
            });
        } catch (error) {
            throw new Error(error);
        }
    } catch (error) {
        throw new Error(error);
    }
});
