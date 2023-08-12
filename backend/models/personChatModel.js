import mongoose, { Schema } from "mongoose";

const personChatSchema = new Schema({
    chatName: {
        type: String,
        required: [true, "Please enter chat name"],
        trim: true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    latestMessage: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Message",
        type: String,
      
    },
    status: {
        type: String,
        enum: ["seen", "unseen"],
        default: "unseen",
    },
    sentTime: {
        type: String,
        // default: Date.now(), // Just the current time
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
   
    },
            
  
});

export default mongoose.model('personChat', personChatSchema);