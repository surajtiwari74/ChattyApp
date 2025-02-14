import {createSlice} from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name:"message",
    initialState:{
        messages:null,
        allMessages:[]
    },
    reducers:{
        setMessages:(state,action)=>{
            state.messages = action.payload;
        },
        setAllMessages:(state,action)=>{
            state.allMessages = action.payload;
        }
    }
});
export const {setMessages,setAllMessages} = messageSlice.actions;
export default messageSlice.reducer;