import mongoose, { Schema } from "mongoose";


const messageSchema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    content: {
        type: String,
        trim: true,
    },

    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
    },

},
    { timestamps: true }
)

export default mongoose.model('Message', messageSchema);

//senderId
//message
//chat
//readBy
