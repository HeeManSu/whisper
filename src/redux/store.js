import { configureStore } from "@reduxjs/toolkit";
// import { userReducer, userSlice } from "./reducers/userReducer";
import { searchSlice, userReducer } from "./reducers/userReducer";
import { chatSlice } from "./reducers/chatSlice";



export const server = "http://localhost:4002/api/v1";
const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatSlice.reducer,
        search: searchSlice.reducer,
    }
})

export default store;
