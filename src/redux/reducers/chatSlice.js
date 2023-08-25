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
            return response.data;

        } catch (error) {
            throw new Error(error);
        }
    }
);

export const fetchAllChats = createAsyncThunk('fetchAllChat', async () => {
    try {
        const response = await axios.get(`${server}/personchat`,
            {
                withCredentials: true
            }
        );

        return response.data;
    } catch (error) {
        throw new Error(error);
    }
})


export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chat: null,
        loading: false,
        error: null,
        message: null,
        chats: null,
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
            })
            .addCase(fetchAllChats.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllChats.fulfilled, (state, action) => {
                state.loading = false;
                state.chats = action.payload.chats;
            })
            .addCase(fetchAllChats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})