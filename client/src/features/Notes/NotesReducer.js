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

export const createNote = createAsyncThunk(
	"notes/create",
	async (data, thunkAPI) => {
		try {
			const response = await fetch(`${REACT_APP_API_URL}/notes`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${data.token}`,
				},
				body: JSON.stringify(data.note),
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

export const deleteNote = createAsyncThunk(
	"notes/delete",
	async (data, thunkAPI) => {
		try {
			const response = await fetch(
				`${REACT_APP_API_URL}/notes/${data.id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${data.token}`,
					},
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

export const updateStatus = createAsyncThunk(
	"notes/updateStatus",
	async (data, thunkAPI) => {
		try {
			const response = await fetch(
				`${REACT_APP_API_URL}/demandes/${data.demandeId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${data.token}`,
					},
					body: JSON.stringify(data),
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

export const createDemande = createAsyncThunk(
	"notes/createDemande",
	async (data, thunkAPI) => {
		try {
			const response = await fetch(`${REACT_APP_API_URL}/demandes/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${data.token}`,
				},

				body: JSON.stringify(data),
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
			state.isLoading = false;
			state.notes = action.payload;
			state.error = null;
		},
		[getNotes.rejected]: (state, action) => {
			state.isLoading = false;
			state.notes = null;
			state.error = action.payload.error || action.payload.message;
		},
		[createNote.pending]: (state, action) => {
			state.isLoading = true;
		},
		[createNote.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.notes = [...state.notes, action.payload];
			state.error = null;
			toast.success("🦄 Votre note a été créée !", {
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
		[createNote.rejected]: (state, action) => {
			state.isLoading = false;
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
		[updateStatus.pending]: (state, action) => {
			state.isLoading = true;
		},
		[updateStatus.fulfilled]: (state, action) => {
			state.isLoading = false;
			// find the note with action.payload.postId then find the demande with action.payload.id and update it
			state.notes = state.notes.map((note) => {
				if (note.id === action.payload.postId) {
					note.demandes = note.demandes.map((demande) => {
						if (demande.id === action.payload.id) {
							return action.payload;
						}
						return demande;
					});
				}
				return note;
			});
			state.error = null;
			toast.success("🦄 Votre status a été mis à jour !", {
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
		[updateStatus.rejected]: (state, action) => {
			state.isLoading = false;
			state.notes = null;
			state.error = action.payload.error || action.payload.message;
			toast.error("❌ Une erreur est survenue !", {
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
		[createDemande.pending]: (state, action) => {
			state.isLoading = true;
		},
		[createDemande.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.error = null;
			toast.success("🦄 Votre demande a été créée !", {
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
		[createDemande.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action?.payload?.error || action?.payload?.message;
		},
		[deleteNote.pending]: (state, action) => {
			state.isLoading = true;
		},
		[deleteNote.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.notes = state.notes.filter((note) => note.id !== action.payload.id);
			state.error = null;
			toast.success("🦄 Votre note a été supprimée !", {
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
		[deleteNote.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload.error || action.payload.message;
		},
	},
});

export const { setNotes } = NotesSlice.actions;

export default NotesSlice.reducer;
