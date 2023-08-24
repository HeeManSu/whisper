import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../store";



export const createNewChat = createAsyncThunk(
    'createNewChat',
    async (secondUserId) => {
        try {
            const response = await axios.post(
                `${server}/personchat`,
                { secondUserId },
                {
                    withCredentials: true
                }
            );
            // console.log(response.data.message); // Check this line for the message property
            // console.log(response.data.chat);    // Check this line for the chat property

            return response.data; // Return the entire response data object

        } catch (error) {
            throw new Error(error);
        }
    }
);



export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chat: null,
        loading: false,
        error: null,
        message: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNewChat.pending, (state) => {
                state.loading = true;
            })
            .addCase(createNewChat.fulfilled, (state, action) => {
                state.loading = false;
                state.chat = action.payload.chat;
                state.message = action.payload.message; // Check this line
                state.error = null;
            })
            .addCase(createNewChat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})