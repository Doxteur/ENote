import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNotes } from "../../features/Notes/NotesReducer";

function NoteListes() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const notes = useSelector((state) => state.notes);
	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(getNotes(auth.token));
	}, [auth.token, dispatch]);

	const handleEdit = (e) => {
		navigate(`/note/${e}`);
	};

	return (
		<div className="bg-gray-200 h-screen">
			{notes.notes &&
				notes.notes.map((note) => (
					<div
						key={note._id}
						className="bg-white shadow-lg rounded-lg px-4 py-6 m-4 cursor-pointer"
						onClick={() => handleEdit(note.id)}
					>
						<h2 className="text-xl font-semibold text-gray-800 capitalize">
							{note.title}
						</h2>
						<p className="mt-2 text-gray-600">{note.content}</p>
					</div>
				))}
		</div>
	);
}

export default NoteListes;
