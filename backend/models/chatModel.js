import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
    chatName: {
        type: String,
        required: [true, "Please enter chat name"],
        trim: true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    isGroupChat: {
        type: Boolean,
        default: false,
    },
    latestMessage: {  // Corrected field name
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    // status: {
    //     type: String,
    //     //enum means it can have two options.
    //     enum: ["seen", "unseen"],
    //     default: "unseen",
    // },
    // sentTime: {
    //     type: Date,
    //     default: Date.now()
    // },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
},
    {
        timestamps: true,
    }
)
export default mongoose.model('Chat', chatSchema);

//name
//group chat
// users
// latest Message
// groupAdmin
// sentTime
// status





