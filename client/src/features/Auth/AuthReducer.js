import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REACT_APP_API_URL } from "../../utils/config";

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
		const response = await fetch(`${REACT_APP_API_URL}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const responseData = await response.json();
		if (!response.ok) {
			return thunkAPI.rejectWithValue(responseData);
		}

		return responseData;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
	logout: (state, action) => {
		state.user = null;
		state.token = null;
		state.isAuthenticated = false;
		state.isLoading = false;
		state.error = null;
	},
  },
  extraReducers: {
		[login.pending]: (state, action) => {
			state.isLoading = true;
		},
		[login.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.error = null;
		},
		[login.rejected]: (state, action) => {
			state.isLoading = false;
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
			state.error = action.payload.error || action.payload.message || "error";
		},
	},

});




export const { setUser,logout } = AuthSlice.actions;

export default AuthSlice.reducer;
