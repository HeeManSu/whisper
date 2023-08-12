import { createReducer } from "@reduxjs/toolkit";


export const personChatReducer = createReducer(
    { personChats: [] }, {

    allPersonChatRequest: state => {
        state.loading = true;
    },
    allPersonChatSuccess: (state, action) => {
        state.loading = false;
        state.personChats = action.payload;
    },
    allPersonChatFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    newPersonChatRequest: state => {
        state.loading = true;
    },
    newPersonChatSuccess: (state, action) => {
        state.loading = false;
        state.personChats = action.payload;
    },
    newPersonChatFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearError: state => {
        state.error = null;
    },
    clearMessage: state => {
        state.message = null;
    },
})