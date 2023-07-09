import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REACT_APP_API_URL } from "../../utils/config";

const SocketSlice = createSlice({
	name: "socket",
	initialState: {
		socket: null,
		room: null,
	},
	reducers: {
		joinRoom: (state, action) => {
			state.room = action.payload;
		},
	},
});

export const { joinRoom } = SocketSlice.actions;

export default SocketSlice.reducer;
