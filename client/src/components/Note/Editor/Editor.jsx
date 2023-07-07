import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditorWiz from "./EditorWiz";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation } from "react-router-dom";

function Editor() {
	const { id } = useParams();
	const notes = useSelector((state) => state.notes);
	const [note, setNote] = useState(null);
	const location = useLocation();

	useEffect(() => {
		console.log("Je rentre dans notes!");
		if (!notes.notes) return;
		setNote(notes.notes.find((note) => note.id === parseInt(id)));
	}, [location]);

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
			{note && <EditorWiz note={note} />}
		</div>
	);
}

export default Editor;
