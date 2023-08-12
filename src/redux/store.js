import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { personChatReducer } from "./reducers/personChatReducer";


export const server = "http://localhost:4002/api/v1";
const store = configureStore({
    reducer: {
        user: userReducer,
        chats: personChatReducer,
    }
})

export default store;
