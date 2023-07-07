import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REACT_APP_API_URL } from "../../utils/config";
import { toast } from "react-toastify";

export const getNotes = createAsyncThunk(
	"notes/get",
	async (data, thunkAPI) => {
		try {
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
	},
);

export const updateNote = createAsyncThunk(
	"notes/update",
	async (data, thunkAPI) => {
		try {
			const response = await fetch(
				`${REACT_APP_API_URL}/notes/${data.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${data.token}`,
					},
					body: JSON.stringify(data.note),
				},
			);
			const responseData = await response.json();
			if (!response.ok) {
				return thunkAPI.rejectWithValue(responseData);
			}
			return responseData;
		} catch (error) {
			console.log("error", error);
			return thunkAPI.rejectWithValue(error.response.data);
		}
	},
);

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
			console.log("action.payload", action.payload);
			state.isLoading = false;
			state.notes = action.payload;
			state.error = null;
		},
		[getNotes.rejected]: (state, action) => {
			state.isLoading = false;
			state.notes = null;
			state.error = action.payload.error || action.payload.message;
		},
		[updateNote.pending]: (state, action) => {
			state.isLoading = true;
		},
		[updateNote.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.notes = state.notes.map((note) => {
				if (note.id === action.payload.id) {
					return action.payload;
				}
				return note;
			});
			state.error = null;
			toast.success("🦄 Votre notre a été mis à jour !", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		},
		[updateNote.rejected]: (state, action) => {
			state.isLoading = false;
			state.notes = null;
			state.error = action.payload.error || action.payload.message;
		},
	},
});

export const { setNotes } = NotesSlice.actions;

export default NotesSlice.reducer;
