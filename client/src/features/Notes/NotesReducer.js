import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REACT_APP_API_URL } from "../../utils/config";

export const getNotes = createAsyncThunk("notes/get", async (data, thunkAPI) => {
  try {
    console.log("data", data);
    const response = await fetch(`${REACT_APP_API_URL}/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data}`,
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      return thunkAPI.rejectWithValue(responseData);
    }
    return responseData;
  } catch (error) {
    console.log("error", error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const NotesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
  },
  extraReducers: {
    [getNotes.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getNotes.fulfilled]: (state, action) => {
      console.log("notes", action.payload);
      state.isLoading = false;
      state.notes = action.payload.notes;
      state.error = null;
    },
    [getNotes.rejected]: (state, action) => {
      state.isLoading = false;
      state.notes = null;
      state.error = action.payload.error || action.payload.message;
    },
  },
});

export const { setNotes } = NotesSlice.actions;

export default NotesSlice.reducer;
