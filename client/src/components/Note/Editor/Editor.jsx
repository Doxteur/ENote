import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditorWiz from "./EditorWiz";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation } from "react-router-dom";
import { socket } from "../../../utils/socket";
import SaveIcon from "./SaveIcon";
import { joinRoom } from "../../../features/Socket/SocketReducer";
import { getNotes } from "../../../features/Notes/NotesReducer";

function Editor() {
	const { id } = useParams();
	const notes = useSelector((state) => state.notes);
	const auth = useSelector((state) => state.auth);

	const [note, setNote] = useState(null);
	const location = useLocation();
	const socketReducer = useSelector((state) => state.socket);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		socket.on("connected", (response) => {
			console.log("connected", response);
		});
		dispatch(getNotes(auth.token));
	}, [navigate]);

	useEffect(() => {
		if (!notes.notes) return;
		setNote(
			notes.notes.find((note) => note.id === parseInt(id)),
		);
	}, [notes.notes]);
	

	useEffect(() => {
		if (!notes.notes) return;
		setNote(notes.notes.find((note) => note.id === parseInt(id)));
	}, [location]);
	
	useEffect(() => {
		socket.emit("join", id);
		dispatch(joinRoom(id));
	}, [id]);



	return (
		<div>
			<ToastContainer
				position="bottom-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			{note && <EditorWiz note={note} setNote={setNote} />}
			<SaveIcon />
		</div>
	);
}

export default Editor;
