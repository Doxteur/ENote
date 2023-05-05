import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/config";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },

});

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const response = await fetch(API_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();

    if(json.error) {
      return thunkAPI.rejectWithValue(json.error);
    }

    if (json.user) {
      console.log("json", json);
      localStorage.setItem("token", json.token);
      setUser(json.user);
      return json;
    } else {
      return thunkAPI.rejectWithValue(json);
    }

  } catch (err) {
    console.error(err);
    return thunkAPI.rejectWithValue({ message: "Internal server error" });
  }
});


export const { setUser } = AuthSlice.actions;

export default AuthSlice.reducer;
