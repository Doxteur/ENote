import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNotes } from "../../features/Notes/NotesReducer";
import SideBar from "../SideBar/SideBar";

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
		<div className="sticky flex h-screen flex-row gap-4 overflow-y-auto rounded-lg sm:overflow-x-hidden">
			<div className="bg-gray-200 h-screen w-full">
				<div className="flex flex-row">
					<SideBar />
					{notes.notes &&
						notes.notes.map((note) => (
							<div className="card">
								<div className="card-body">
									<h2 className="card-header">{note.title}</h2>
									<p className="text-content2">{note.content}</p>
									<div className="card-footer">
										<button className="btn-secondary btn" onClick={(e) => handleEdit(note.id)}>Learn More</button>
									</div>
								</div>
							</div>

						))}
				</div>


			</div>
		</div>
	);
}

export default NoteListes;
