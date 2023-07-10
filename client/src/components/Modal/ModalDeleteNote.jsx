import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDemande, deleteNote } from "../../features/Notes/NotesReducer";

function ModalDeleteNote() {
	const dispatch = useDispatch();
	const notes = useSelector((state) => state.notes);
	const auth = useSelector((state) => state.auth);

	const [id, setId] = useState();

	return (
		<div>
			<input className="modal-state" id="modal-7" type="checkbox" />
			<div className="modal w-screen">
				<label className="modal-overlay" htmlFor="modal-7"></label>
				<div className="modal-content flex flex-col gap-5 max-w-3xl">
					{/* select */}
					<select
						className="input input-solid w-full"
						onChange={(e) => setId(e.target.value)}
					>
                        <option value="">Selectionner une note</option>
						{notes.notes &&
							notes.notes.map((note) => {
								if (note?.authorId === auth.user.id) {
									return (
										<option key={note.id} value={note.id}>
											{note.title}
										</option>
									);
								}
								return null;
							})}
					</select>
					<hr className="w-96" />

					<button
						className="btn btn-primary"
						onClick={() => {
                            if(!id) return
							dispatch(
								deleteNote({
									token: auth.token,
									id: id,
								}),
							);
						}}
					>
						Supprimer
					</button>
					{notes.error && (
						<p className="text-red-500">{notes.error}</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default ModalDeleteNote;
