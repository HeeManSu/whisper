import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../store";
import errorHandlerClass from "../../../backend/utils/errorClass";

export const sendMessages = createAsyncThunk('sendMessage', async ({ content, chatId }) => {
    try {
        const response = await axios.post(`${server}/sendmessage`, {
            content, chatId
        },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                }
            },
        )

        // console.log(response.data)

        return response.data;
    } catch (error) {
        throw new errorHandlerClass("unable to fetch data", 400);
    }
});


export const fetchAllMessages = createAsyncThunk('fetchMessages', async ({ chatId }) => {
    try {
        const { data } = await axios.get(`${server}/${chatId}`, {
            withCredentials: true,
        });

        // console.log(data);
        return data;

    } catch (error) {
        throw new errorHandlerClass("unable to fetch data", 400);
    }
});



export const messageSlice = createSlice({
    name: "messaage",
    initialState: {
        messages: [],
        allMessages: [],
    },

    reducers: {
        setMessages: (state, action) => {
            return { ...state, messages: action.payload.messages }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.chatMessage = action.payload.chatMessage;
                state.error = null;
            })
            .addCase(sendMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchAllMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.allMessages = action.payload.allMessages;
                state.error = null;
            })
            .addCase(fetchAllMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})


export const { setMessages } = messageSlice.actions;

export default messageSlice.reducer;