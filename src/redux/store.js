import { configureStore } from "@reduxjs/toolkit";
// import { userReducer, userSlice } from "./reducers/userReducer";
import { personChatReducer } from "./reducers/personChatReducer";
import { searchSlice, userReducer } from "./reducers/userReducer";



export const server = "http://localhost:4002/api/v1";
const store = configureStore({
    reducer: {
        user: userReducer,
        chats: personChatReducer,
        search: searchSlice.reducer,
    }
})

export default store;
